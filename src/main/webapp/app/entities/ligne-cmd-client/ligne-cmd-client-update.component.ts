import { computed, defineComponent, inject, ref, Ref } from 'vue';
import { useI18n } from 'vue-i18n';
import { useRoute, useRouter } from 'vue-router';
import { useVuelidate } from '@vuelidate/core';

import { useValidation, useDateFormat } from '@/shared/composables';
import { useAlertService } from '@/shared/alert/alert.service';

import CmdClientService from '@/entities/cmd-client/cmd-client.service';
import { ICmdClient } from '@/shared/model/cmd-client.model';
import ArticleService from '@/entities/article/article.service';
import { IArticle } from '@/shared/model/article.model';
import { ILigneCmdClient, LigneCmdClient } from '@/shared/model/ligne-cmd-client.model';
import LigneCmdClientService from './ligne-cmd-client.service';
import { StatutCmd } from '@/shared/model/enumerations/statut-cmd.model';

export default defineComponent({
  compatConfig: { MODE: 3 },
  name: 'LigneCmdClientUpdate',
  setup() {
    const ligneCmdClientService = inject('ligneCmdClientService', () => new LigneCmdClientService());
    const alertService = inject('alertService', () => useAlertService(), true);

    const ligneCmdClient: Ref<ILigneCmdClient> = ref(new LigneCmdClient());
    const cmdClientService = inject('cmdClientService', () => new CmdClientService());
    const cmdClients: Ref<ICmdClient[]> = ref([]);
    const articleService = inject('articleService', () => new ArticleService());
    const articles: Ref<IArticle[]> = ref([]);
    const statutCmdValues: Ref<string[]> = ref(Object.keys(StatutCmd));
    const isSaving = ref(false);
    const currentLanguage = inject('currentLanguage', () => computed(() => navigator.language ?? 'fr'), true);

    const route = useRoute();
    const router = useRouter();

    const previousState = () => router.go(-1);

    const retrieveLigneCmdClient = async ligneCmdClientId => {
      try {
        const res = await ligneCmdClientService().find(ligneCmdClientId);
        res.dateLivraisonPrevue = new Date(res.dateLivraisonPrevue);
        ligneCmdClient.value = res;
      } catch (error) {
        alertService.showHttpError(error.response);
      }
    };

    if (route.params?.ligneCmdClientId) {
      retrieveLigneCmdClient(route.params.ligneCmdClientId);
    }

    const initRelationships = () => {
      cmdClientService()
        .retrieve()
        .then(res => {
          cmdClients.value = res.data;
        });
      articleService()
        .retrieve()
        .then(res => {
          articles.value = res.data;
        });
    };

    initRelationships();

    const { t: t$ } = useI18n();
    const validations = useValidation();
    const validationRules = {
      quantite: {},
      prixUnitaire: {},
      dateLivraisonPrevue: {},
      montantTotal: {},
      commentaire: {},
      statutCmd: {},
      cmdClient: {},
      article: {},
    };
    const v$ = useVuelidate(validationRules, ligneCmdClient as any);
    v$.value.$validate();

    return {
      ligneCmdClientService,
      alertService,
      ligneCmdClient,
      previousState,
      statutCmdValues,
      isSaving,
      currentLanguage,
      cmdClients,
      articles,
      v$,
      ...useDateFormat({ entityRef: ligneCmdClient }),
      t$,
    };
  },
  created(): void {},
  methods: {
    save(): void {
      this.isSaving = true;
      if (this.ligneCmdClient.id) {
        this.ligneCmdClientService()
          .update(this.ligneCmdClient)
          .then(param => {
            this.isSaving = false;
            this.previousState();
            this.alertService.showInfo(this.t$('sellAmApp.ligneCmdClient.updated', { param: param.id }));
          })
          .catch(error => {
            this.isSaving = false;
            this.alertService.showHttpError(error.response);
          });
      } else {
        this.ligneCmdClientService()
          .create(this.ligneCmdClient)
          .then(param => {
            this.isSaving = false;
            this.previousState();
            this.alertService.showSuccess(this.t$('sellAmApp.ligneCmdClient.created', { param: param.id }).toString());
          })
          .catch(error => {
            this.isSaving = false;
            this.alertService.showHttpError(error.response);
          });
      }
    },
  },
});
