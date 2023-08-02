import { defineComponent, inject, ref, Ref } from 'vue';
import { useI18n } from 'vue-i18n';
import { useRoute, useRouter } from 'vue-router';

import { useDateFormat } from '@/shared/composables';
import { ILigneCmdFournisseur } from '@/shared/model/ligne-cmd-fournisseur.model';
import LigneCmdFournisseurService from './ligne-cmd-fournisseur.service';
import { useAlertService } from '@/shared/alert/alert.service';

export default defineComponent({
  compatConfig: { MODE: 3 },
  name: 'LigneCmdFournisseurDetails',
  setup() {
    const dateFormat = useDateFormat();
    const ligneCmdFournisseurService = inject('ligneCmdFournisseurService', () => new LigneCmdFournisseurService());
    const alertService = inject('alertService', () => useAlertService(), true);

    const route = useRoute();
    const router = useRouter();

    const previousState = () => router.go(-1);
    const ligneCmdFournisseur: Ref<ILigneCmdFournisseur> = ref({});

    const retrieveLigneCmdFournisseur = async ligneCmdFournisseurId => {
      try {
        const res = await ligneCmdFournisseurService().find(ligneCmdFournisseurId);
        ligneCmdFournisseur.value = res;
      } catch (error) {
        alertService.showHttpError(error.response);
      }
    };

    if (route.params?.ligneCmdFournisseurId) {
      retrieveLigneCmdFournisseur(route.params.ligneCmdFournisseurId);
    }

    return {
      ...dateFormat,
      alertService,
      ligneCmdFournisseur,

      previousState,
      t$: useI18n().t,
    };
  },
});
