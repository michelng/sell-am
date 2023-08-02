import { defineComponent, inject, ref, Ref } from 'vue';
import { useI18n } from 'vue-i18n';
import { useRoute, useRouter } from 'vue-router';

import { useDateFormat } from '@/shared/composables';
import { IFacture } from '@/shared/model/facture.model';
import FactureService from './facture.service';
import { useAlertService } from '@/shared/alert/alert.service';

export default defineComponent({
  compatConfig: { MODE: 3 },
  name: 'FactureDetails',
  setup() {
    const dateFormat = useDateFormat();
    const factureService = inject('factureService', () => new FactureService());
    const alertService = inject('alertService', () => useAlertService(), true);

    const route = useRoute();
    const router = useRouter();

    const previousState = () => router.go(-1);
    const facture: Ref<IFacture> = ref({});

    const retrieveFacture = async factureId => {
      try {
        const res = await factureService().find(factureId);
        facture.value = res;
      } catch (error) {
        alertService.showHttpError(error.response);
      }
    };

    if (route.params?.factureId) {
      retrieveFacture(route.params.factureId);
    }

    return {
      ...dateFormat,
      alertService,
      facture,

      previousState,
      t$: useI18n().t,
    };
  },
});
