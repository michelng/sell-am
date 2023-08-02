/* tslint:disable max-line-length */
import { vitest } from 'vitest';
import { shallowMount, MountingOptions } from '@vue/test-utils';
import sinon, { SinonStubbedInstance } from 'sinon';
import { RouteLocation } from 'vue-router';

import FournisseurUpdate from '../../../......mainwebappapp/entities/fournisseur/fournisseur-update.vue';
import FournisseurService from '../../../......mainwebappapp/entities/fournisseur/fournisseur.service';
import AlertService from '../../../......mainwebappapp/shared/alert/alert.service';

type FournisseurUpdateComponentType = InstanceType<typeof FournisseurUpdate>;

let route: Partial<RouteLocation>;
const routerGoMock = vitest.fn();

vitest.mock('vue-router', () => ({
  useRoute: () => route,
  useRouter: () => ({ go: routerGoMock }),
}));

const fournisseurSample = { id: 123 };

describe('Component Tests', () => {
  let mountOptions: MountingOptions<FournisseurUpdateComponentType>['global'];
  let alertService: AlertService;

  describe('Fournisseur Management Update Component', () => {
    let comp: FournisseurUpdateComponentType;
    let fournisseurServiceStub: SinonStubbedInstance<FournisseurService>;

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
          'b-input-group': true,
          'b-input-group-prepend': true,
          'b-form-datepicker': true,
          'b-form-input': true,
        },
        provide: {
          alertService,
          fournisseurService: () => fournisseurServiceStub,
        },
      };
    });

    afterEach(() => {
      vitest.resetAllMocks();
    });

    describe('save', () => {
      it('Should call update service on save for existing entity', async () => {
        // GIVEN
        const wrapper = shallowMount(FournisseurUpdate, { global: mountOptions });
        comp = wrapper.vm;
        comp.fournisseur = fournisseurSample;
        fournisseurServiceStub.update.resolves(fournisseurSample);

        // WHEN
        comp.save();
        await comp.$nextTick();

        // THEN
        expect(fournisseurServiceStub.update.calledWith(fournisseurSample)).toBeTruthy();
        expect(comp.isSaving).toEqual(false);
      });

      it('Should call create service on save for new entity', async () => {
        // GIVEN
        const entity = {};
        fournisseurServiceStub.create.resolves(entity);
        const wrapper = shallowMount(FournisseurUpdate, { global: mountOptions });
        comp = wrapper.vm;
        comp.fournisseur = entity;

        // WHEN
        comp.save();
        await comp.$nextTick();

        // THEN
        expect(fournisseurServiceStub.create.calledWith(entity)).toBeTruthy();
        expect(comp.isSaving).toEqual(false);
      });
    });

    describe('Before route enter', () => {
      it('Should retrieve data', async () => {
        // GIVEN
        fournisseurServiceStub.find.resolves(fournisseurSample);
        fournisseurServiceStub.retrieve.resolves([fournisseurSample]);

        // WHEN
        route = {
          params: {
            fournisseurId: '' + fournisseurSample.id,
          },
        };
        const wrapper = shallowMount(FournisseurUpdate, { global: mountOptions });
        comp = wrapper.vm;
        await comp.$nextTick();

        // THEN
        expect(comp.fournisseur).toMatchObject(fournisseurSample);
      });
    });

    describe('Previous state', () => {
      it('Should go previous state', async () => {
        fournisseurServiceStub.find.resolves(fournisseurSample);
        const wrapper = shallowMount(FournisseurUpdate, { global: mountOptions });
        comp = wrapper.vm;
        await comp.$nextTick();

        comp.previousState();
        await comp.$nextTick();

        expect(routerGoMock).toHaveBeenCalledWith(-1);
      });
    });
  });
});
