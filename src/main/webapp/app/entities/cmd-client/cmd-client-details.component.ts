import { defineComponent, inject, ref, Ref } from 'vue';
import { useI18n } from 'vue-i18n';
import { useRoute, useRouter } from 'vue-router';

import { useDateFormat } from '@/shared/composables';
import { ICmdClient } from '@/shared/model/cmd-client.model';
import CmdClientService from './cmd-client.service';
import { useAlertService } from '@/shared/alert/alert.service';

export default defineComponent({
  compatConfig: { MODE: 3 },
  name: 'CmdClientDetails',
  setup() {
    const dateFormat = useDateFormat();
    const cmdClientService = inject('cmdClientService', () => new CmdClientService());
    const alertService = inject('alertService', () => useAlertService(), true);

    const route = useRoute();
    const router = useRouter();

    const previousState = () => router.go(-1);
    const cmdClient: Ref<ICmdClient> = ref({});

    const retrieveCmdClient = async cmdClientId => {
      try {
        const res = await cmdClientService().find(cmdClientId);
        cmdClient.value = res;
      } catch (error) {
        alertService.showHttpError(error.response);
      }
    };

    if (route.params?.cmdClientId) {
      retrieveCmdClient(route.params.cmdClientId);
    }

    return {
      ...dateFormat,
      alertService,
      cmdClient,

      previousState,
      t$: useI18n().t,
    };
  },
});
