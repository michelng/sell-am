import { computed, defineComponent, inject, ref, Ref } from 'vue';
import { useI18n } from 'vue-i18n';
import { useRoute, useRouter } from 'vue-router';
import { useVuelidate } from '@vuelidate/core';

import { useValidation } from '@/shared/composables';
import { useAlertService } from '@/shared/alert/alert.service';

import { IFournisseur, Fournisseur } from '@/shared/model/fournisseur.model';
import FournisseurService from './fournisseur.service';
import { Statut } from '@/shared/model/enumerations/statut.model';

export default defineComponent({
  compatConfig: { MODE: 3 },
  name: 'FournisseurUpdate',
  setup() {
    const fournisseurService = inject('fournisseurService', () => new FournisseurService());
    const alertService = inject('alertService', () => useAlertService(), true);

    const fournisseur: Ref<IFournisseur> = ref(new Fournisseur());
    const statutValues: Ref<string[]> = ref(Object.keys(Statut));
    const isSaving = ref(false);
    const currentLanguage = inject('currentLanguage', () => computed(() => navigator.language ?? 'fr'), true);

    const route = useRoute();
    const router = useRouter();

    const previousState = () => router.go(-1);

    const retrieveFournisseur = async fournisseurId => {
      try {
        const res = await fournisseurService().find(fournisseurId);
        fournisseur.value = res;
      } catch (error) {
        alertService.showHttpError(error.response);
      }
    };

    if (route.params?.fournisseurId) {
      retrieveFournisseur(route.params.fournisseurId);
    }

    const { t: t$ } = useI18n();
    const validations = useValidation();
    const validationRules = {
      identifiant: {},
      nomResponsable: {},
      raisonSociale: {},
      telephone1: {},
      telephone2: {},
      email: {},
      logo: {},
      description: {},
      statut: {},
    };
    const v$ = useVuelidate(validationRules, fournisseur as any);
    v$.value.$validate();

    return {
      fournisseurService,
      alertService,
      fournisseur,
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
      if (this.fournisseur.id) {
        this.fournisseurService()
          .update(this.fournisseur)
          .then(param => {
            this.isSaving = false;
            this.previousState();
            this.alertService.showInfo(this.t$('sellAmApp.fournisseur.updated', { param: param.id }));
          })
          .catch(error => {
            this.isSaving = false;
            this.alertService.showHttpError(error.response);
          });
      } else {
        this.fournisseurService()
          .create(this.fournisseur)
          .then(param => {
            this.isSaving = false;
            this.previousState();
            this.alertService.showSuccess(this.t$('sellAmApp.fournisseur.created', { param: param.id }).toString());
          })
          .catch(error => {
            this.isSaving = false;
            this.alertService.showHttpError(error.response);
          });
      }
    },
  },
});
