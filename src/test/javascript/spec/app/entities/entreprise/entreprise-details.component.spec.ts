/* tslint:disable max-line-length */
import { vitest } from 'vitest';
import { shallowMount, MountingOptions } from '@vue/test-utils';
import sinon, { SinonStubbedInstance } from 'sinon';
import { RouteLocation } from 'vue-router';

import EntrepriseDetails from '../../../......mainwebappapp/entities/entreprise/entreprise-details.vue';
import EntrepriseService from '../../../......mainwebappapp/entities/entreprise/entreprise.service';
import AlertService from '../../../......mainwebappapp/shared/alert/alert.service';

type EntrepriseDetailsComponentType = InstanceType<typeof EntrepriseDetails>;

let route: Partial<RouteLocation>;
const routerGoMock = vitest.fn();

vitest.mock('vue-router', () => ({
  useRoute: () => route,
  useRouter: () => ({ go: routerGoMock }),
}));

const entrepriseSample = { id: 123 };

describe('Component Tests', () => {
  let alertService: AlertService;

  afterEach(() => {
    vitest.resetAllMocks();
  });

  describe('Entreprise Management Detail Component', () => {
    let entrepriseServiceStub: SinonStubbedInstance<EntrepriseService>;
    let mountOptions: MountingOptions<EntrepriseDetailsComponentType>['global'];

    beforeEach(() => {
      route = {};
      entrepriseServiceStub = sinon.createStubInstance<EntrepriseService>(EntrepriseService);

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
          entrepriseService: () => entrepriseServiceStub,
        },
      };
    });

    describe('Navigate to details', () => {
      it('Should call load all on init', async () => {
        // GIVEN
        entrepriseServiceStub.find.resolves(entrepriseSample);
        route = {
          params: {
            entrepriseId: '' + 123,
          },
        };
        const wrapper = shallowMount(EntrepriseDetails, { global: mountOptions });
        const comp = wrapper.vm;
        // WHEN
        await comp.$nextTick();

        // THEN
        expect(comp.entreprise).toMatchObject(entrepriseSample);
      });
    });

    describe('Previous state', () => {
      it('Should go previous state', async () => {
        entrepriseServiceStub.find.resolves(entrepriseSample);
        const wrapper = shallowMount(EntrepriseDetails, { global: mountOptions });
        const comp = wrapper.vm;
        await comp.$nextTick();

        comp.previousState();
        await comp.$nextTick();

        expect(routerGoMock).toHaveBeenCalledWith(-1);
      });
    });
  });
});
