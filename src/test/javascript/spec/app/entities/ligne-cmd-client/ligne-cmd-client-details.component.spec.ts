/* tslint:disable max-line-length */
import { vitest } from 'vitest';
import { shallowMount, MountingOptions } from '@vue/test-utils';
import sinon, { SinonStubbedInstance } from 'sinon';
import { RouteLocation } from 'vue-router';

import LigneCmdClientDetails from '../../../......mainwebappapp/entities/ligne-cmd-client/ligne-cmd-client-details.vue';
import LigneCmdClientService from '../../../......mainwebappapp/entities/ligne-cmd-client/ligne-cmd-client.service';
import AlertService from '../../../......mainwebappapp/shared/alert/alert.service';

type LigneCmdClientDetailsComponentType = InstanceType<typeof LigneCmdClientDetails>;

let route: Partial<RouteLocation>;
const routerGoMock = vitest.fn();

vitest.mock('vue-router', () => ({
  useRoute: () => route,
  useRouter: () => ({ go: routerGoMock }),
}));

const ligneCmdClientSample = { id: 123 };

describe('Component Tests', () => {
  let alertService: AlertService;

  afterEach(() => {
    vitest.resetAllMocks();
  });

  describe('LigneCmdClient Management Detail Component', () => {
    let ligneCmdClientServiceStub: SinonStubbedInstance<LigneCmdClientService>;
    let mountOptions: MountingOptions<LigneCmdClientDetailsComponentType>['global'];

    beforeEach(() => {
      route = {};
      ligneCmdClientServiceStub = sinon.createStubInstance<LigneCmdClientService>(LigneCmdClientService);

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
          ligneCmdClientService: () => ligneCmdClientServiceStub,
        },
      };
    });

    describe('Navigate to details', () => {
      it('Should call load all on init', async () => {
        // GIVEN
        ligneCmdClientServiceStub.find.resolves(ligneCmdClientSample);
        route = {
          params: {
            ligneCmdClientId: '' + 123,
          },
        };
        const wrapper = shallowMount(LigneCmdClientDetails, { global: mountOptions });
        const comp = wrapper.vm;
        // WHEN
        await comp.$nextTick();

        // THEN
        expect(comp.ligneCmdClient).toMatchObject(ligneCmdClientSample);
      });
    });

    describe('Previous state', () => {
      it('Should go previous state', async () => {
        ligneCmdClientServiceStub.find.resolves(ligneCmdClientSample);
        const wrapper = shallowMount(LigneCmdClientDetails, { global: mountOptions });
        const comp = wrapper.vm;
        await comp.$nextTick();

        comp.previousState();
        await comp.$nextTick();

        expect(routerGoMock).toHaveBeenCalledWith(-1);
      });
    });
  });
});
