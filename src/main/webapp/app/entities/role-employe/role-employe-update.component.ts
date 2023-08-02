import { computed, defineComponent, inject, ref, Ref } from 'vue';
import { useI18n } from 'vue-i18n';
import { useRoute, useRouter } from 'vue-router';
import { useVuelidate } from '@vuelidate/core';

import { useValidation } from '@/shared/composables';
import { useAlertService } from '@/shared/alert/alert.service';

import { IRoleEmploye, RoleEmploye } from '@/shared/model/role-employe.model';
import RoleEmployeService from './role-employe.service';

export default defineComponent({
  compatConfig: { MODE: 3 },
  name: 'RoleEmployeUpdate',
  setup() {
    const roleEmployeService = inject('roleEmployeService', () => new RoleEmployeService());
    const alertService = inject('alertService', () => useAlertService(), true);

    const roleEmploye: Ref<IRoleEmploye> = ref(new RoleEmploye());
    const isSaving = ref(false);
    const currentLanguage = inject('currentLanguage', () => computed(() => navigator.language ?? 'fr'), true);

    const route = useRoute();
    const router = useRouter();

    const previousState = () => router.go(-1);

    const retrieveRoleEmploye = async roleEmployeId => {
      try {
        const res = await roleEmployeService().find(roleEmployeId);
        roleEmploye.value = res;
      } catch (error) {
        alertService.showHttpError(error.response);
      }
    };

    if (route.params?.roleEmployeId) {
      retrieveRoleEmploye(route.params.roleEmployeId);
    }

    const { t: t$ } = useI18n();
    const validations = useValidation();
    const validationRules = {
      roleName: {},
    };
    const v$ = useVuelidate(validationRules, roleEmploye as any);
    v$.value.$validate();

    return {
      roleEmployeService,
      alertService,
      roleEmploye,
      previousState,
      isSaving,
      currentLanguage,
      v$,
      t$,
    };
  },
  created(): void {},
  methods: {
    save(): void {
      this.isSaving = true;
      if (this.roleEmploye.id) {
        this.roleEmployeService()
          .update(this.roleEmploye)
          .then(param => {
            this.isSaving = false;
            this.previousState();
            this.alertService.showInfo(this.t$('sellAmApp.roleEmploye.updated', { param: param.id }));
          })
          .catch(error => {
            this.isSaving = false;
            this.alertService.showHttpError(error.response);
          });
      } else {
        this.roleEmployeService()
          .create(this.roleEmploye)
          .then(param => {
            this.isSaving = false;
            this.previousState();
            this.alertService.showSuccess(this.t$('sellAmApp.roleEmploye.created', { param: param.id }).toString());
          })
          .catch(error => {
            this.isSaving = false;
            this.alertService.showHttpError(error.response);
          });
      }
    },
  },
});
