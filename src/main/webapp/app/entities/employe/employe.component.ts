import { defineComponent, inject, onMounted, ref, Ref, watch, watchEffect } from 'vue';
import { useI18n } from 'vue-i18n';

import { IEmploye } from '@/shared/model/employe.model';
import { useDateFormat } from '@/shared/composables';
import EmployeService from './employe.service';
import { useAlertService } from '@/shared/alert/alert.service';

export default defineComponent({
  compatConfig: { MODE: 3 },
  name: 'Employe',
  setup() {
    const { t: t$ } = useI18n();
    const dateFormat = useDateFormat();
    const employeService = inject('employeService', () => new EmployeService());
    const alertService = inject('alertService', () => useAlertService(), true);

    const employes: Ref<IEmploye[]> = ref([]);

    const isFetching = ref(false);

    const clear = () => {};

    const retrieveEmployes = async () => {
      isFetching.value = true;
      try {
        const res = await employeService().retrieve();
        employes.value = res.data;
      } catch (err) {
        alertService.showHttpError(err.response);
      } finally {
        isFetching.value = false;
      }
    };

    const handleSyncList = () => {
      retrieveEmployes();
    };

    onMounted(async () => {
      await retrieveEmployes();
    });

    const removeId: Ref<number> = ref(null);
    const removeEntity = ref<any>(null);
    const prepareRemove = (instance: IEmploye) => {
      removeId.value = instance.id;
      removeEntity.value.show();
    };
    const closeDialog = () => {
      removeEntity.value.hide();
    };
    const removeEmploye = async () => {
      try {
        await employeService().delete(removeId.value);
        const message = t$('sellAmApp.employe.deleted', { param: removeId.value }).toString();
        alertService.showInfo(message, { variant: 'danger' });
        removeId.value = null;
        retrieveEmployes();
        closeDialog();
      } catch (error) {
        alertService.showHttpError(error.response);
      }
    };

    return {
      employes,
      handleSyncList,
      isFetching,
      retrieveEmployes,
      clear,
      ...dateFormat,
      removeId,
      removeEntity,
      prepareRemove,
      closeDialog,
      removeEmploye,
      t$,
    };
  },
});
