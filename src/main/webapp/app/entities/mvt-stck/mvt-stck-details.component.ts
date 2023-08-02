import { defineComponent, inject, ref, Ref } from 'vue';
import { useI18n } from 'vue-i18n';
import { useRoute, useRouter } from 'vue-router';

import { useDateFormat } from '@/shared/composables';
import { IMvtStck } from '@/shared/model/mvt-stck.model';
import MvtStckService from './mvt-stck.service';
import { useAlertService } from '@/shared/alert/alert.service';

export default defineComponent({
  compatConfig: { MODE: 3 },
  name: 'MvtStckDetails',
  setup() {
    const dateFormat = useDateFormat();
    const mvtStckService = inject('mvtStckService', () => new MvtStckService());
    const alertService = inject('alertService', () => useAlertService(), true);

    const route = useRoute();
    const router = useRouter();

    const previousState = () => router.go(-1);
    const mvtStck: Ref<IMvtStck> = ref({});

    const retrieveMvtStck = async mvtStckId => {
      try {
        const res = await mvtStckService().find(mvtStckId);
        mvtStck.value = res;
      } catch (error) {
        alertService.showHttpError(error.response);
      }
    };

    if (route.params?.mvtStckId) {
      retrieveMvtStck(route.params.mvtStckId);
    }

    return {
      ...dateFormat,
      alertService,
      mvtStck,

      previousState,
      t$: useI18n().t,
    };
  },
});
