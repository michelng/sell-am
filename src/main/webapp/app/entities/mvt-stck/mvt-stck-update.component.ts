import { computed, defineComponent, inject, ref, Ref } from 'vue';
import { useI18n } from 'vue-i18n';
import { useRoute, useRouter } from 'vue-router';
import { useVuelidate } from '@vuelidate/core';

import { useValidation, useDateFormat } from '@/shared/composables';
import { useAlertService } from '@/shared/alert/alert.service';

import ArticleService from '@/entities/article/article.service';
import { IArticle } from '@/shared/model/article.model';
import { IMvtStck, MvtStck } from '@/shared/model/mvt-stck.model';
import MvtStckService from './mvt-stck.service';
import { TypeMvt } from '@/shared/model/enumerations/type-mvt.model';

export default defineComponent({
  compatConfig: { MODE: 3 },
  name: 'MvtStckUpdate',
  setup() {
    const mvtStckService = inject('mvtStckService', () => new MvtStckService());
    const alertService = inject('alertService', () => useAlertService(), true);

    const mvtStck: Ref<IMvtStck> = ref(new MvtStck());
    const articleService = inject('articleService', () => new ArticleService());
    const articles: Ref<IArticle[]> = ref([]);
    const typeMvtValues: Ref<string[]> = ref(Object.keys(TypeMvt));
    const isSaving = ref(false);
    const currentLanguage = inject('currentLanguage', () => computed(() => navigator.language ?? 'fr'), true);

    const route = useRoute();
    const router = useRouter();

    const previousState = () => router.go(-1);

    const retrieveMvtStck = async mvtStckId => {
      try {
        const res = await mvtStckService().find(mvtStckId);
        res.dateMvnt = new Date(res.dateMvnt);
        mvtStck.value = res;
      } catch (error) {
        alertService.showHttpError(error.response);
      }
    };

    if (route.params?.mvtStckId) {
      retrieveMvtStck(route.params.mvtStckId);
    }

    const initRelationships = () => {
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
      dateMvnt: {},
      quantite: {},
      typeMvt: {},
      article: {},
    };
    const v$ = useVuelidate(validationRules, mvtStck as any);
    v$.value.$validate();

    return {
      mvtStckService,
      alertService,
      mvtStck,
      previousState,
      typeMvtValues,
      isSaving,
      currentLanguage,
      articles,
      v$,
      ...useDateFormat({ entityRef: mvtStck }),
      t$,
    };
  },
  created(): void {},
  methods: {
    save(): void {
      this.isSaving = true;
      if (this.mvtStck.id) {
        this.mvtStckService()
          .update(this.mvtStck)
          .then(param => {
            this.isSaving = false;
            this.previousState();
            this.alertService.showInfo(this.t$('sellAmApp.mvtStck.updated', { param: param.id }));
          })
          .catch(error => {
            this.isSaving = false;
            this.alertService.showHttpError(error.response);
          });
      } else {
        this.mvtStckService()
          .create(this.mvtStck)
          .then(param => {
            this.isSaving = false;
            this.previousState();
            this.alertService.showSuccess(this.t$('sellAmApp.mvtStck.created', { param: param.id }).toString());
          })
          .catch(error => {
            this.isSaving = false;
            this.alertService.showHttpError(error.response);
          });
      }
    },
  },
});
