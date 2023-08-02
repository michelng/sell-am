/* tslint:disable max-line-length */
import { vitest } from 'vitest';
import { shallowMount, MountingOptions } from '@vue/test-utils';
import sinon, { SinonStubbedInstance } from 'sinon';
import { RouteLocation } from 'vue-router';

import RoleEmployeDetails from '../../../......mainwebappapp/entities/role-employe/role-employe-details.vue';
import RoleEmployeService from '../../../......mainwebappapp/entities/role-employe/role-employe.service';
import AlertService from '../../../......mainwebappapp/shared/alert/alert.service';

type RoleEmployeDetailsComponentType = InstanceType<typeof RoleEmployeDetails>;

let route: Partial<RouteLocation>;
const routerGoMock = vitest.fn();

vitest.mock('vue-router', () => ({
  useRoute: () => route,
  useRouter: () => ({ go: routerGoMock }),
}));

const roleEmployeSample = { id: 123 };

describe('Component Tests', () => {
  let alertService: AlertService;

  afterEach(() => {
    vitest.resetAllMocks();
  });

  describe('RoleEmploye Management Detail Component', () => {
    let roleEmployeServiceStub: SinonStubbedInstance<RoleEmployeService>;
    let mountOptions: MountingOptions<RoleEmployeDetailsComponentType>['global'];

    beforeEach(() => {
      route = {};
      roleEmployeServiceStub = sinon.createStubInstance<RoleEmployeService>(RoleEmployeService);

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
          roleEmployeService: () => roleEmployeServiceStub,
        },
      };
    });

    describe('Navigate to details', () => {
      it('Should call load all on init', async () => {
        // GIVEN
        roleEmployeServiceStub.find.resolves(roleEmployeSample);
        route = {
          params: {
            roleEmployeId: '' + 123,
          },
        };
        const wrapper = shallowMount(RoleEmployeDetails, { global: mountOptions });
        const comp = wrapper.vm;
        // WHEN
        await comp.$nextTick();

        // THEN
        expect(comp.roleEmploye).toMatchObject(roleEmployeSample);
      });
    });

    describe('Previous state', () => {
      it('Should go previous state', async () => {
        roleEmployeServiceStub.find.resolves(roleEmployeSample);
        const wrapper = shallowMount(RoleEmployeDetails, { global: mountOptions });
        const comp = wrapper.vm;
        await comp.$nextTick();

        comp.previousState();
        await comp.$nextTick();

        expect(routerGoMock).toHaveBeenCalledWith(-1);
      });
    });
  });
});
