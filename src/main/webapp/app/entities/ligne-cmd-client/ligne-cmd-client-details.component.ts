import { defineComponent, inject, ref, Ref } from 'vue';
import { useI18n } from 'vue-i18n';
import { useRoute, useRouter } from 'vue-router';

import { useDateFormat } from '@/shared/composables';
import { ILigneCmdClient } from '@/shared/model/ligne-cmd-client.model';
import LigneCmdClientService from './ligne-cmd-client.service';
import { useAlertService } from '@/shared/alert/alert.service';

export default defineComponent({
  compatConfig: { MODE: 3 },
  name: 'LigneCmdClientDetails',
  setup() {
    const dateFormat = useDateFormat();
    const ligneCmdClientService = inject('ligneCmdClientService', () => new LigneCmdClientService());
    const alertService = inject('alertService', () => useAlertService(), true);

    const route = useRoute();
    const router = useRouter();

    const previousState = () => router.go(-1);
    const ligneCmdClient: Ref<ILigneCmdClient> = ref({});

    const retrieveLigneCmdClient = async ligneCmdClientId => {
      try {
        const res = await ligneCmdClientService().find(ligneCmdClientId);
        ligneCmdClient.value = res;
      } catch (error) {
        alertService.showHttpError(error.response);
      }
    };

    if (route.params?.ligneCmdClientId) {
      retrieveLigneCmdClient(route.params.ligneCmdClientId);
    }

    return {
      ...dateFormat,
      alertService,
      ligneCmdClient,

      previousState,
      t$: useI18n().t,
    };
  },
});
