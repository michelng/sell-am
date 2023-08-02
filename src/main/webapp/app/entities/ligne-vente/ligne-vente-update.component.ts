import { computed, defineComponent, inject, ref, Ref } from 'vue';
import { useI18n } from 'vue-i18n';
import { useRoute, useRouter } from 'vue-router';
import { useVuelidate } from '@vuelidate/core';

import { useValidation } from '@/shared/composables';
import { useAlertService } from '@/shared/alert/alert.service';

import VenteService from '@/entities/vente/vente.service';
import { IVente } from '@/shared/model/vente.model';
import ArticleService from '@/entities/article/article.service';
import { IArticle } from '@/shared/model/article.model';
import { ILigneVente, LigneVente } from '@/shared/model/ligne-vente.model';
import LigneVenteService from './ligne-vente.service';
import { StatutVente } from '@/shared/model/enumerations/statut-vente.model';

export default defineComponent({
  compatConfig: { MODE: 3 },
  name: 'LigneVenteUpdate',
  setup() {
    const ligneVenteService = inject('ligneVenteService', () => new LigneVenteService());
    const alertService = inject('alertService', () => useAlertService(), true);

    const ligneVente: Ref<ILigneVente> = ref(new LigneVente());
    const venteService = inject('venteService', () => new VenteService());
    const ventes: Ref<IVente[]> = ref([]);
    const articleService = inject('articleService', () => new ArticleService());
    const articles: Ref<IArticle[]> = ref([]);
    const statutVenteValues: Ref<string[]> = ref(Object.keys(StatutVente));
    const isSaving = ref(false);
    const currentLanguage = inject('currentLanguage', () => computed(() => navigator.language ?? 'fr'), true);

    const route = useRoute();
    const router = useRouter();

    const previousState = () => router.go(-1);

    const retrieveLigneVente = async ligneVenteId => {
      try {
        const res = await ligneVenteService().find(ligneVenteId);
        ligneVente.value = res;
      } catch (error) {
        alertService.showHttpError(error.response);
      }
    };

    if (route.params?.ligneVenteId) {
      retrieveLigneVente(route.params.ligneVenteId);
    }

    const initRelationships = () => {
      venteService()
        .retrieve()
        .then(res => {
          ventes.value = res.data;
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
      montantRemise: {},
      montantTotal: {},
      taxe: {},
      commentaire: {},
      statutVente: {},
      vente: {},
      article: {},
    };
    const v$ = useVuelidate(validationRules, ligneVente as any);
    v$.value.$validate();

    return {
      ligneVenteService,
      alertService,
      ligneVente,
      previousState,
      statutVenteValues,
      isSaving,
      currentLanguage,
      ventes,
      articles,
      v$,
      t$,
    };
  },
  created(): void {},
  methods: {
    save(): void {
      this.isSaving = true;
      if (this.ligneVente.id) {
        this.ligneVenteService()
          .update(this.ligneVente)
          .then(param => {
            this.isSaving = false;
            this.previousState();
            this.alertService.showInfo(this.t$('sellAmApp.ligneVente.updated', { param: param.id }));
          })
          .catch(error => {
            this.isSaving = false;
            this.alertService.showHttpError(error.response);
          });
      } else {
        this.ligneVenteService()
          .create(this.ligneVente)
          .then(param => {
            this.isSaving = false;
            this.previousState();
            this.alertService.showSuccess(this.t$('sellAmApp.ligneVente.created', { param: param.id }).toString());
          })
          .catch(error => {
            this.isSaving = false;
            this.alertService.showHttpError(error.response);
          });
      }
    },
  },
});
