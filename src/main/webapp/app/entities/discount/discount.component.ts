import { defineComponent, inject, onMounted, ref, Ref, watch, watchEffect } from 'vue';
import { useI18n } from 'vue-i18n';

import { IDiscount } from '@/shared/model/discount.model';
import DiscountService from './discount.service';
import { useAlertService } from '@/shared/alert/alert.service';

export default defineComponent({
  compatConfig: { MODE: 3 },
  name: 'Discount',
  setup() {
    const { t: t$ } = useI18n();
    const discountService = inject('discountService', () => new DiscountService());
    const alertService = inject('alertService', () => useAlertService(), true);

    const discounts: Ref<IDiscount[]> = ref([]);

    const isFetching = ref(false);

    const clear = () => {};

    const retrieveDiscounts = async () => {
      isFetching.value = true;
      try {
        const res = await discountService().retrieve();
        discounts.value = res.data;
      } catch (err) {
        alertService.showHttpError(err.response);
      } finally {
        isFetching.value = false;
      }
    };

    const handleSyncList = () => {
      retrieveDiscounts();
    };

    onMounted(async () => {
      await retrieveDiscounts();
    });

    const removeId: Ref<number> = ref(null);
    const removeEntity = ref<any>(null);
    const prepareRemove = (instance: IDiscount) => {
      removeId.value = instance.id;
      removeEntity.value.show();
    };
    const closeDialog = () => {
      removeEntity.value.hide();
    };
    const removeDiscount = async () => {
      try {
        await discountService().delete(removeId.value);
        const message = t$('sellAmApp.discount.deleted', { param: removeId.value }).toString();
        alertService.showInfo(message, { variant: 'danger' });
        removeId.value = null;
        retrieveDiscounts();
        closeDialog();
      } catch (error) {
        alertService.showHttpError(error.response);
      }
    };

    return {
      discounts,
      handleSyncList,
      isFetching,
      retrieveDiscounts,
      clear,
      removeId,
      removeEntity,
      prepareRemove,
      closeDialog,
      removeDiscount,
      t$,
    };
  },
});
