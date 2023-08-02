import { computed, defineComponent, inject, ref, Ref } from 'vue';
import { useI18n } from 'vue-i18n';
import { useRoute, useRouter } from 'vue-router';
import { useVuelidate } from '@vuelidate/core';

import { useValidation, useDateFormat } from '@/shared/composables';
import { useAlertService } from '@/shared/alert/alert.service';

import CmdFournisseurService from '@/entities/cmd-fournisseur/cmd-fournisseur.service';
import { ICmdFournisseur } from '@/shared/model/cmd-fournisseur.model';
import ArticleService from '@/entities/article/article.service';
import { IArticle } from '@/shared/model/article.model';
import { ILigneCmdFournisseur, LigneCmdFournisseur } from '@/shared/model/ligne-cmd-fournisseur.model';
import LigneCmdFournisseurService from './ligne-cmd-fournisseur.service';
import { StatutCmd } from '@/shared/model/enumerations/statut-cmd.model';

export default defineComponent({
  compatConfig: { MODE: 3 },
  name: 'LigneCmdFournisseurUpdate',
  setup() {
    const ligneCmdFournisseurService = inject('ligneCmdFournisseurService', () => new LigneCmdFournisseurService());
    const alertService = inject('alertService', () => useAlertService(), true);

    const ligneCmdFournisseur: Ref<ILigneCmdFournisseur> = ref(new LigneCmdFournisseur());
    const cmdFournisseurService = inject('cmdFournisseurService', () => new CmdFournisseurService());
    const cmdFournisseurs: Ref<ICmdFournisseur[]> = ref([]);
    const articleService = inject('articleService', () => new ArticleService());
    const articles: Ref<IArticle[]> = ref([]);
    const statutCmdValues: Ref<string[]> = ref(Object.keys(StatutCmd));
    const isSaving = ref(false);
    const currentLanguage = inject('currentLanguage', () => computed(() => navigator.language ?? 'fr'), true);

    const route = useRoute();
    const router = useRouter();

    const previousState = () => router.go(-1);

    const retrieveLigneCmdFournisseur = async ligneCmdFournisseurId => {
      try {
        const res = await ligneCmdFournisseurService().find(ligneCmdFournisseurId);
        res.dateLivraisonPrevu = new Date(res.dateLivraisonPrevu);
        ligneCmdFournisseur.value = res;
      } catch (error) {
        alertService.showHttpError(error.response);
      }
    };

    if (route.params?.ligneCmdFournisseurId) {
      retrieveLigneCmdFournisseur(route.params.ligneCmdFournisseurId);
    }

    const initRelationships = () => {
      cmdFournisseurService()
        .retrieve()
        .then(res => {
          cmdFournisseurs.value = res.data;
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
      dateLivraisonPrevu: {},
      montantTotal: {},
      commentaire: {},
      statutCmd: {},
      cmdFournisseur: {},
      article: {},
    };
    const v$ = useVuelidate(validationRules, ligneCmdFournisseur as any);
    v$.value.$validate();

    return {
      ligneCmdFournisseurService,
      alertService,
      ligneCmdFournisseur,
      previousState,
      statutCmdValues,
      isSaving,
      currentLanguage,
      cmdFournisseurs,
      articles,
      v$,
      ...useDateFormat({ entityRef: ligneCmdFournisseur }),
      t$,
    };
  },
  created(): void {},
  methods: {
    save(): void {
      this.isSaving = true;
      if (this.ligneCmdFournisseur.id) {
        this.ligneCmdFournisseurService()
          .update(this.ligneCmdFournisseur)
          .then(param => {
            this.isSaving = false;
            this.previousState();
            this.alertService.showInfo(this.t$('sellAmApp.ligneCmdFournisseur.updated', { param: param.id }));
          })
          .catch(error => {
            this.isSaving = false;
            this.alertService.showHttpError(error.response);
          });
      } else {
        this.ligneCmdFournisseurService()
          .create(this.ligneCmdFournisseur)
          .then(param => {
            this.isSaving = false;
            this.previousState();
            this.alertService.showSuccess(this.t$('sellAmApp.ligneCmdFournisseur.created', { param: param.id }).toString());
          })
          .catch(error => {
            this.isSaving = false;
            this.alertService.showHttpError(error.response);
          });
      }
    },
  },
});
