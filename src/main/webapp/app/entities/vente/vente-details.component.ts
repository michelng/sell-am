import { defineComponent, inject, ref, Ref } from 'vue';
import { useI18n } from 'vue-i18n';
import { useRoute, useRouter } from 'vue-router';

import { useDateFormat } from '@/shared/composables';
import { IVente } from '@/shared/model/vente.model';
import VenteService from './vente.service';
import { useAlertService } from '@/shared/alert/alert.service';

export default defineComponent({
  compatConfig: { MODE: 3 },
  name: 'VenteDetails',
  setup() {
    const dateFormat = useDateFormat();
    const venteService = inject('venteService', () => new VenteService());
    const alertService = inject('alertService', () => useAlertService(), true);

    const route = useRoute();
    const router = useRouter();

    const previousState = () => router.go(-1);
    const vente: Ref<IVente> = ref({});

    const retrieveVente = async venteId => {
      try {
        const res = await venteService().find(venteId);
        vente.value = res;
      } catch (error) {
        alertService.showHttpError(error.response);
      }
    };

    if (route.params?.venteId) {
      retrieveVente(route.params.venteId);
    }

    return {
      ...dateFormat,
      alertService,
      vente,

      previousState,
      t$: useI18n().t,
    };
  },
});
