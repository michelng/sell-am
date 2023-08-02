import { defineComponent, inject, ref, Ref } from 'vue';
import { useI18n } from 'vue-i18n';
import { useRoute, useRouter } from 'vue-router';

import { IEntreprise } from '@/shared/model/entreprise.model';
import EntrepriseService from './entreprise.service';
import { useAlertService } from '@/shared/alert/alert.service';

export default defineComponent({
  compatConfig: { MODE: 3 },
  name: 'EntrepriseDetails',
  setup() {
    const entrepriseService = inject('entrepriseService', () => new EntrepriseService());
    const alertService = inject('alertService', () => useAlertService(), true);

    const route = useRoute();
    const router = useRouter();

    const previousState = () => router.go(-1);
    const entreprise: Ref<IEntreprise> = ref({});

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

    return {
      alertService,
      entreprise,

      previousState,
      t$: useI18n().t,
    };
  },
});
