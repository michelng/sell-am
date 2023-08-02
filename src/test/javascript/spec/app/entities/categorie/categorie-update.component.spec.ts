/* tslint:disable max-line-length */
import { vitest } from 'vitest';
import { shallowMount, MountingOptions } from '@vue/test-utils';
import sinon, { SinonStubbedInstance } from 'sinon';
import { RouteLocation } from 'vue-router';

import CategorieUpdate from '../../../......mainwebappapp/entities/categorie/categorie-update.vue';
import CategorieService from '../../../......mainwebappapp/entities/categorie/categorie.service';
import AlertService from '../../../......mainwebappapp/shared/alert/alert.service';

type CategorieUpdateComponentType = InstanceType<typeof CategorieUpdate>;

let route: Partial<RouteLocation>;
const routerGoMock = vitest.fn();

vitest.mock('vue-router', () => ({
  useRoute: () => route,
  useRouter: () => ({ go: routerGoMock }),
}));

const categorieSample = { id: 123 };

describe('Component Tests', () => {
  let mountOptions: MountingOptions<CategorieUpdateComponentType>['global'];
  let alertService: AlertService;

  describe('Categorie Management Update Component', () => {
    let comp: CategorieUpdateComponentType;
    let categorieServiceStub: SinonStubbedInstance<CategorieService>;

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
          'b-input-group': true,
          'b-input-group-prepend': true,
          'b-form-datepicker': true,
          'b-form-input': true,
        },
        provide: {
          alertService,
          categorieService: () => categorieServiceStub,
        },
      };
    });

    afterEach(() => {
      vitest.resetAllMocks();
    });

    describe('save', () => {
      it('Should call update service on save for existing entity', async () => {
        // GIVEN
        const wrapper = shallowMount(CategorieUpdate, { global: mountOptions });
        comp = wrapper.vm;
        comp.categorie = categorieSample;
        categorieServiceStub.update.resolves(categorieSample);

        // WHEN
        comp.save();
        await comp.$nextTick();

        // THEN
        expect(categorieServiceStub.update.calledWith(categorieSample)).toBeTruthy();
        expect(comp.isSaving).toEqual(false);
      });

      it('Should call create service on save for new entity', async () => {
        // GIVEN
        const entity = {};
        categorieServiceStub.create.resolves(entity);
        const wrapper = shallowMount(CategorieUpdate, { global: mountOptions });
        comp = wrapper.vm;
        comp.categorie = entity;

        // WHEN
        comp.save();
        await comp.$nextTick();

        // THEN
        expect(categorieServiceStub.create.calledWith(entity)).toBeTruthy();
        expect(comp.isSaving).toEqual(false);
      });
    });

    describe('Before route enter', () => {
      it('Should retrieve data', async () => {
        // GIVEN
        categorieServiceStub.find.resolves(categorieSample);
        categorieServiceStub.retrieve.resolves([categorieSample]);

        // WHEN
        route = {
          params: {
            categorieId: '' + categorieSample.id,
          },
        };
        const wrapper = shallowMount(CategorieUpdate, { global: mountOptions });
        comp = wrapper.vm;
        await comp.$nextTick();

        // THEN
        expect(comp.categorie).toMatchObject(categorieSample);
      });
    });

    describe('Previous state', () => {
      it('Should go previous state', async () => {
        categorieServiceStub.find.resolves(categorieSample);
        const wrapper = shallowMount(CategorieUpdate, { global: mountOptions });
        comp = wrapper.vm;
        await comp.$nextTick();

        comp.previousState();
        await comp.$nextTick();

        expect(routerGoMock).toHaveBeenCalledWith(-1);
      });
    });
  });
});
