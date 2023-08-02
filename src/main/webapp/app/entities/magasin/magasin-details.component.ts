import { defineComponent, inject, ref, Ref } from 'vue';
import { useI18n } from 'vue-i18n';
import { useRoute, useRouter } from 'vue-router';

import { IMagasin } from '@/shared/model/magasin.model';
import MagasinService from './magasin.service';
import { useAlertService } from '@/shared/alert/alert.service';

export default defineComponent({
  compatConfig: { MODE: 3 },
  name: 'MagasinDetails',
  setup() {
    const magasinService = inject('magasinService', () => new MagasinService());
    const alertService = inject('alertService', () => useAlertService(), true);

    const route = useRoute();
    const router = useRouter();

    const previousState = () => router.go(-1);
    const magasin: Ref<IMagasin> = ref({});

    const retrieveMagasin = async magasinId => {
      try {
        const res = await magasinService().find(magasinId);
        magasin.value = res;
      } catch (error) {
        alertService.showHttpError(error.response);
      }
    };

    if (route.params?.magasinId) {
      retrieveMagasin(route.params.magasinId);
    }

    return {
      alertService,
      magasin,

      previousState,
      t$: useI18n().t,
    };
  },
});
