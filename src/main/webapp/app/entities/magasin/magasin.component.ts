import { defineComponent, inject, onMounted, ref, Ref, watch, watchEffect } from 'vue';
import { useI18n } from 'vue-i18n';

import { IMagasin } from '@/shared/model/magasin.model';
import MagasinService from './magasin.service';
import { useAlertService } from '@/shared/alert/alert.service';

export default defineComponent({
  compatConfig: { MODE: 3 },
  name: 'Magasin',
  setup() {
    const { t: t$ } = useI18n();
    const magasinService = inject('magasinService', () => new MagasinService());
    const alertService = inject('alertService', () => useAlertService(), true);

    const magasins: Ref<IMagasin[]> = ref([]);

    const isFetching = ref(false);

    const clear = () => {};

    const retrieveMagasins = async () => {
      isFetching.value = true;
      try {
        const res = await magasinService().retrieve();
        magasins.value = res.data;
      } catch (err) {
        alertService.showHttpError(err.response);
      } finally {
        isFetching.value = false;
      }
    };

    const handleSyncList = () => {
      retrieveMagasins();
    };

    onMounted(async () => {
      await retrieveMagasins();
    });

    const removeId: Ref<number> = ref(null);
    const removeEntity = ref<any>(null);
    const prepareRemove = (instance: IMagasin) => {
      removeId.value = instance.id;
      removeEntity.value.show();
    };
    const closeDialog = () => {
      removeEntity.value.hide();
    };
    const removeMagasin = async () => {
      try {
        await magasinService().delete(removeId.value);
        const message = t$('sellAmApp.magasin.deleted', { param: removeId.value }).toString();
        alertService.showInfo(message, { variant: 'danger' });
        removeId.value = null;
        retrieveMagasins();
        closeDialog();
      } catch (error) {
        alertService.showHttpError(error.response);
      }
    };

    return {
      magasins,
      handleSyncList,
      isFetching,
      retrieveMagasins,
      clear,
      removeId,
      removeEntity,
      prepareRemove,
      closeDialog,
      removeMagasin,
      t$,
    };
  },
});
