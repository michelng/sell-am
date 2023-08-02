import { defineComponent, inject, onMounted, ref, Ref, watch, watchEffect } from 'vue';
import { useI18n } from 'vue-i18n';

import { ILigneCmdClient } from '@/shared/model/ligne-cmd-client.model';
import { useDateFormat } from '@/shared/composables';
import LigneCmdClientService from './ligne-cmd-client.service';
import { useAlertService } from '@/shared/alert/alert.service';

export default defineComponent({
  compatConfig: { MODE: 3 },
  name: 'LigneCmdClient',
  setup() {
    const { t: t$ } = useI18n();
    const dateFormat = useDateFormat();
    const ligneCmdClientService = inject('ligneCmdClientService', () => new LigneCmdClientService());
    const alertService = inject('alertService', () => useAlertService(), true);

    const ligneCmdClients: Ref<ILigneCmdClient[]> = ref([]);

    const isFetching = ref(false);

    const clear = () => {};

    const retrieveLigneCmdClients = async () => {
      isFetching.value = true;
      try {
        const res = await ligneCmdClientService().retrieve();
        ligneCmdClients.value = res.data;
      } catch (err) {
        alertService.showHttpError(err.response);
      } finally {
        isFetching.value = false;
      }
    };

    const handleSyncList = () => {
      retrieveLigneCmdClients();
    };

    onMounted(async () => {
      await retrieveLigneCmdClients();
    });

    const removeId: Ref<number> = ref(null);
    const removeEntity = ref<any>(null);
    const prepareRemove = (instance: ILigneCmdClient) => {
      removeId.value = instance.id;
      removeEntity.value.show();
    };
    const closeDialog = () => {
      removeEntity.value.hide();
    };
    const removeLigneCmdClient = async () => {
      try {
        await ligneCmdClientService().delete(removeId.value);
        const message = t$('sellAmApp.ligneCmdClient.deleted', { param: removeId.value }).toString();
        alertService.showInfo(message, { variant: 'danger' });
        removeId.value = null;
        retrieveLigneCmdClients();
        closeDialog();
      } catch (error) {
        alertService.showHttpError(error.response);
      }
    };

    return {
      ligneCmdClients,
      handleSyncList,
      isFetching,
      retrieveLigneCmdClients,
      clear,
      ...dateFormat,
      removeId,
      removeEntity,
      prepareRemove,
      closeDialog,
      removeLigneCmdClient,
      t$,
    };
  },
});
