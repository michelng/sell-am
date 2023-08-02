import { defineComponent, inject, onMounted, ref, Ref, watch, watchEffect } from 'vue';
import { useI18n } from 'vue-i18n';

import { ICategorie } from '@/shared/model/categorie.model';
import CategorieService from './categorie.service';
import { useAlertService } from '@/shared/alert/alert.service';

export default defineComponent({
  compatConfig: { MODE: 3 },
  name: 'Categorie',
  setup() {
    const { t: t$ } = useI18n();
    const categorieService = inject('categorieService', () => new CategorieService());
    const alertService = inject('alertService', () => useAlertService(), true);

    const categories: Ref<ICategorie[]> = ref([]);

    const isFetching = ref(false);

    const clear = () => {};

    const retrieveCategories = async () => {
      isFetching.value = true;
      try {
        const res = await categorieService().retrieve();
        categories.value = res.data;
      } catch (err) {
        alertService.showHttpError(err.response);
      } finally {
        isFetching.value = false;
      }
    };

    const handleSyncList = () => {
      retrieveCategories();
    };

    onMounted(async () => {
      await retrieveCategories();
    });

    const removeId: Ref<number> = ref(null);
    const removeEntity = ref<any>(null);
    const prepareRemove = (instance: ICategorie) => {
      removeId.value = instance.id;
      removeEntity.value.show();
    };
    const closeDialog = () => {
      removeEntity.value.hide();
    };
    const removeCategorie = async () => {
      try {
        await categorieService().delete(removeId.value);
        const message = t$('sellAmApp.categorie.deleted', { param: removeId.value }).toString();
        alertService.showInfo(message, { variant: 'danger' });
        removeId.value = null;
        retrieveCategories();
        closeDialog();
      } catch (error) {
        alertService.showHttpError(error.response);
      }
    };

    return {
      categories,
      handleSyncList,
      isFetching,
      retrieveCategories,
      clear,
      removeId,
      removeEntity,
      prepareRemove,
      closeDialog,
      removeCategorie,
      t$,
    };
  },
});
