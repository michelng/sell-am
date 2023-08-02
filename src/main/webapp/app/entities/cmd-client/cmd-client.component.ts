import { defineComponent, inject, onMounted, ref, Ref, watch, watchEffect } from 'vue';
import { useI18n } from 'vue-i18n';

import { ICmdClient } from '@/shared/model/cmd-client.model';
import { useDateFormat } from '@/shared/composables';
import CmdClientService from './cmd-client.service';
import { useAlertService } from '@/shared/alert/alert.service';

export default defineComponent({
  compatConfig: { MODE: 3 },
  name: 'CmdClient',
  setup() {
    const { t: t$ } = useI18n();
    const dateFormat = useDateFormat();
    const cmdClientService = inject('cmdClientService', () => new CmdClientService());
    const alertService = inject('alertService', () => useAlertService(), true);

    const cmdClients: Ref<ICmdClient[]> = ref([]);

    const isFetching = ref(false);

    const clear = () => {};

    const retrieveCmdClients = async () => {
      isFetching.value = true;
      try {
        const res = await cmdClientService().retrieve();
        cmdClients.value = res.data;
      } catch (err) {
        alertService.showHttpError(err.response);
      } finally {
        isFetching.value = false;
      }
    };

    const handleSyncList = () => {
      retrieveCmdClients();
    };

    onMounted(async () => {
      await retrieveCmdClients();
    });

    const removeId: Ref<number> = ref(null);
    const removeEntity = ref<any>(null);
    const prepareRemove = (instance: ICmdClient) => {
      removeId.value = instance.id;
      removeEntity.value.show();
    };
    const closeDialog = () => {
      removeEntity.value.hide();
    };
    const removeCmdClient = async () => {
      try {
        await cmdClientService().delete(removeId.value);
        const message = t$('sellAmApp.cmdClient.deleted', { param: removeId.value }).toString();
        alertService.showInfo(message, { variant: 'danger' });
        removeId.value = null;
        retrieveCmdClients();
        closeDialog();
      } catch (error) {
        alertService.showHttpError(error.response);
      }
    };

    return {
      cmdClients,
      handleSyncList,
      isFetching,
      retrieveCmdClients,
      clear,
      ...dateFormat,
      removeId,
      removeEntity,
      prepareRemove,
      closeDialog,
      removeCmdClient,
      t$,
    };
  },
});
