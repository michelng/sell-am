import { computed, defineComponent, inject, ref, Ref } from 'vue';
import { useI18n } from 'vue-i18n';
import { useRoute, useRouter } from 'vue-router';
import { useVuelidate } from '@vuelidate/core';

import { useValidation } from '@/shared/composables';
import { useAlertService } from '@/shared/alert/alert.service';

import { ICategorie, Categorie } from '@/shared/model/categorie.model';
import CategorieService from './categorie.service';

export default defineComponent({
  compatConfig: { MODE: 3 },
  name: 'CategorieUpdate',
  setup() {
    const categorieService = inject('categorieService', () => new CategorieService());
    const alertService = inject('alertService', () => useAlertService(), true);

    const categorie: Ref<ICategorie> = ref(new Categorie());
    const isSaving = ref(false);
    const currentLanguage = inject('currentLanguage', () => computed(() => navigator.language ?? 'fr'), true);

    const route = useRoute();
    const router = useRouter();

    const previousState = () => router.go(-1);

    const retrieveCategorie = async categorieId => {
      try {
        const res = await categorieService().find(categorieId);
        categorie.value = res;
      } catch (error) {
        alertService.showHttpError(error.response);
      }
    };

    if (route.params?.categorieId) {
      retrieveCategorie(route.params.categorieId);
    }

    const { t: t$ } = useI18n();
    const validations = useValidation();
    const validationRules = {
      code: {},
      designation: {},
      description: {},
    };
    const v$ = useVuelidate(validationRules, categorie as any);
    v$.value.$validate();

    return {
      categorieService,
      alertService,
      categorie,
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
      if (this.categorie.id) {
        this.categorieService()
          .update(this.categorie)
          .then(param => {
            this.isSaving = false;
            this.previousState();
            this.alertService.showInfo(this.t$('sellAmApp.categorie.updated', { param: param.id }));
          })
          .catch(error => {
            this.isSaving = false;
            this.alertService.showHttpError(error.response);
          });
      } else {
        this.categorieService()
          .create(this.categorie)
          .then(param => {
            this.isSaving = false;
            this.previousState();
            this.alertService.showSuccess(this.t$('sellAmApp.categorie.created', { param: param.id }).toString());
          })
          .catch(error => {
            this.isSaving = false;
            this.alertService.showHttpError(error.response);
          });
      }
    },
  },
});
