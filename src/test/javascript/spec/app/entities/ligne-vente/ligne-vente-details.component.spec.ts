/* tslint:disable max-line-length */
import { vitest } from 'vitest';
import { shallowMount, MountingOptions } from '@vue/test-utils';
import sinon, { SinonStubbedInstance } from 'sinon';
import { RouteLocation } from 'vue-router';

import LigneVenteDetails from '../../../......mainwebappapp/entities/ligne-vente/ligne-vente-details.vue';
import LigneVenteService from '../../../......mainwebappapp/entities/ligne-vente/ligne-vente.service';
import AlertService from '../../../......mainwebappapp/shared/alert/alert.service';

type LigneVenteDetailsComponentType = InstanceType<typeof LigneVenteDetails>;

let route: Partial<RouteLocation>;
const routerGoMock = vitest.fn();

vitest.mock('vue-router', () => ({
  useRoute: () => route,
  useRouter: () => ({ go: routerGoMock }),
}));

const ligneVenteSample = { id: 123 };

describe('Component Tests', () => {
  let alertService: AlertService;

  afterEach(() => {
    vitest.resetAllMocks();
  });

  describe('LigneVente Management Detail Component', () => {
    let ligneVenteServiceStub: SinonStubbedInstance<LigneVenteService>;
    let mountOptions: MountingOptions<LigneVenteDetailsComponentType>['global'];

    beforeEach(() => {
      route = {};
      ligneVenteServiceStub = sinon.createStubInstance<LigneVenteService>(LigneVenteService);

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
          ligneVenteService: () => ligneVenteServiceStub,
        },
      };
    });

    describe('Navigate to details', () => {
      it('Should call load all on init', async () => {
        // GIVEN
        ligneVenteServiceStub.find.resolves(ligneVenteSample);
        route = {
          params: {
            ligneVenteId: '' + 123,
          },
        };
        const wrapper = shallowMount(LigneVenteDetails, { global: mountOptions });
        const comp = wrapper.vm;
        // WHEN
        await comp.$nextTick();

        // THEN
        expect(comp.ligneVente).toMatchObject(ligneVenteSample);
      });
    });

    describe('Previous state', () => {
      it('Should go previous state', async () => {
        ligneVenteServiceStub.find.resolves(ligneVenteSample);
        const wrapper = shallowMount(LigneVenteDetails, { global: mountOptions });
        const comp = wrapper.vm;
        await comp.$nextTick();

        comp.previousState();
        await comp.$nextTick();

        expect(routerGoMock).toHaveBeenCalledWith(-1);
      });
    });
  });
});
