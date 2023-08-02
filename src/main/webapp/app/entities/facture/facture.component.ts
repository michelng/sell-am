import { defineComponent, inject, onMounted, ref, Ref, watch, watchEffect } from 'vue';
import { useI18n } from 'vue-i18n';

import { IFacture } from '@/shared/model/facture.model';
import { useDateFormat } from '@/shared/composables';
import FactureService from './facture.service';
import { useAlertService } from '@/shared/alert/alert.service';

export default defineComponent({
  compatConfig: { MODE: 3 },
  name: 'Facture',
  setup() {
    const { t: t$ } = useI18n();
    const dateFormat = useDateFormat();
    const factureService = inject('factureService', () => new FactureService());
    const alertService = inject('alertService', () => useAlertService(), true);

    const factures: Ref<IFacture[]> = ref([]);

    const isFetching = ref(false);

    const clear = () => {};

    const retrieveFactures = async () => {
      isFetching.value = true;
      try {
        const res = await factureService().retrieve();
        factures.value = res.data;
      } catch (err) {
        alertService.showHttpError(err.response);
      } finally {
        isFetching.value = false;
      }
    };

    const handleSyncList = () => {
      retrieveFactures();
    };

    onMounted(async () => {
      await retrieveFactures();
    });

    const removeId: Ref<number> = ref(null);
    const removeEntity = ref<any>(null);
    const prepareRemove = (instance: IFacture) => {
      removeId.value = instance.id;
      removeEntity.value.show();
    };
    const closeDialog = () => {
      removeEntity.value.hide();
    };
    const removeFacture = async () => {
      try {
        await factureService().delete(removeId.value);
        const message = t$('sellAmApp.facture.deleted', { param: removeId.value }).toString();
        alertService.showInfo(message, { variant: 'danger' });
        removeId.value = null;
        retrieveFactures();
        closeDialog();
      } catch (error) {
        alertService.showHttpError(error.response);
      }
    };

    return {
      factures,
      handleSyncList,
      isFetching,
      retrieveFactures,
      clear,
      ...dateFormat,
      removeId,
      removeEntity,
      prepareRemove,
      closeDialog,
      removeFacture,
      t$,
    };
  },
});
