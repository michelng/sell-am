import { defineComponent, inject, onMounted, ref, Ref, watch, watchEffect } from 'vue';
import { useI18n } from 'vue-i18n';

import { ICmdFournisseur } from '@/shared/model/cmd-fournisseur.model';
import { useDateFormat } from '@/shared/composables';
import CmdFournisseurService from './cmd-fournisseur.service';
import { useAlertService } from '@/shared/alert/alert.service';

export default defineComponent({
  compatConfig: { MODE: 3 },
  name: 'CmdFournisseur',
  setup() {
    const { t: t$ } = useI18n();
    const dateFormat = useDateFormat();
    const cmdFournisseurService = inject('cmdFournisseurService', () => new CmdFournisseurService());
    const alertService = inject('alertService', () => useAlertService(), true);

    const cmdFournisseurs: Ref<ICmdFournisseur[]> = ref([]);

    const isFetching = ref(false);

    const clear = () => {};

    const retrieveCmdFournisseurs = async () => {
      isFetching.value = true;
      try {
        const res = await cmdFournisseurService().retrieve();
        cmdFournisseurs.value = res.data;
      } catch (err) {
        alertService.showHttpError(err.response);
      } finally {
        isFetching.value = false;
      }
    };

    const handleSyncList = () => {
      retrieveCmdFournisseurs();
    };

    onMounted(async () => {
      await retrieveCmdFournisseurs();
    });

    const removeId: Ref<number> = ref(null);
    const removeEntity = ref<any>(null);
    const prepareRemove = (instance: ICmdFournisseur) => {
      removeId.value = instance.id;
      removeEntity.value.show();
    };
    const closeDialog = () => {
      removeEntity.value.hide();
    };
    const removeCmdFournisseur = async () => {
      try {
        await cmdFournisseurService().delete(removeId.value);
        const message = t$('sellAmApp.cmdFournisseur.deleted', { param: removeId.value }).toString();
        alertService.showInfo(message, { variant: 'danger' });
        removeId.value = null;
        retrieveCmdFournisseurs();
        closeDialog();
      } catch (error) {
        alertService.showHttpError(error.response);
      }
    };

    return {
      cmdFournisseurs,
      handleSyncList,
      isFetching,
      retrieveCmdFournisseurs,
      clear,
      ...dateFormat,
      removeId,
      removeEntity,
      prepareRemove,
      closeDialog,
      removeCmdFournisseur,
      t$,
    };
  },
});
