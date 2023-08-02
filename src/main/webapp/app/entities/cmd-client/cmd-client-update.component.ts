import { computed, defineComponent, inject, ref, Ref } from 'vue';
import { useI18n } from 'vue-i18n';
import { useRoute, useRouter } from 'vue-router';
import { useVuelidate } from '@vuelidate/core';

import { useValidation, useDateFormat } from '@/shared/composables';
import { useAlertService } from '@/shared/alert/alert.service';

import ClientService from '@/entities/client/client.service';
import { IClient } from '@/shared/model/client.model';
import { ICmdClient, CmdClient } from '@/shared/model/cmd-client.model';
import CmdClientService from './cmd-client.service';
import { StatutCmd } from '@/shared/model/enumerations/statut-cmd.model';

export default defineComponent({
  compatConfig: { MODE: 3 },
  name: 'CmdClientUpdate',
  setup() {
    const cmdClientService = inject('cmdClientService', () => new CmdClientService());
    const alertService = inject('alertService', () => useAlertService(), true);

    const cmdClient: Ref<ICmdClient> = ref(new CmdClient());
    const clientService = inject('clientService', () => new ClientService());
    const clients: Ref<IClient[]> = ref([]);
    const statutCmdValues: Ref<string[]> = ref(Object.keys(StatutCmd));
    const isSaving = ref(false);
    const currentLanguage = inject('currentLanguage', () => computed(() => navigator.language ?? 'fr'), true);

    const route = useRoute();
    const router = useRouter();

    const previousState = () => router.go(-1);

    const retrieveCmdClient = async cmdClientId => {
      try {
        const res = await cmdClientService().find(cmdClientId);
        res.dateCommande = new Date(res.dateCommande);
        res.dateLivraisonPrevue = new Date(res.dateLivraisonPrevue);
        cmdClient.value = res;
      } catch (error) {
        alertService.showHttpError(error.response);
      }
    };

    if (route.params?.cmdClientId) {
      retrieveCmdClient(route.params.cmdClientId);
    }

    const initRelationships = () => {
      clientService()
        .retrieve()
        .then(res => {
          clients.value = res.data;
        });
    };

    initRelationships();

    const { t: t$ } = useI18n();
    const validations = useValidation();
    const validationRules = {
      code: {},
      dateCommande: {},
      dateLivraisonPrevue: {},
      montantTotal: {},
      commentaire: {},
      statutCmd: {},
      client: {},
    };
    const v$ = useVuelidate(validationRules, cmdClient as any);
    v$.value.$validate();

    return {
      cmdClientService,
      alertService,
      cmdClient,
      previousState,
      statutCmdValues,
      isSaving,
      currentLanguage,
      clients,
      v$,
      ...useDateFormat({ entityRef: cmdClient }),
      t$,
    };
  },
  created(): void {},
  methods: {
    save(): void {
      this.isSaving = true;
      if (this.cmdClient.id) {
        this.cmdClientService()
          .update(this.cmdClient)
          .then(param => {
            this.isSaving = false;
            this.previousState();
            this.alertService.showInfo(this.t$('sellAmApp.cmdClient.updated', { param: param.id }));
          })
          .catch(error => {
            this.isSaving = false;
            this.alertService.showHttpError(error.response);
          });
      } else {
        this.cmdClientService()
          .create(this.cmdClient)
          .then(param => {
            this.isSaving = false;
            this.previousState();
            this.alertService.showSuccess(this.t$('sellAmApp.cmdClient.created', { param: param.id }).toString());
          })
          .catch(error => {
            this.isSaving = false;
            this.alertService.showHttpError(error.response);
          });
      }
    },
  },
});
