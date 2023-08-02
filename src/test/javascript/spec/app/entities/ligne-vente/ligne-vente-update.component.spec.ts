/* tslint:disable max-line-length */
import { vitest } from 'vitest';
import { shallowMount, MountingOptions } from '@vue/test-utils';
import sinon, { SinonStubbedInstance } from 'sinon';
import { RouteLocation } from 'vue-router';

import LigneVenteUpdate from '../../../......mainwebappapp/entities/ligne-vente/ligne-vente-update.vue';
import LigneVenteService from '../../../......mainwebappapp/entities/ligne-vente/ligne-vente.service';
import AlertService from '../../../......mainwebappapp/shared/alert/alert.service';

import VenteService from '../../../......mainwebappapp/entities/vente/vente.service';
import ArticleService from '../../../......mainwebappapp/entities/article/article.service';

type LigneVenteUpdateComponentType = InstanceType<typeof LigneVenteUpdate>;

let route: Partial<RouteLocation>;
const routerGoMock = vitest.fn();

vitest.mock('vue-router', () => ({
  useRoute: () => route,
  useRouter: () => ({ go: routerGoMock }),
}));

const ligneVenteSample = { id: 123 };

describe('Component Tests', () => {
  let mountOptions: MountingOptions<LigneVenteUpdateComponentType>['global'];
  let alertService: AlertService;

  describe('LigneVente Management Update Component', () => {
    let comp: LigneVenteUpdateComponentType;
    let ligneVenteServiceStub: SinonStubbedInstance<LigneVenteService>;

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
          'b-input-group': true,
          'b-input-group-prepend': true,
          'b-form-datepicker': true,
          'b-form-input': true,
        },
        provide: {
          alertService,
          ligneVenteService: () => ligneVenteServiceStub,
          venteService: () =>
            sinon.createStubInstance<VenteService>(VenteService, {
              retrieve: sinon.stub().resolves({}),
            } as any),
          articleService: () =>
            sinon.createStubInstance<ArticleService>(ArticleService, {
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
        const wrapper = shallowMount(LigneVenteUpdate, { global: mountOptions });
        comp = wrapper.vm;
        comp.ligneVente = ligneVenteSample;
        ligneVenteServiceStub.update.resolves(ligneVenteSample);

        // WHEN
        comp.save();
        await comp.$nextTick();

        // THEN
        expect(ligneVenteServiceStub.update.calledWith(ligneVenteSample)).toBeTruthy();
        expect(comp.isSaving).toEqual(false);
      });

      it('Should call create service on save for new entity', async () => {
        // GIVEN
        const entity = {};
        ligneVenteServiceStub.create.resolves(entity);
        const wrapper = shallowMount(LigneVenteUpdate, { global: mountOptions });
        comp = wrapper.vm;
        comp.ligneVente = entity;

        // WHEN
        comp.save();
        await comp.$nextTick();

        // THEN
        expect(ligneVenteServiceStub.create.calledWith(entity)).toBeTruthy();
        expect(comp.isSaving).toEqual(false);
      });
    });

    describe('Before route enter', () => {
      it('Should retrieve data', async () => {
        // GIVEN
        ligneVenteServiceStub.find.resolves(ligneVenteSample);
        ligneVenteServiceStub.retrieve.resolves([ligneVenteSample]);

        // WHEN
        route = {
          params: {
            ligneVenteId: '' + ligneVenteSample.id,
          },
        };
        const wrapper = shallowMount(LigneVenteUpdate, { global: mountOptions });
        comp = wrapper.vm;
        await comp.$nextTick();

        // THEN
        expect(comp.ligneVente).toMatchObject(ligneVenteSample);
      });
    });

    describe('Previous state', () => {
      it('Should go previous state', async () => {
        ligneVenteServiceStub.find.resolves(ligneVenteSample);
        const wrapper = shallowMount(LigneVenteUpdate, { global: mountOptions });
        comp = wrapper.vm;
        await comp.$nextTick();

        comp.previousState();
        await comp.$nextTick();

        expect(routerGoMock).toHaveBeenCalledWith(-1);
      });
    });
  });
});
