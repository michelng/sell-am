import { defineComponent, inject, onMounted, ref, Ref, watch, watchEffect } from 'vue';
import { useI18n } from 'vue-i18n';

import { IMvtStck } from '@/shared/model/mvt-stck.model';
import { useDateFormat } from '@/shared/composables';
import MvtStckService from './mvt-stck.service';
import { useAlertService } from '@/shared/alert/alert.service';

export default defineComponent({
  compatConfig: { MODE: 3 },
  name: 'MvtStck',
  setup() {
    const { t: t$ } = useI18n();
    const dateFormat = useDateFormat();
    const mvtStckService = inject('mvtStckService', () => new MvtStckService());
    const alertService = inject('alertService', () => useAlertService(), true);

    const mvtStcks: Ref<IMvtStck[]> = ref([]);

    const isFetching = ref(false);

    const clear = () => {};

    const retrieveMvtStcks = async () => {
      isFetching.value = true;
      try {
        const res = await mvtStckService().retrieve();
        mvtStcks.value = res.data;
      } catch (err) {
        alertService.showHttpError(err.response);
      } finally {
        isFetching.value = false;
      }
    };

    const handleSyncList = () => {
      retrieveMvtStcks();
    };

    onMounted(async () => {
      await retrieveMvtStcks();
    });

    const removeId: Ref<number> = ref(null);
    const removeEntity = ref<any>(null);
    const prepareRemove = (instance: IMvtStck) => {
      removeId.value = instance.id;
      removeEntity.value.show();
    };
    const closeDialog = () => {
      removeEntity.value.hide();
    };
    const removeMvtStck = async () => {
      try {
        await mvtStckService().delete(removeId.value);
        const message = t$('sellAmApp.mvtStck.deleted', { param: removeId.value }).toString();
        alertService.showInfo(message, { variant: 'danger' });
        removeId.value = null;
        retrieveMvtStcks();
        closeDialog();
      } catch (error) {
        alertService.showHttpError(error.response);
      }
    };

    return {
      mvtStcks,
      handleSyncList,
      isFetching,
      retrieveMvtStcks,
      clear,
      ...dateFormat,
      removeId,
      removeEntity,
      prepareRemove,
      closeDialog,
      removeMvtStck,
      t$,
    };
  },
});
