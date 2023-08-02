import { computed, defineComponent, inject, ref, Ref } from 'vue';
import { useI18n } from 'vue-i18n';
import { useRoute, useRouter } from 'vue-router';
import { useVuelidate } from '@vuelidate/core';

import { useValidation } from '@/shared/composables';
import { useAlertService } from '@/shared/alert/alert.service';

import { IDiscount, Discount } from '@/shared/model/discount.model';
import DiscountService from './discount.service';

export default defineComponent({
  compatConfig: { MODE: 3 },
  name: 'DiscountUpdate',
  setup() {
    const discountService = inject('discountService', () => new DiscountService());
    const alertService = inject('alertService', () => useAlertService(), true);

    const discount: Ref<IDiscount> = ref(new Discount());
    const isSaving = ref(false);
    const currentLanguage = inject('currentLanguage', () => computed(() => navigator.language ?? 'fr'), true);

    const route = useRoute();
    const router = useRouter();

    const previousState = () => router.go(-1);

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

    const { t: t$ } = useI18n();
    const validations = useValidation();
    const validationRules = {
      code: {},
      description: {},
      montant: {},
    };
    const v$ = useVuelidate(validationRules, discount as any);
    v$.value.$validate();

    return {
      discountService,
      alertService,
      discount,
      previousState,
      isSaving,
      currentLanguage,
      v$,
      t$,
    };
  },
  created(): void {},
  methods: {
    save(): void {
      this.isSaving = true;
      if (this.discount.id) {
        this.discountService()
          .update(this.discount)
          .then(param => {
            this.isSaving = false;
            this.previousState();
            this.alertService.showInfo(this.t$('sellAmApp.discount.updated', { param: param.id }));
          })
          .catch(error => {
            this.isSaving = false;
            this.alertService.showHttpError(error.response);
          });
      } else {
        this.discountService()
          .create(this.discount)
          .then(param => {
            this.isSaving = false;
            this.previousState();
            this.alertService.showSuccess(this.t$('sellAmApp.discount.created', { param: param.id }).toString());
          })
          .catch(error => {
            this.isSaving = false;
            this.alertService.showHttpError(error.response);
          });
      }
    },
  },
});
