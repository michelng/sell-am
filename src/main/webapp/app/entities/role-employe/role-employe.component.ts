import { defineComponent, inject, onMounted, ref, Ref, watch, watchEffect } from 'vue';
import { useI18n } from 'vue-i18n';

import { IRoleEmploye } from '@/shared/model/role-employe.model';
import RoleEmployeService from './role-employe.service';
import { useAlertService } from '@/shared/alert/alert.service';

export default defineComponent({
  compatConfig: { MODE: 3 },
  name: 'RoleEmploye',
  setup() {
    const { t: t$ } = useI18n();
    const roleEmployeService = inject('roleEmployeService', () => new RoleEmployeService());
    const alertService = inject('alertService', () => useAlertService(), true);

    const roleEmployes: Ref<IRoleEmploye[]> = ref([]);

    const isFetching = ref(false);

    const clear = () => {};

    const retrieveRoleEmployes = async () => {
      isFetching.value = true;
      try {
        const res = await roleEmployeService().retrieve();
        roleEmployes.value = res.data;
      } catch (err) {
        alertService.showHttpError(err.response);
      } finally {
        isFetching.value = false;
      }
    };

    const handleSyncList = () => {
      retrieveRoleEmployes();
    };

    onMounted(async () => {
      await retrieveRoleEmployes();
    });

    const removeId: Ref<number> = ref(null);
    const removeEntity = ref<any>(null);
    const prepareRemove = (instance: IRoleEmploye) => {
      removeId.value = instance.id;
      removeEntity.value.show();
    };
    const closeDialog = () => {
      removeEntity.value.hide();
    };
    const removeRoleEmploye = async () => {
      try {
        await roleEmployeService().delete(removeId.value);
        const message = t$('sellAmApp.roleEmploye.deleted', { param: removeId.value }).toString();
        alertService.showInfo(message, { variant: 'danger' });
        removeId.value = null;
        retrieveRoleEmployes();
        closeDialog();
      } catch (error) {
        alertService.showHttpError(error.response);
      }
    };

    return {
      roleEmployes,
      handleSyncList,
      isFetching,
      retrieveRoleEmployes,
      clear,
      removeId,
      removeEntity,
      prepareRemove,
      closeDialog,
      removeRoleEmploye,
      t$,
    };
  },
});
