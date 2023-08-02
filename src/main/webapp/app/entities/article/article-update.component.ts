import { computed, defineComponent, inject, ref, Ref } from 'vue';
import { useI18n } from 'vue-i18n';
import { useRoute, useRouter } from 'vue-router';
import { useVuelidate } from '@vuelidate/core';

import { useValidation } from '@/shared/composables';
import { useAlertService } from '@/shared/alert/alert.service';

import MagasinService from '@/entities/magasin/magasin.service';
import { IMagasin } from '@/shared/model/magasin.model';
import CategorieService from '@/entities/categorie/categorie.service';
import { ICategorie } from '@/shared/model/categorie.model';
import { IArticle, Article } from '@/shared/model/article.model';
import ArticleService from './article.service';

export default defineComponent({
  compatConfig: { MODE: 3 },
  name: 'ArticleUpdate',
  setup() {
    const articleService = inject('articleService', () => new ArticleService());
    const alertService = inject('alertService', () => useAlertService(), true);

    const article: Ref<IArticle> = ref(new Article());
    const magasinService = inject('magasinService', () => new MagasinService());
    const magasins: Ref<IMagasin[]> = ref([]);
    const categorieService = inject('categorieService', () => new CategorieService());
    const categories: Ref<ICategorie[]> = ref([]);
    const isSaving = ref(false);
    const currentLanguage = inject('currentLanguage', () => computed(() => navigator.language ?? 'fr'), true);

    const route = useRoute();
    const router = useRouter();

    const previousState = () => router.go(-1);

    const retrieveArticle = async articleId => {
      try {
        const res = await articleService().find(articleId);
        article.value = res;
      } catch (error) {
        alertService.showHttpError(error.response);
      }
    };

    if (route.params?.articleId) {
      retrieveArticle(route.params.articleId);
    }

    const initRelationships = () => {
      magasinService()
        .retrieve()
        .then(res => {
          magasins.value = res.data;
        });
      categorieService()
        .retrieve()
        .then(res => {
          categories.value = res.data;
        });
    };

    initRelationships();

    const { t: t$ } = useI18n();
    const validations = useValidation();
    const validationRules = {
      code: {},
      designation: {},
      prixUnitaireHt: {},
      tauxTva: {},
      prixUnitaireTtc: {},
      photo: {},
      quantiteEnStock: {},
      seuilDeReapprovisionnement: {},
      magasin: {},
      categorie: {},
    };
    const v$ = useVuelidate(validationRules, article as any);
    v$.value.$validate();

    return {
      articleService,
      alertService,
      article,
      previousState,
      isSaving,
      currentLanguage,
      magasins,
      categories,
      v$,
      t$,
    };
  },
  created(): void {},
  methods: {
    save(): void {
      this.isSaving = true;
      if (this.article.id) {
        this.articleService()
          .update(this.article)
          .then(param => {
            this.isSaving = false;
            this.previousState();
            this.alertService.showInfo(this.t$('sellAmApp.article.updated', { param: param.id }));
          })
          .catch(error => {
            this.isSaving = false;
            this.alertService.showHttpError(error.response);
          });
      } else {
        this.articleService()
          .create(this.article)
          .then(param => {
            this.isSaving = false;
            this.previousState();
            this.alertService.showSuccess(this.t$('sellAmApp.article.created', { param: param.id }).toString());
          })
          .catch(error => {
            this.isSaving = false;
            this.alertService.showHttpError(error.response);
          });
      }
    },
  },
});
