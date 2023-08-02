/* tslint:disable max-line-length */
import { vitest } from 'vitest';
import { shallowMount, MountingOptions } from '@vue/test-utils';
import sinon, { SinonStubbedInstance } from 'sinon';
import { RouteLocation } from 'vue-router';

import CategorieDetails from '../../../......mainwebappapp/entities/categorie/categorie-details.vue';
import CategorieService from '../../../......mainwebappapp/entities/categorie/categorie.service';
import AlertService from '../../../......mainwebappapp/shared/alert/alert.service';

type CategorieDetailsComponentType = InstanceType<typeof CategorieDetails>;

let route: Partial<RouteLocation>;
const routerGoMock = vitest.fn();

vitest.mock('vue-router', () => ({
  useRoute: () => route,
  useRouter: () => ({ go: routerGoMock }),
}));

const categorieSample = { id: 123 };

describe('Component Tests', () => {
  let alertService: AlertService;

  afterEach(() => {
    vitest.resetAllMocks();
  });

  describe('Categorie Management Detail Component', () => {
    let categorieServiceStub: SinonStubbedInstance<CategorieService>;
    let mountOptions: MountingOptions<CategorieDetailsComponentType>['global'];

    beforeEach(() => {
      route = {};
      categorieServiceStub = sinon.createStubInstance<CategorieService>(CategorieService);

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
          categorieService: () => categorieServiceStub,
        },
      };
    });

    describe('Navigate to details', () => {
      it('Should call load all on init', async () => {
        // GIVEN
        categorieServiceStub.find.resolves(categorieSample);
        route = {
          params: {
            categorieId: '' + 123,
          },
        };
        const wrapper = shallowMount(CategorieDetails, { global: mountOptions });
        const comp = wrapper.vm;
        // WHEN
        await comp.$nextTick();

        // THEN
        expect(comp.categorie).toMatchObject(categorieSample);
      });
    });

    describe('Previous state', () => {
      it('Should go previous state', async () => {
        categorieServiceStub.find.resolves(categorieSample);
        const wrapper = shallowMount(CategorieDetails, { global: mountOptions });
        const comp = wrapper.vm;
        await comp.$nextTick();

        comp.previousState();
        await comp.$nextTick();

        expect(routerGoMock).toHaveBeenCalledWith(-1);
      });
    });
  });
});
