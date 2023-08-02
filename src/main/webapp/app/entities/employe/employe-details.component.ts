import { defineComponent, inject, ref, Ref } from 'vue';
import { useI18n } from 'vue-i18n';
import { useRoute, useRouter } from 'vue-router';

import { useDateFormat } from '@/shared/composables';
import { IEmploye } from '@/shared/model/employe.model';
import EmployeService from './employe.service';
import { useAlertService } from '@/shared/alert/alert.service';

export default defineComponent({
  compatConfig: { MODE: 3 },
  name: 'EmployeDetails',
  setup() {
    const dateFormat = useDateFormat();
    const employeService = inject('employeService', () => new EmployeService());
    const alertService = inject('alertService', () => useAlertService(), true);

    const route = useRoute();
    const router = useRouter();

    const previousState = () => router.go(-1);
    const employe: Ref<IEmploye> = ref({});

    const retrieveEmploye = async employeId => {
      try {
        const res = await employeService().find(employeId);
        employe.value = res;
      } catch (error) {
        alertService.showHttpError(error.response);
      }
    };

    if (route.params?.employeId) {
      retrieveEmploye(route.params.employeId);
    }

    return {
      ...dateFormat,
      alertService,
      employe,

      previousState,
      t$: useI18n().t,
    };
  },
});
