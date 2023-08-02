import { defineComponent, inject, onMounted, ref, Ref, watch, watchEffect } from 'vue';
import { useI18n } from 'vue-i18n';

import { ILigneVente } from '@/shared/model/ligne-vente.model';
import LigneVenteService from './ligne-vente.service';
import { useAlertService } from '@/shared/alert/alert.service';

export default defineComponent({
  compatConfig: { MODE: 3 },
  name: 'LigneVente',
  setup() {
    const { t: t$ } = useI18n();
    const ligneVenteService = inject('ligneVenteService', () => new LigneVenteService());
    const alertService = inject('alertService', () => useAlertService(), true);

    const ligneVentes: Ref<ILigneVente[]> = ref([]);

    const isFetching = ref(false);

    const clear = () => {};

    const retrieveLigneVentes = async () => {
      isFetching.value = true;
      try {
        const res = await ligneVenteService().retrieve();
        ligneVentes.value = res.data;
      } catch (err) {
        alertService.showHttpError(err.response);
      } finally {
        isFetching.value = false;
      }
    };

    const handleSyncList = () => {
      retrieveLigneVentes();
    };

    onMounted(async () => {
      await retrieveLigneVentes();
    });

    const removeId: Ref<number> = ref(null);
    const removeEntity = ref<any>(null);
    const prepareRemove = (instance: ILigneVente) => {
      removeId.value = instance.id;
      removeEntity.value.show();
    };
    const closeDialog = () => {
      removeEntity.value.hide();
    };
    const removeLigneVente = async () => {
      try {
        await ligneVenteService().delete(removeId.value);
        const message = t$('sellAmApp.ligneVente.deleted', { param: removeId.value }).toString();
        alertService.showInfo(message, { variant: 'danger' });
        removeId.value = null;
        retrieveLigneVentes();
        closeDialog();
      } catch (error) {
        alertService.showHttpError(error.response);
      }
    };

    return {
      ligneVentes,
      handleSyncList,
      isFetching,
      retrieveLigneVentes,
      clear,
      removeId,
      removeEntity,
      prepareRemove,
      closeDialog,
      removeLigneVente,
      t$,
    };
  },
});
