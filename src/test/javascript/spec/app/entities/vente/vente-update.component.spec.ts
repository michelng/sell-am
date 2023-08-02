/* tslint:disable max-line-length */
import { vitest } from 'vitest';
import { shallowMount, MountingOptions } from '@vue/test-utils';
import sinon, { SinonStubbedInstance } from 'sinon';
import { RouteLocation } from 'vue-router';

import dayjs from 'dayjs';
import { DATE_TIME_LONG_FORMAT } from '../../../......mainwebappapp/shared/composables/date-format';
import VenteUpdate from '../../../......mainwebappapp/entities/vente/vente-update.vue';
import VenteService from '../../../......mainwebappapp/entities/vente/vente.service';
import AlertService from '../../../......mainwebappapp/shared/alert/alert.service';

import ClientService from '../../../......mainwebappapp/entities/client/client.service';
import EmployeService from '../../../......mainwebappapp/entities/employe/employe.service';

type VenteUpdateComponentType = InstanceType<typeof VenteUpdate>;

let route: Partial<RouteLocation>;
const routerGoMock = vitest.fn();

vitest.mock('vue-router', () => ({
  useRoute: () => route,
  useRouter: () => ({ go: routerGoMock }),
}));

const venteSample = { id: 123 };

describe('Component Tests', () => {
  let mountOptions: MountingOptions<VenteUpdateComponentType>['global'];
  let alertService: AlertService;

  describe('Vente Management Update Component', () => {
    let comp: VenteUpdateComponentType;
    let venteServiceStub: SinonStubbedInstance<VenteService>;

    beforeEach(() => {
      route = {};
      venteServiceStub = sinon.createStubInstance<VenteService>(VenteService);

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
          venteService: () => venteServiceStub,
          clientService: () =>
            sinon.createStubInstance<ClientService>(ClientService, {
              retrieve: sinon.stub().resolves({}),
            } as any),
          employeService: () =>
            sinon.createStubInstance<EmployeService>(EmployeService, {
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
        const wrapper = shallowMount(VenteUpdate, { global: mountOptions });
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
        const wrapper = shallowMount(VenteUpdate, { global: mountOptions });
        comp = wrapper.vm;
        comp.vente = venteSample;
        venteServiceStub.update.resolves(venteSample);

        // WHEN
        comp.save();
        await comp.$nextTick();

        // THEN
        expect(venteServiceStub.update.calledWith(venteSample)).toBeTruthy();
        expect(comp.isSaving).toEqual(false);
      });

      it('Should call create service on save for new entity', async () => {
        // GIVEN
        const entity = {};
        venteServiceStub.create.resolves(entity);
        const wrapper = shallowMount(VenteUpdate, { global: mountOptions });
        comp = wrapper.vm;
        comp.vente = entity;

        // WHEN
        comp.save();
        await comp.$nextTick();

        // THEN
        expect(venteServiceStub.create.calledWith(entity)).toBeTruthy();
        expect(comp.isSaving).toEqual(false);
      });
    });

    describe('Before route enter', () => {
      it('Should retrieve data', async () => {
        // GIVEN
        venteServiceStub.find.resolves(venteSample);
        venteServiceStub.retrieve.resolves([venteSample]);

        // WHEN
        route = {
          params: {
            venteId: '' + venteSample.id,
          },
        };
        const wrapper = shallowMount(VenteUpdate, { global: mountOptions });
        comp = wrapper.vm;
        await comp.$nextTick();

        // THEN
        expect(comp.vente).toMatchObject(venteSample);
      });
    });

    describe('Previous state', () => {
      it('Should go previous state', async () => {
        venteServiceStub.find.resolves(venteSample);
        const wrapper = shallowMount(VenteUpdate, { global: mountOptions });
        comp = wrapper.vm;
        await comp.$nextTick();

        comp.previousState();
        await comp.$nextTick();

        expect(routerGoMock).toHaveBeenCalledWith(-1);
      });
    });
  });
});
