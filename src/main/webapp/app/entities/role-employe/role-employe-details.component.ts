import { defineComponent, inject, ref, Ref } from 'vue';
import { useI18n } from 'vue-i18n';
import { useRoute, useRouter } from 'vue-router';

import { IRoleEmploye } from '@/shared/model/role-employe.model';
import RoleEmployeService from './role-employe.service';
import { useAlertService } from '@/shared/alert/alert.service';

export default defineComponent({
  compatConfig: { MODE: 3 },
  name: 'RoleEmployeDetails',
  setup() {
    const roleEmployeService = inject('roleEmployeService', () => new RoleEmployeService());
    const alertService = inject('alertService', () => useAlertService(), true);

    const route = useRoute();
    const router = useRouter();

    const previousState = () => router.go(-1);
    const roleEmploye: Ref<IRoleEmploye> = ref({});

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

    return {
      alertService,
      roleEmploye,

      previousState,
      t$: useI18n().t,
    };
  },
});
