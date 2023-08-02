import { computed, defineComponent, inject, ref, Ref } from 'vue';
import { useI18n } from 'vue-i18n';
import { useRoute, useRouter } from 'vue-router';
import { useVuelidate } from '@vuelidate/core';

import { useValidation, useDateFormat } from '@/shared/composables';
import { useAlertService } from '@/shared/alert/alert.service';

import { IPromotion, Promotion } from '@/shared/model/promotion.model';
import PromotionService from './promotion.service';

export default defineComponent({
  compatConfig: { MODE: 3 },
  name: 'PromotionUpdate',
  setup() {
    const promotionService = inject('promotionService', () => new PromotionService());
    const alertService = inject('alertService', () => useAlertService(), true);

    const promotion: Ref<IPromotion> = ref(new Promotion());
    const isSaving = ref(false);
    const currentLanguage = inject('currentLanguage', () => computed(() => navigator.language ?? 'fr'), true);

    const route = useRoute();
    const router = useRouter();

    const previousState = () => router.go(-1);

    const retrievePromotion = async promotionId => {
      try {
        const res = await promotionService().find(promotionId);
        res.dateDebut = new Date(res.dateDebut);
        res.dateFin = new Date(res.dateFin);
        promotion.value = res;
      } catch (error) {
        alertService.showHttpError(error.response);
      }
    };

    if (route.params?.promotionId) {
      retrievePromotion(route.params.promotionId);
    }

    const { t: t$ } = useI18n();
    const validations = useValidation();
    const validationRules = {
      code: {},
      description: {},
      dateDebut: {},
      dateFin: {},
    };
    const v$ = useVuelidate(validationRules, promotion as any);
    v$.value.$validate();

    return {
      promotionService,
      alertService,
      promotion,
      previousState,
      isSaving,
      currentLanguage,
      v$,
      ...useDateFormat({ entityRef: promotion }),
      t$,
    };
  },
  created(): void {},
  methods: {
    save(): void {
      this.isSaving = true;
      if (this.promotion.id) {
        this.promotionService()
          .update(this.promotion)
          .then(param => {
            this.isSaving = false;
            this.previousState();
            this.alertService.showInfo(this.t$('sellAmApp.promotion.updated', { param: param.id }));
          })
          .catch(error => {
            this.isSaving = false;
            this.alertService.showHttpError(error.response);
          });
      } else {
        this.promotionService()
          .create(this.promotion)
          .then(param => {
            this.isSaving = false;
            this.previousState();
            this.alertService.showSuccess(this.t$('sellAmApp.promotion.created', { param: param.id }).toString());
          })
          .catch(error => {
            this.isSaving = false;
            this.alertService.showHttpError(error.response);
          });
      }
    },
  },
});
