import { computed, defineComponent, inject, ref, Ref } from 'vue';
import { useI18n } from 'vue-i18n';
import { useRoute, useRouter } from 'vue-router';
import { useVuelidate } from '@vuelidate/core';

import { useValidation } from '@/shared/composables';
import { useAlertService } from '@/shared/alert/alert.service';

import { IEntreprise, Entreprise } from '@/shared/model/entreprise.model';
import EntrepriseService from './entreprise.service';
import { Statut } from '@/shared/model/enumerations/statut.model';

export default defineComponent({
  compatConfig: { MODE: 3 },
  name: 'EntrepriseUpdate',
  setup() {
    const entrepriseService = inject('entrepriseService', () => new EntrepriseService());
    const alertService = inject('alertService', () => useAlertService(), true);

    const entreprise: Ref<IEntreprise> = ref(new Entreprise());
    const statutValues: Ref<string[]> = ref(Object.keys(Statut));
    const isSaving = ref(false);
    const currentLanguage = inject('currentLanguage', () => computed(() => navigator.language ?? 'fr'), true);

    const route = useRoute();
    const router = useRouter();

    const previousState = () => router.go(-1);

    const retrieveEntreprise = async entrepriseId => {
      try {
        const res = await entrepriseService().find(entrepriseId);
        entreprise.value = res;
      } catch (error) {
        alertService.showHttpError(error.response);
      }
    };

    if (route.params?.entrepriseId) {
      retrieveEntreprise(route.params.entrepriseId);
    }

    const initRelationships = () => {};

    initRelationships();

    const { t: t$ } = useI18n();
    const validations = useValidation();
    const validationRules = {
      nom: {},
      raisonSociale: {},
      telephone1: {},
      telephone2: {},
      email: {},
      logo: {},
      description: {},
      sitWeb: {},
      statut: {},
      employes: {},
      magasins: {},
    };
    const v$ = useVuelidate(validationRules, entreprise as any);
    v$.value.$validate();

    return {
      entrepriseService,
      alertService,
      entreprise,
      previousState,
      statutValues,
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
      if (this.entreprise.id) {
        this.entrepriseService()
          .update(this.entreprise)
          .then(param => {
            this.isSaving = false;
            this.previousState();
            this.alertService.showInfo(this.t$('sellAmApp.entreprise.updated', { param: param.id }));
          })
          .catch(error => {
            this.isSaving = false;
            this.alertService.showHttpError(error.response);
          });
      } else {
        this.entrepriseService()
          .create(this.entreprise)
          .then(param => {
            this.isSaving = false;
            this.previousState();
            this.alertService.showSuccess(this.t$('sellAmApp.entreprise.created', { param: param.id }).toString());
          })
          .catch(error => {
            this.isSaving = false;
            this.alertService.showHttpError(error.response);
          });
      }
    },
  },
});
