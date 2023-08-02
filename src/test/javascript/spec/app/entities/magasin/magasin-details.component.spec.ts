/* tslint:disable max-line-length */
import { vitest } from 'vitest';
import { shallowMount, MountingOptions } from '@vue/test-utils';
import sinon, { SinonStubbedInstance } from 'sinon';
import { RouteLocation } from 'vue-router';

import MagasinDetails from '../../../......mainwebappapp/entities/magasin/magasin-details.vue';
import MagasinService from '../../../......mainwebappapp/entities/magasin/magasin.service';
import AlertService from '../../../......mainwebappapp/shared/alert/alert.service';

type MagasinDetailsComponentType = InstanceType<typeof MagasinDetails>;

let route: Partial<RouteLocation>;
const routerGoMock = vitest.fn();

vitest.mock('vue-router', () => ({
  useRoute: () => route,
  useRouter: () => ({ go: routerGoMock }),
}));

const magasinSample = { id: 123 };

describe('Component Tests', () => {
  let alertService: AlertService;

  afterEach(() => {
    vitest.resetAllMocks();
  });

  describe('Magasin Management Detail Component', () => {
    let magasinServiceStub: SinonStubbedInstance<MagasinService>;
    let mountOptions: MountingOptions<MagasinDetailsComponentType>['global'];

    beforeEach(() => {
      route = {};
      magasinServiceStub = sinon.createStubInstance<MagasinService>(MagasinService);

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
          magasinService: () => magasinServiceStub,
        },
      };
    });

    describe('Navigate to details', () => {
      it('Should call load all on init', async () => {
        // GIVEN
        magasinServiceStub.find.resolves(magasinSample);
        route = {
          params: {
            magasinId: '' + 123,
          },
        };
        const wrapper = shallowMount(MagasinDetails, { global: mountOptions });
        const comp = wrapper.vm;
        // WHEN
        await comp.$nextTick();

        // THEN
        expect(comp.magasin).toMatchObject(magasinSample);
      });
    });

    describe('Previous state', () => {
      it('Should go previous state', async () => {
        magasinServiceStub.find.resolves(magasinSample);
        const wrapper = shallowMount(MagasinDetails, { global: mountOptions });
        const comp = wrapper.vm;
        await comp.$nextTick();

        comp.previousState();
        await comp.$nextTick();

        expect(routerGoMock).toHaveBeenCalledWith(-1);
      });
    });
  });
});
