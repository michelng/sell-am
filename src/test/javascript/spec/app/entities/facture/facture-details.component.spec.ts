/* tslint:disable max-line-length */
import { vitest } from 'vitest';
import { shallowMount, MountingOptions } from '@vue/test-utils';
import sinon, { SinonStubbedInstance } from 'sinon';
import { RouteLocation } from 'vue-router';

import FactureDetails from '../../../......mainwebappapp/entities/facture/facture-details.vue';
import FactureService from '../../../......mainwebappapp/entities/facture/facture.service';
import AlertService from '../../../......mainwebappapp/shared/alert/alert.service';

type FactureDetailsComponentType = InstanceType<typeof FactureDetails>;

let route: Partial<RouteLocation>;
const routerGoMock = vitest.fn();

vitest.mock('vue-router', () => ({
  useRoute: () => route,
  useRouter: () => ({ go: routerGoMock }),
}));

const factureSample = { id: 123 };

describe('Component Tests', () => {
  let alertService: AlertService;

  afterEach(() => {
    vitest.resetAllMocks();
  });

  describe('Facture Management Detail Component', () => {
    let factureServiceStub: SinonStubbedInstance<FactureService>;
    let mountOptions: MountingOptions<FactureDetailsComponentType>['global'];

    beforeEach(() => {
      route = {};
      factureServiceStub = sinon.createStubInstance<FactureService>(FactureService);

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
          factureService: () => factureServiceStub,
        },
      };
    });

    describe('Navigate to details', () => {
      it('Should call load all on init', async () => {
        // GIVEN
        factureServiceStub.find.resolves(factureSample);
        route = {
          params: {
            factureId: '' + 123,
          },
        };
        const wrapper = shallowMount(FactureDetails, { global: mountOptions });
        const comp = wrapper.vm;
        // WHEN
        await comp.$nextTick();

        // THEN
        expect(comp.facture).toMatchObject(factureSample);
      });
    });

    describe('Previous state', () => {
      it('Should go previous state', async () => {
        factureServiceStub.find.resolves(factureSample);
        const wrapper = shallowMount(FactureDetails, { global: mountOptions });
        const comp = wrapper.vm;
        await comp.$nextTick();

        comp.previousState();
        await comp.$nextTick();

        expect(routerGoMock).toHaveBeenCalledWith(-1);
      });
    });
  });
});
