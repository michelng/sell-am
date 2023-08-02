import { defineComponent, inject, onMounted, ref, Ref, watch, watchEffect } from 'vue';
import { useI18n } from 'vue-i18n';

import { IVente } from '@/shared/model/vente.model';
import { useDateFormat } from '@/shared/composables';
import VenteService from './vente.service';
import { useAlertService } from '@/shared/alert/alert.service';

export default defineComponent({
  compatConfig: { MODE: 3 },
  name: 'Vente',
  setup() {
    const { t: t$ } = useI18n();
    const dateFormat = useDateFormat();
    const venteService = inject('venteService', () => new VenteService());
    const alertService = inject('alertService', () => useAlertService(), true);

    const ventes: Ref<IVente[]> = ref([]);

    const isFetching = ref(false);

    const clear = () => {};

    const retrieveVentes = async () => {
      isFetching.value = true;
      try {
        const res = await venteService().retrieve();
        ventes.value = res.data;
      } catch (err) {
        alertService.showHttpError(err.response);
      } finally {
        isFetching.value = false;
      }
    };

    const handleSyncList = () => {
      retrieveVentes();
    };

    onMounted(async () => {
      await retrieveVentes();
    });

    const removeId: Ref<number> = ref(null);
    const removeEntity = ref<any>(null);
    const prepareRemove = (instance: IVente) => {
      removeId.value = instance.id;
      removeEntity.value.show();
    };
    const closeDialog = () => {
      removeEntity.value.hide();
    };
    const removeVente = async () => {
      try {
        await venteService().delete(removeId.value);
        const message = t$('sellAmApp.vente.deleted', { param: removeId.value }).toString();
        alertService.showInfo(message, { variant: 'danger' });
        removeId.value = null;
        retrieveVentes();
        closeDialog();
      } catch (error) {
        alertService.showHttpError(error.response);
      }
    };

    return {
      ventes,
      handleSyncList,
      isFetching,
      retrieveVentes,
      clear,
      ...dateFormat,
      removeId,
      removeEntity,
      prepareRemove,
      closeDialog,
      removeVente,
      t$,
    };
  },
});
