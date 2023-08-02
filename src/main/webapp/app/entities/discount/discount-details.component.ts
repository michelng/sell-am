import { defineComponent, inject, ref, Ref } from 'vue';
import { useI18n } from 'vue-i18n';
import { useRoute, useRouter } from 'vue-router';

import { IDiscount } from '@/shared/model/discount.model';
import DiscountService from './discount.service';
import { useAlertService } from '@/shared/alert/alert.service';

export default defineComponent({
  compatConfig: { MODE: 3 },
  name: 'DiscountDetails',
  setup() {
    const discountService = inject('discountService', () => new DiscountService());
    const alertService = inject('alertService', () => useAlertService(), true);

    const route = useRoute();
    const router = useRouter();

    const previousState = () => router.go(-1);
    const discount: Ref<IDiscount> = ref({});

    const retrieveDiscount = async discountId => {
      try {
        const res = await discountService().find(discountId);
        discount.value = res;
      } catch (error) {
        alertService.showHttpError(error.response);
      }
    };

    if (route.params?.discountId) {
      retrieveDiscount(route.params.discountId);
    }

    return {
      alertService,
      discount,

      previousState,
      t$: useI18n().t,
    };
  },
});
