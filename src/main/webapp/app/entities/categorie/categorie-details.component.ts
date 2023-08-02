import { defineComponent, inject, ref, Ref } from 'vue';
import { useI18n } from 'vue-i18n';
import { useRoute, useRouter } from 'vue-router';

import { ICategorie } from '@/shared/model/categorie.model';
import CategorieService from './categorie.service';
import { useAlertService } from '@/shared/alert/alert.service';

export default defineComponent({
  compatConfig: { MODE: 3 },
  name: 'CategorieDetails',
  setup() {
    const categorieService = inject('categorieService', () => new CategorieService());
    const alertService = inject('alertService', () => useAlertService(), true);

    const route = useRoute();
    const router = useRouter();

    const previousState = () => router.go(-1);
    const categorie: Ref<ICategorie> = ref({});

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

    return {
      alertService,
      categorie,

      previousState,
      t$: useI18n().t,
    };
  },
});
