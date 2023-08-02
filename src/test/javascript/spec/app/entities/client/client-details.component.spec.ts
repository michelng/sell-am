/* tslint:disable max-line-length */
import { vitest } from 'vitest';
import { shallowMount, MountingOptions } from '@vue/test-utils';
import sinon, { SinonStubbedInstance } from 'sinon';
import { RouteLocation } from 'vue-router';

import ClientDetails from '../../../......mainwebappapp/entities/client/client-details.vue';
import ClientService from '../../../......mainwebappapp/entities/client/client.service';
import AlertService from '../../../......mainwebappapp/shared/alert/alert.service';

type ClientDetailsComponentType = InstanceType<typeof ClientDetails>;

let route: Partial<RouteLocation>;
const routerGoMock = vitest.fn();

vitest.mock('vue-router', () => ({
  useRoute: () => route,
  useRouter: () => ({ go: routerGoMock }),
}));

const clientSample = { id: 123 };

describe('Component Tests', () => {
  let alertService: AlertService;

  afterEach(() => {
    vitest.resetAllMocks();
  });

  describe('Client Management Detail Component', () => {
    let clientServiceStub: SinonStubbedInstance<ClientService>;
    let mountOptions: MountingOptions<ClientDetailsComponentType>['global'];

    beforeEach(() => {
      route = {};
      clientServiceStub = sinon.createStubInstance<ClientService>(ClientService);

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
          clientService: () => clientServiceStub,
        },
      };
    });

    describe('Navigate to details', () => {
      it('Should call load all on init', async () => {
        // GIVEN
        clientServiceStub.find.resolves(clientSample);
        route = {
          params: {
            clientId: '' + 123,
          },
        };
        const wrapper = shallowMount(ClientDetails, { global: mountOptions });
        const comp = wrapper.vm;
        // WHEN
        await comp.$nextTick();

        // THEN
        expect(comp.client).toMatchObject(clientSample);
      });
    });

    describe('Previous state', () => {
      it('Should go previous state', async () => {
        clientServiceStub.find.resolves(clientSample);
        const wrapper = shallowMount(ClientDetails, { global: mountOptions });
        const comp = wrapper.vm;
        await comp.$nextTick();

        comp.previousState();
        await comp.$nextTick();

        expect(routerGoMock).toHaveBeenCalledWith(-1);
      });
    });
  });
});
