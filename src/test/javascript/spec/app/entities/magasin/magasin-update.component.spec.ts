/* tslint:disable max-line-length */
import { vitest } from 'vitest';
import { shallowMount, MountingOptions } from '@vue/test-utils';
import sinon, { SinonStubbedInstance } from 'sinon';
import { RouteLocation } from 'vue-router';

import MagasinUpdate from '../../../......mainwebappapp/entities/magasin/magasin-update.vue';
import MagasinService from '../../../......mainwebappapp/entities/magasin/magasin.service';
import AlertService from '../../../......mainwebappapp/shared/alert/alert.service';

import EntrepriseService from '../../../......mainwebappapp/entities/entreprise/entreprise.service';

type MagasinUpdateComponentType = InstanceType<typeof MagasinUpdate>;

let route: Partial<RouteLocation>;
const routerGoMock = vitest.fn();

vitest.mock('vue-router', () => ({
  useRoute: () => route,
  useRouter: () => ({ go: routerGoMock }),
}));

const magasinSample = { id: 123 };

describe('Component Tests', () => {
  let mountOptions: MountingOptions<MagasinUpdateComponentType>['global'];
  let alertService: AlertService;

  describe('Magasin Management Update Component', () => {
    let comp: MagasinUpdateComponentType;
    let magasinServiceStub: SinonStubbedInstance<MagasinService>;

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
          'b-input-group': true,
          'b-input-group-prepend': true,
          'b-form-datepicker': true,
          'b-form-input': true,
        },
        provide: {
          alertService,
          magasinService: () => magasinServiceStub,
          entrepriseService: () =>
            sinon.createStubInstance<EntrepriseService>(EntrepriseService, {
              retrieve: sinon.stub().resolves({}),
            } as any),
        },
      };
    });

    afterEach(() => {
      vitest.resetAllMocks();
    });

    describe('save', () => {
      it('Should call update service on save for existing entity', async () => {
        // GIVEN
        const wrapper = shallowMount(MagasinUpdate, { global: mountOptions });
        comp = wrapper.vm;
        comp.magasin = magasinSample;
        magasinServiceStub.update.resolves(magasinSample);

        // WHEN
        comp.save();
        await comp.$nextTick();

        // THEN
        expect(magasinServiceStub.update.calledWith(magasinSample)).toBeTruthy();
        expect(comp.isSaving).toEqual(false);
      });

      it('Should call create service on save for new entity', async () => {
        // GIVEN
        const entity = {};
        magasinServiceStub.create.resolves(entity);
        const wrapper = shallowMount(MagasinUpdate, { global: mountOptions });
        comp = wrapper.vm;
        comp.magasin = entity;

        // WHEN
        comp.save();
        await comp.$nextTick();

        // THEN
        expect(magasinServiceStub.create.calledWith(entity)).toBeTruthy();
        expect(comp.isSaving).toEqual(false);
      });
    });

    describe('Before route enter', () => {
      it('Should retrieve data', async () => {
        // GIVEN
        magasinServiceStub.find.resolves(magasinSample);
        magasinServiceStub.retrieve.resolves([magasinSample]);

        // WHEN
        route = {
          params: {
            magasinId: '' + magasinSample.id,
          },
        };
        const wrapper = shallowMount(MagasinUpdate, { global: mountOptions });
        comp = wrapper.vm;
        await comp.$nextTick();

        // THEN
        expect(comp.magasin).toMatchObject(magasinSample);
      });
    });

    describe('Previous state', () => {
      it('Should go previous state', async () => {
        magasinServiceStub.find.resolves(magasinSample);
        const wrapper = shallowMount(MagasinUpdate, { global: mountOptions });
        comp = wrapper.vm;
        await comp.$nextTick();

        comp.previousState();
        await comp.$nextTick();

        expect(routerGoMock).toHaveBeenCalledWith(-1);
      });
    });
  });
});
