import { defineComponent, inject, onMounted, ref, Ref, watch, watchEffect } from 'vue';
import { useI18n } from 'vue-i18n';

import { IArticle } from '@/shared/model/article.model';
import ArticleService from './article.service';
import { useAlertService } from '@/shared/alert/alert.service';

export default defineComponent({
  compatConfig: { MODE: 3 },
  name: 'Article',
  setup() {
    const { t: t$ } = useI18n();
    const articleService = inject('articleService', () => new ArticleService());
    const alertService = inject('alertService', () => useAlertService(), true);

    const articles: Ref<IArticle[]> = ref([]);

    const isFetching = ref(false);

    const clear = () => {};

    const retrieveArticles = async () => {
      isFetching.value = true;
      try {
        const res = await articleService().retrieve();
        articles.value = res.data;
      } catch (err) {
        alertService.showHttpError(err.response);
      } finally {
        isFetching.value = false;
      }
    };

    const handleSyncList = () => {
      retrieveArticles();
    };

    onMounted(async () => {
      await retrieveArticles();
    });

    const removeId: Ref<number> = ref(null);
    const removeEntity = ref<any>(null);
    const prepareRemove = (instance: IArticle) => {
      removeId.value = instance.id;
      removeEntity.value.show();
    };
    const closeDialog = () => {
      removeEntity.value.hide();
    };
    const removeArticle = async () => {
      try {
        await articleService().delete(removeId.value);
        const message = t$('sellAmApp.article.deleted', { param: removeId.value }).toString();
        alertService.showInfo(message, { variant: 'danger' });
        removeId.value = null;
        retrieveArticles();
        closeDialog();
      } catch (error) {
        alertService.showHttpError(error.response);
      }
    };

    return {
      articles,
      handleSyncList,
      isFetching,
      retrieveArticles,
      clear,
      removeId,
      removeEntity,
      prepareRemove,
      closeDialog,
      removeArticle,
      t$,
    };
  },
});
