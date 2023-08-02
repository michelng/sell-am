import { defineComponent, inject, onMounted, ref, Ref, watch, watchEffect } from 'vue';
import { useI18n } from 'vue-i18n';

import { IFournisseur } from '@/shared/model/fournisseur.model';
import FournisseurService from './fournisseur.service';
import { useAlertService } from '@/shared/alert/alert.service';

export default defineComponent({
  compatConfig: { MODE: 3 },
  name: 'Fournisseur',
  setup() {
    const { t: t$ } = useI18n();
    const fournisseurService = inject('fournisseurService', () => new FournisseurService());
    const alertService = inject('alertService', () => useAlertService(), true);

    const fournisseurs: Ref<IFournisseur[]> = ref([]);

    const isFetching = ref(false);

    const clear = () => {};

    const retrieveFournisseurs = async () => {
      isFetching.value = true;
      try {
        const res = await fournisseurService().retrieve();
        fournisseurs.value = res.data;
      } catch (err) {
        alertService.showHttpError(err.response);
      } finally {
        isFetching.value = false;
      }
    };

    const handleSyncList = () => {
      retrieveFournisseurs();
    };

    onMounted(async () => {
      await retrieveFournisseurs();
    });

    const removeId: Ref<number> = ref(null);
    const removeEntity = ref<any>(null);
    const prepareRemove = (instance: IFournisseur) => {
      removeId.value = instance.id;
      removeEntity.value.show();
    };
    const closeDialog = () => {
      removeEntity.value.hide();
    };
    const removeFournisseur = async () => {
      try {
        await fournisseurService().delete(removeId.value);
        const message = t$('sellAmApp.fournisseur.deleted', { param: removeId.value }).toString();
        alertService.showInfo(message, { variant: 'danger' });
        removeId.value = null;
        retrieveFournisseurs();
        closeDialog();
      } catch (error) {
        alertService.showHttpError(error.response);
      }
    };

    return {
      fournisseurs,
      handleSyncList,
      isFetching,
      retrieveFournisseurs,
      clear,
      removeId,
      removeEntity,
      prepareRemove,
      closeDialog,
      removeFournisseur,
      t$,
    };
  },
});
