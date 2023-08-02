import { defineComponent, inject, ref, Ref } from 'vue';
import { useI18n } from 'vue-i18n';
import { useRoute, useRouter } from 'vue-router';

import { IFournisseur } from '@/shared/model/fournisseur.model';
import FournisseurService from './fournisseur.service';
import { useAlertService } from '@/shared/alert/alert.service';

export default defineComponent({
  compatConfig: { MODE: 3 },
  name: 'FournisseurDetails',
  setup() {
    const fournisseurService = inject('fournisseurService', () => new FournisseurService());
    const alertService = inject('alertService', () => useAlertService(), true);

    const route = useRoute();
    const router = useRouter();

    const previousState = () => router.go(-1);
    const fournisseur: Ref<IFournisseur> = ref({});

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

    return {
      alertService,
      fournisseur,

      previousState,
      t$: useI18n().t,
    };
  },
});
