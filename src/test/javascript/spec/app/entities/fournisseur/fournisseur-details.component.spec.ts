/* tslint:disable max-line-length */
import { vitest } from 'vitest';
import { shallowMount, MountingOptions } from '@vue/test-utils';
import sinon, { SinonStubbedInstance } from 'sinon';
import { RouteLocation } from 'vue-router';

import FournisseurDetails from '../../../......mainwebappapp/entities/fournisseur/fournisseur-details.vue';
import FournisseurService from '../../../......mainwebappapp/entities/fournisseur/fournisseur.service';
import AlertService from '../../../......mainwebappapp/shared/alert/alert.service';

type FournisseurDetailsComponentType = InstanceType<typeof FournisseurDetails>;

let route: Partial<RouteLocation>;
const routerGoMock = vitest.fn();

vitest.mock('vue-router', () => ({
  useRoute: () => route,
  useRouter: () => ({ go: routerGoMock }),
}));

const fournisseurSample = { id: 123 };

describe('Component Tests', () => {
  let alertService: AlertService;

  afterEach(() => {
    vitest.resetAllMocks();
  });

  describe('Fournisseur Management Detail Component', () => {
    let fournisseurServiceStub: SinonStubbedInstance<FournisseurService>;
    let mountOptions: MountingOptions<FournisseurDetailsComponentType>['global'];

    beforeEach(() => {
      route = {};
      fournisseurServiceStub = sinon.createStubInstance<FournisseurService>(FournisseurService);

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
          fournisseurService: () => fournisseurServiceStub,
        },
      };
    });

    describe('Navigate to details', () => {
      it('Should call load all on init', async () => {
        // GIVEN
        fournisseurServiceStub.find.resolves(fournisseurSample);
        route = {
          params: {
            fournisseurId: '' + 123,
          },
        };
        const wrapper = shallowMount(FournisseurDetails, { global: mountOptions });
        const comp = wrapper.vm;
        // WHEN
        await comp.$nextTick();

        // THEN
        expect(comp.fournisseur).toMatchObject(fournisseurSample);
      });
    });

    describe('Previous state', () => {
      it('Should go previous state', async () => {
        fournisseurServiceStub.find.resolves(fournisseurSample);
        const wrapper = shallowMount(FournisseurDetails, { global: mountOptions });
        const comp = wrapper.vm;
        await comp.$nextTick();

        comp.previousState();
        await comp.$nextTick();

        expect(routerGoMock).toHaveBeenCalledWith(-1);
      });
    });
  });
});
