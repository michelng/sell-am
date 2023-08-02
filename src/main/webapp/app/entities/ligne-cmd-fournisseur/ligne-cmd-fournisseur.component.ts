import { defineComponent, inject, onMounted, ref, Ref, watch, watchEffect } from 'vue';
import { useI18n } from 'vue-i18n';

import { ILigneCmdFournisseur } from '@/shared/model/ligne-cmd-fournisseur.model';
import { useDateFormat } from '@/shared/composables';
import LigneCmdFournisseurService from './ligne-cmd-fournisseur.service';
import { useAlertService } from '@/shared/alert/alert.service';

export default defineComponent({
  compatConfig: { MODE: 3 },
  name: 'LigneCmdFournisseur',
  setup() {
    const { t: t$ } = useI18n();
    const dateFormat = useDateFormat();
    const ligneCmdFournisseurService = inject('ligneCmdFournisseurService', () => new LigneCmdFournisseurService());
    const alertService = inject('alertService', () => useAlertService(), true);

    const ligneCmdFournisseurs: Ref<ILigneCmdFournisseur[]> = ref([]);

    const isFetching = ref(false);

    const clear = () => {};

    const retrieveLigneCmdFournisseurs = async () => {
      isFetching.value = true;
      try {
        const res = await ligneCmdFournisseurService().retrieve();
        ligneCmdFournisseurs.value = res.data;
      } catch (err) {
        alertService.showHttpError(err.response);
      } finally {
        isFetching.value = false;
      }
    };

    const handleSyncList = () => {
      retrieveLigneCmdFournisseurs();
    };

    onMounted(async () => {
      await retrieveLigneCmdFournisseurs();
    });

    const removeId: Ref<number> = ref(null);
    const removeEntity = ref<any>(null);
    const prepareRemove = (instance: ILigneCmdFournisseur) => {
      removeId.value = instance.id;
      removeEntity.value.show();
    };
    const closeDialog = () => {
      removeEntity.value.hide();
    };
    const removeLigneCmdFournisseur = async () => {
      try {
        await ligneCmdFournisseurService().delete(removeId.value);
        const message = t$('sellAmApp.ligneCmdFournisseur.deleted', { param: removeId.value }).toString();
        alertService.showInfo(message, { variant: 'danger' });
        removeId.value = null;
        retrieveLigneCmdFournisseurs();
        closeDialog();
      } catch (error) {
        alertService.showHttpError(error.response);
      }
    };

    return {
      ligneCmdFournisseurs,
      handleSyncList,
      isFetching,
      retrieveLigneCmdFournisseurs,
      clear,
      ...dateFormat,
      removeId,
      removeEntity,
      prepareRemove,
      closeDialog,
      removeLigneCmdFournisseur,
      t$,
    };
  },
});
