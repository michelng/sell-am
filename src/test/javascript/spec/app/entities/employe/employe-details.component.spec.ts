/* tslint:disable max-line-length */
import { vitest } from 'vitest';
import { shallowMount, MountingOptions } from '@vue/test-utils';
import sinon, { SinonStubbedInstance } from 'sinon';
import { RouteLocation } from 'vue-router';

import EmployeDetails from '../../../......mainwebappapp/entities/employe/employe-details.vue';
import EmployeService from '../../../......mainwebappapp/entities/employe/employe.service';
import AlertService from '../../../......mainwebappapp/shared/alert/alert.service';

type EmployeDetailsComponentType = InstanceType<typeof EmployeDetails>;

let route: Partial<RouteLocation>;
const routerGoMock = vitest.fn();

vitest.mock('vue-router', () => ({
  useRoute: () => route,
  useRouter: () => ({ go: routerGoMock }),
}));

const employeSample = { id: 123 };

describe('Component Tests', () => {
  let alertService: AlertService;

  afterEach(() => {
    vitest.resetAllMocks();
  });

  describe('Employe Management Detail Component', () => {
    let employeServiceStub: SinonStubbedInstance<EmployeService>;
    let mountOptions: MountingOptions<EmployeDetailsComponentType>['global'];

    beforeEach(() => {
      route = {};
      employeServiceStub = sinon.createStubInstance<EmployeService>(EmployeService);

      alertService = new AlertService({
        i18n: { t: vitest.fn() } as any,
        bvToast: {
          toast: vitest.fn(),
        } as any,
      });

      mountOptions = {
        stubs: {
          'font-awesome-icon': true,
          'router-link': true,
        },
        provide: {
          alertService,
          employeService: () => employeServiceStub,
        },
      };
    });

    describe('Navigate to details', () => {
      it('Should call load all on init', async () => {
        // GIVEN
        employeServiceStub.find.resolves(employeSample);
        route = {
          params: {
            employeId: '' + 123,
          },
        };
        const wrapper = shallowMount(EmployeDetails, { global: mountOptions });
        const comp = wrapper.vm;
        // WHEN
        await comp.$nextTick();

        // THEN
        expect(comp.employe).toMatchObject(employeSample);
      });
    });

    describe('Previous state', () => {
      it('Should go previous state', async () => {
        employeServiceStub.find.resolves(employeSample);
        const wrapper = shallowMount(EmployeDetails, { global: mountOptions });
        const comp = wrapper.vm;
        await comp.$nextTick();

        comp.previousState();
        await comp.$nextTick();

        expect(routerGoMock).toHaveBeenCalledWith(-1);
      });
    });
  });
});
