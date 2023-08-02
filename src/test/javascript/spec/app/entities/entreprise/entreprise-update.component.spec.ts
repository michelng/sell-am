/* tslint:disable max-line-length */
import { vitest } from 'vitest';
import { shallowMount, MountingOptions } from '@vue/test-utils';
import sinon, { SinonStubbedInstance } from 'sinon';
import { RouteLocation } from 'vue-router';

import EntrepriseUpdate from '../../../......mainwebappapp/entities/entreprise/entreprise-update.vue';
import EntrepriseService from '../../../......mainwebappapp/entities/entreprise/entreprise.service';
import AlertService from '../../../......mainwebappapp/shared/alert/alert.service';

type EntrepriseUpdateComponentType = InstanceType<typeof EntrepriseUpdate>;

let route: Partial<RouteLocation>;
const routerGoMock = vitest.fn();

vitest.mock('vue-router', () => ({
  useRoute: () => route,
  useRouter: () => ({ go: routerGoMock }),
}));

const entrepriseSample = { id: 123 };

describe('Component Tests', () => {
  let mountOptions: MountingOptions<EntrepriseUpdateComponentType>['global'];
  let alertService: AlertService;

  describe('Entreprise Management Update Component', () => {
    let comp: EntrepriseUpdateComponentType;
    let entrepriseServiceStub: SinonStubbedInstance<EntrepriseService>;

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
          'b-input-group': true,
          'b-input-group-prepend': true,
          'b-form-datepicker': true,
          'b-form-input': true,
        },
        provide: {
          alertService,
          entrepriseService: () => entrepriseServiceStub,
        },
      };
    });

    afterEach(() => {
      vitest.resetAllMocks();
    });

    describe('save', () => {
      it('Should call update service on save for existing entity', async () => {
        // GIVEN
        const wrapper = shallowMount(EntrepriseUpdate, { global: mountOptions });
        comp = wrapper.vm;
        comp.entreprise = entrepriseSample;
        entrepriseServiceStub.update.resolves(entrepriseSample);

        // WHEN
        comp.save();
        await comp.$nextTick();

        // THEN
        expect(entrepriseServiceStub.update.calledWith(entrepriseSample)).toBeTruthy();
        expect(comp.isSaving).toEqual(false);
      });

      it('Should call create service on save for new entity', async () => {
        // GIVEN
        const entity = {};
        entrepriseServiceStub.create.resolves(entity);
        const wrapper = shallowMount(EntrepriseUpdate, { global: mountOptions });
        comp = wrapper.vm;
        comp.entreprise = entity;

        // WHEN
        comp.save();
        await comp.$nextTick();

        // THEN
        expect(entrepriseServiceStub.create.calledWith(entity)).toBeTruthy();
        expect(comp.isSaving).toEqual(false);
      });
    });

    describe('Before route enter', () => {
      it('Should retrieve data', async () => {
        // GIVEN
        entrepriseServiceStub.find.resolves(entrepriseSample);
        entrepriseServiceStub.retrieve.resolves([entrepriseSample]);

        // WHEN
        route = {
          params: {
            entrepriseId: '' + entrepriseSample.id,
          },
        };
        const wrapper = shallowMount(EntrepriseUpdate, { global: mountOptions });
        comp = wrapper.vm;
        await comp.$nextTick();

        // THEN
        expect(comp.entreprise).toMatchObject(entrepriseSample);
      });
    });

    describe('Previous state', () => {
      it('Should go previous state', async () => {
        entrepriseServiceStub.find.resolves(entrepriseSample);
        const wrapper = shallowMount(EntrepriseUpdate, { global: mountOptions });
        comp = wrapper.vm;
        await comp.$nextTick();

        comp.previousState();
        await comp.$nextTick();

        expect(routerGoMock).toHaveBeenCalledWith(-1);
      });
    });
  });
});
