import { computed, defineComponent, inject, ref, Ref } from 'vue';
import { useI18n } from 'vue-i18n';
import { useRoute, useRouter } from 'vue-router';
import { useVuelidate } from '@vuelidate/core';

import { useValidation } from '@/shared/composables';
import { useAlertService } from '@/shared/alert/alert.service';

import EntrepriseService from '@/entities/entreprise/entreprise.service';
import { IEntreprise } from '@/shared/model/entreprise.model';
import { IMagasin, Magasin } from '@/shared/model/magasin.model';
import MagasinService from './magasin.service';

export default defineComponent({
  compatConfig: { MODE: 3 },
  name: 'MagasinUpdate',
  setup() {
    const magasinService = inject('magasinService', () => new MagasinService());
    const alertService = inject('alertService', () => useAlertService(), true);

    const magasin: Ref<IMagasin> = ref(new Magasin());
    const entrepriseService = inject('entrepriseService', () => new EntrepriseService());
    const entreprises: Ref<IEntreprise[]> = ref([]);
    const isSaving = ref(false);
    const currentLanguage = inject('currentLanguage', () => computed(() => navigator.language ?? 'fr'), true);

    const route = useRoute();
    const router = useRouter();

    const previousState = () => router.go(-1);

    const retrieveMagasin = async magasinId => {
      try {
        const res = await magasinService().find(magasinId);
        magasin.value = res;
      } catch (error) {
        alertService.showHttpError(error.response);
      }
    };

    if (route.params?.magasinId) {
      retrieveMagasin(route.params.magasinId);
    }

    const initRelationships = () => {
      entrepriseService()
        .retrieve()
        .then(res => {
          entreprises.value = res.data;
        });
    };

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
      entreprise: {},
    };
    const v$ = useVuelidate(validationRules, magasin as any);
    v$.value.$validate();

    return {
      magasinService,
      alertService,
      magasin,
      previousState,
      isSaving,
      currentLanguage,
      entreprises,
      v$,
      t$,
    };
  },
  created(): void {},
  methods: {
    save(): void {
      this.isSaving = true;
      if (this.magasin.id) {
        this.magasinService()
          .update(this.magasin)
          .then(param => {
            this.isSaving = false;
            this.previousState();
            this.alertService.showInfo(this.t$('sellAmApp.magasin.updated', { param: param.id }));
          })
          .catch(error => {
            this.isSaving = false;
            this.alertService.showHttpError(error.response);
          });
      } else {
        this.magasinService()
          .create(this.magasin)
          .then(param => {
            this.isSaving = false;
            this.previousState();
            this.alertService.showSuccess(this.t$('sellAmApp.magasin.created', { param: param.id }).toString());
          })
          .catch(error => {
            this.isSaving = false;
            this.alertService.showHttpError(error.response);
          });
      }
    },
  },
});
