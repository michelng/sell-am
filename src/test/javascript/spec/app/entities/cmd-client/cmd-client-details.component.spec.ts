/* tslint:disable max-line-length */
import { vitest } from 'vitest';
import { shallowMount, MountingOptions } from '@vue/test-utils';
import sinon, { SinonStubbedInstance } from 'sinon';
import { RouteLocation } from 'vue-router';

import CmdClientDetails from '../../../......mainwebappapp/entities/cmd-client/cmd-client-details.vue';
import CmdClientService from '../../../......mainwebappapp/entities/cmd-client/cmd-client.service';
import AlertService from '../../../......mainwebappapp/shared/alert/alert.service';

type CmdClientDetailsComponentType = InstanceType<typeof CmdClientDetails>;

let route: Partial<RouteLocation>;
const routerGoMock = vitest.fn();

vitest.mock('vue-router', () => ({
  useRoute: () => route,
  useRouter: () => ({ go: routerGoMock }),
}));

const cmdClientSample = { id: 123 };

describe('Component Tests', () => {
  let alertService: AlertService;

  afterEach(() => {
    vitest.resetAllMocks();
  });

  describe('CmdClient Management Detail Component', () => {
    let cmdClientServiceStub: SinonStubbedInstance<CmdClientService>;
    let mountOptions: MountingOptions<CmdClientDetailsComponentType>['global'];

    beforeEach(() => {
      route = {};
      cmdClientServiceStub = sinon.createStubInstance<CmdClientService>(CmdClientService);

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
          cmdClientService: () => cmdClientServiceStub,
        },
      };
    });

    describe('Navigate to details', () => {
      it('Should call load all on init', async () => {
        // GIVEN
        cmdClientServiceStub.find.resolves(cmdClientSample);
        route = {
          params: {
            cmdClientId: '' + 123,
          },
        };
        const wrapper = shallowMount(CmdClientDetails, { global: mountOptions });
        const comp = wrapper.vm;
        // WHEN
        await comp.$nextTick();

        // THEN
        expect(comp.cmdClient).toMatchObject(cmdClientSample);
      });
    });

    describe('Previous state', () => {
      it('Should go previous state', async () => {
        cmdClientServiceStub.find.resolves(cmdClientSample);
        const wrapper = shallowMount(CmdClientDetails, { global: mountOptions });
        const comp = wrapper.vm;
        await comp.$nextTick();

        comp.previousState();
        await comp.$nextTick();

        expect(routerGoMock).toHaveBeenCalledWith(-1);
      });
    });
  });
});
