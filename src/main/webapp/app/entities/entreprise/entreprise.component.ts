import { defineComponent, inject, onMounted, ref, Ref, watch, watchEffect } from 'vue';
import { useI18n } from 'vue-i18n';

import { IEntreprise } from '@/shared/model/entreprise.model';
import EntrepriseService from './entreprise.service';
import { useAlertService } from '@/shared/alert/alert.service';

export default defineComponent({
  compatConfig: { MODE: 3 },
  name: 'Entreprise',
  setup() {
    const { t: t$ } = useI18n();
    const entrepriseService = inject('entrepriseService', () => new EntrepriseService());
    const alertService = inject('alertService', () => useAlertService(), true);

    const entreprises: Ref<IEntreprise[]> = ref([]);

    const isFetching = ref(false);

    const clear = () => {};

    const retrieveEntreprises = async () => {
      isFetching.value = true;
      try {
        const res = await entrepriseService().retrieve();
        entreprises.value = res.data;
      } catch (err) {
        alertService.showHttpError(err.response);
      } finally {
        isFetching.value = false;
      }
    };

    const handleSyncList = () => {
      retrieveEntreprises();
    };

    onMounted(async () => {
      await retrieveEntreprises();
    });

    const removeId: Ref<number> = ref(null);
    const removeEntity = ref<any>(null);
    const prepareRemove = (instance: IEntreprise) => {
      removeId.value = instance.id;
      removeEntity.value.show();
    };
    const closeDialog = () => {
      removeEntity.value.hide();
    };
    const removeEntreprise = async () => {
      try {
        await entrepriseService().delete(removeId.value);
        const message = t$('sellAmApp.entreprise.deleted', { param: removeId.value }).toString();
        alertService.showInfo(message, { variant: 'danger' });
        removeId.value = null;
        retrieveEntreprises();
        closeDialog();
      } catch (error) {
        alertService.showHttpError(error.response);
      }
    };

    return {
      entreprises,
      handleSyncList,
      isFetching,
      retrieveEntreprises,
      clear,
      removeId,
      removeEntity,
      prepareRemove,
      closeDialog,
      removeEntreprise,
      t$,
    };
  },
});
