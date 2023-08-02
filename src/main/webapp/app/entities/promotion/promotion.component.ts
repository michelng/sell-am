import { defineComponent, inject, onMounted, ref, Ref, watch, watchEffect } from 'vue';
import { useI18n } from 'vue-i18n';

import { IPromotion } from '@/shared/model/promotion.model';
import { useDateFormat } from '@/shared/composables';
import PromotionService from './promotion.service';
import { useAlertService } from '@/shared/alert/alert.service';

export default defineComponent({
  compatConfig: { MODE: 3 },
  name: 'Promotion',
  setup() {
    const { t: t$ } = useI18n();
    const dateFormat = useDateFormat();
    const promotionService = inject('promotionService', () => new PromotionService());
    const alertService = inject('alertService', () => useAlertService(), true);

    const promotions: Ref<IPromotion[]> = ref([]);

    const isFetching = ref(false);

    const clear = () => {};

    const retrievePromotions = async () => {
      isFetching.value = true;
      try {
        const res = await promotionService().retrieve();
        promotions.value = res.data;
      } catch (err) {
        alertService.showHttpError(err.response);
      } finally {
        isFetching.value = false;
      }
    };

    const handleSyncList = () => {
      retrievePromotions();
    };

    onMounted(async () => {
      await retrievePromotions();
    });

    const removeId: Ref<number> = ref(null);
    const removeEntity = ref<any>(null);
    const prepareRemove = (instance: IPromotion) => {
      removeId.value = instance.id;
      removeEntity.value.show();
    };
    const closeDialog = () => {
      removeEntity.value.hide();
    };
    const removePromotion = async () => {
      try {
        await promotionService().delete(removeId.value);
        const message = t$('sellAmApp.promotion.deleted', { param: removeId.value }).toString();
        alertService.showInfo(message, { variant: 'danger' });
        removeId.value = null;
        retrievePromotions();
        closeDialog();
      } catch (error) {
        alertService.showHttpError(error.response);
      }
    };

    return {
      promotions,
      handleSyncList,
      isFetching,
      retrievePromotions,
      clear,
      ...dateFormat,
      removeId,
      removeEntity,
      prepareRemove,
      closeDialog,
      removePromotion,
      t$,
    };
  },
});
