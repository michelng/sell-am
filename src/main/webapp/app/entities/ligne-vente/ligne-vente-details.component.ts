import { defineComponent, inject, ref, Ref } from 'vue';
import { useI18n } from 'vue-i18n';
import { useRoute, useRouter } from 'vue-router';

import { ILigneVente } from '@/shared/model/ligne-vente.model';
import LigneVenteService from './ligne-vente.service';
import { useAlertService } from '@/shared/alert/alert.service';

export default defineComponent({
  compatConfig: { MODE: 3 },
  name: 'LigneVenteDetails',
  setup() {
    const ligneVenteService = inject('ligneVenteService', () => new LigneVenteService());
    const alertService = inject('alertService', () => useAlertService(), true);

    const route = useRoute();
    const router = useRouter();

    const previousState = () => router.go(-1);
    const ligneVente: Ref<ILigneVente> = ref({});

    const retrieveLigneVente = async ligneVenteId => {
      try {
        const res = await ligneVenteService().find(ligneVenteId);
        ligneVente.value = res;
      } catch (error) {
        alertService.showHttpError(error.response);
      }
    };

    if (route.params?.ligneVenteId) {
      retrieveLigneVente(route.params.ligneVenteId);
    }

    return {
      alertService,
      ligneVente,

      previousState,
      t$: useI18n().t,
    };
  },
});
