import { defineComponent, inject, ref, Ref } from 'vue';
import { useI18n } from 'vue-i18n';
import { useRoute, useRouter } from 'vue-router';

import { useDateFormat } from '@/shared/composables';
import { ICmdFournisseur } from '@/shared/model/cmd-fournisseur.model';
import CmdFournisseurService from './cmd-fournisseur.service';
import { useAlertService } from '@/shared/alert/alert.service';

export default defineComponent({
  compatConfig: { MODE: 3 },
  name: 'CmdFournisseurDetails',
  setup() {
    const dateFormat = useDateFormat();
    const cmdFournisseurService = inject('cmdFournisseurService', () => new CmdFournisseurService());
    const alertService = inject('alertService', () => useAlertService(), true);

    const route = useRoute();
    const router = useRouter();

    const previousState = () => router.go(-1);
    const cmdFournisseur: Ref<ICmdFournisseur> = ref({});

    const retrieveCmdFournisseur = async cmdFournisseurId => {
      try {
        const res = await cmdFournisseurService().find(cmdFournisseurId);
        cmdFournisseur.value = res;
      } catch (error) {
        alertService.showHttpError(error.response);
      }
    };

    if (route.params?.cmdFournisseurId) {
      retrieveCmdFournisseur(route.params.cmdFournisseurId);
    }

    return {
      ...dateFormat,
      alertService,
      cmdFournisseur,

      previousState,
      t$: useI18n().t,
    };
  },
});
