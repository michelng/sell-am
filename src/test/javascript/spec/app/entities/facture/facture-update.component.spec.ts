/* tslint:disable max-line-length */
import { vitest } from 'vitest';
import { shallowMount, MountingOptions } from '@vue/test-utils';
import sinon, { SinonStubbedInstance } from 'sinon';
import { RouteLocation } from 'vue-router';

import dayjs from 'dayjs';
import { DATE_TIME_LONG_FORMAT } from '../../../......mainwebappapp/shared/composables/date-format';
import FactureUpdate from '../../../......mainwebappapp/entities/facture/facture-update.vue';
import FactureService from '../../../......mainwebappapp/entities/facture/facture.service';
import AlertService from '../../../......mainwebappapp/shared/alert/alert.service';

import VenteService from '../../../......mainwebappapp/entities/vente/vente.service';
import ClientService from '../../../......mainwebappapp/entities/client/client.service';

type FactureUpdateComponentType = InstanceType<typeof FactureUpdate>;

let route: Partial<RouteLocation>;
const routerGoMock = vitest.fn();

vitest.mock('vue-router', () => ({
  useRoute: () => route,
  useRouter: () => ({ go: routerGoMock }),
}));

const factureSample = { id: 123 };

describe('Component Tests', () => {
  let mountOptions: MountingOptions<FactureUpdateComponentType>['global'];
  let alertService: AlertService;

  describe('Facture Management Update Component', () => {
    let comp: FactureUpdateComponentType;
    let factureServiceStub: SinonStubbedInstance<FactureService>;

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
          'b-input-group': true,
          'b-input-group-prepend': true,
          'b-form-datepicker': true,
          'b-form-input': true,
        },
        provide: {
          alertService,
          factureService: () => factureServiceStub,
          venteService: () =>
            sinon.createStubInstance<VenteService>(VenteService, {
              retrieve: sinon.stub().resolves({}),
            } as any),
          clientService: () =>
            sinon.createStubInstance<ClientService>(ClientService, {
              retrieve: sinon.stub().resolves({}),
            } as any),
        },
      };
    });

    afterEach(() => {
      vitest.resetAllMocks();
    });

    describe('load', () => {
      beforeEach(() => {
        const wrapper = shallowMount(FactureUpdate, { global: mountOptions });
        comp = wrapper.vm;
      });
      it('Should convert date from string', () => {
        // GIVEN
        const date = new Date('2019-10-15T11:42:02Z');

        // WHEN
        const convertedDate = comp.convertDateTimeFromServer(date);

        // THEN
        expect(convertedDate).toEqual(dayjs(date).format(DATE_TIME_LONG_FORMAT));
      });

      it('Should not convert date if date is not present', () => {
        expect(comp.convertDateTimeFromServer(null)).toBeNull();
      });
    });

    describe('save', () => {
      it('Should call update service on save for existing entity', async () => {
        // GIVEN
        const wrapper = shallowMount(FactureUpdate, { global: mountOptions });
        comp = wrapper.vm;
        comp.facture = factureSample;
        factureServiceStub.update.resolves(factureSample);

        // WHEN
        comp.save();
        await comp.$nextTick();

        // THEN
        expect(factureServiceStub.update.calledWith(factureSample)).toBeTruthy();
        expect(comp.isSaving).toEqual(false);
      });

      it('Should call create service on save for new entity', async () => {
        // GIVEN
        const entity = {};
        factureServiceStub.create.resolves(entity);
        const wrapper = shallowMount(FactureUpdate, { global: mountOptions });
        comp = wrapper.vm;
        comp.facture = entity;

        // WHEN
        comp.save();
        await comp.$nextTick();

        // THEN
        expect(factureServiceStub.create.calledWith(entity)).toBeTruthy();
        expect(comp.isSaving).toEqual(false);
      });
    });

    describe('Before route enter', () => {
      it('Should retrieve data', async () => {
        // GIVEN
        factureServiceStub.find.resolves(factureSample);
        factureServiceStub.retrieve.resolves([factureSample]);

        // WHEN
        route = {
          params: {
            factureId: '' + factureSample.id,
          },
        };
        const wrapper = shallowMount(FactureUpdate, { global: mountOptions });
        comp = wrapper.vm;
        await comp.$nextTick();

        // THEN
        expect(comp.facture).toMatchObject(factureSample);
      });
    });

    describe('Previous state', () => {
      it('Should go previous state', async () => {
        factureServiceStub.find.resolves(factureSample);
        const wrapper = shallowMount(FactureUpdate, { global: mountOptions });
        comp = wrapper.vm;
        await comp.$nextTick();

        comp.previousState();
        await comp.$nextTick();

        expect(routerGoMock).toHaveBeenCalledWith(-1);
      });
    });
  });
});
