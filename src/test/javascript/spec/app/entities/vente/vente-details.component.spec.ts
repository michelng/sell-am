/* tslint:disable max-line-length */
import { vitest } from 'vitest';
import { shallowMount, MountingOptions } from '@vue/test-utils';
import sinon, { SinonStubbedInstance } from 'sinon';
import { RouteLocation } from 'vue-router';

import VenteDetails from '../../../......mainwebappapp/entities/vente/vente-details.vue';
import VenteService from '../../../......mainwebappapp/entities/vente/vente.service';
import AlertService from '../../../......mainwebappapp/shared/alert/alert.service';

type VenteDetailsComponentType = InstanceType<typeof VenteDetails>;

let route: Partial<RouteLocation>;
const routerGoMock = vitest.fn();

vitest.mock('vue-router', () => ({
  useRoute: () => route,
  useRouter: () => ({ go: routerGoMock }),
}));

const venteSample = { id: 123 };

describe('Component Tests', () => {
  let alertService: AlertService;

  afterEach(() => {
    vitest.resetAllMocks();
  });

  describe('Vente Management Detail Component', () => {
    let venteServiceStub: SinonStubbedInstance<VenteService>;
    let mountOptions: MountingOptions<VenteDetailsComponentType>['global'];

    beforeEach(() => {
      route = {};
      venteServiceStub = sinon.createStubInstance<VenteService>(VenteService);

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
          venteService: () => venteServiceStub,
        },
      };
    });

    describe('Navigate to details', () => {
      it('Should call load all on init', async () => {
        // GIVEN
        venteServiceStub.find.resolves(venteSample);
        route = {
          params: {
            venteId: '' + 123,
          },
        };
        const wrapper = shallowMount(VenteDetails, { global: mountOptions });
        const comp = wrapper.vm;
        // WHEN
        await comp.$nextTick();

        // THEN
        expect(comp.vente).toMatchObject(venteSample);
      });
    });

    describe('Previous state', () => {
      it('Should go previous state', async () => {
        venteServiceStub.find.resolves(venteSample);
        const wrapper = shallowMount(VenteDetails, { global: mountOptions });
        const comp = wrapper.vm;
        await comp.$nextTick();

        comp.previousState();
        await comp.$nextTick();

        expect(routerGoMock).toHaveBeenCalledWith(-1);
      });
    });
  });
});
