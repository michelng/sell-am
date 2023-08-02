/* tslint:disable max-line-length */
import { vitest } from 'vitest';
import { shallowMount, MountingOptions } from '@vue/test-utils';
import sinon, { SinonStubbedInstance } from 'sinon';
import { RouteLocation } from 'vue-router';

import dayjs from 'dayjs';
import { DATE_TIME_LONG_FORMAT } from '../../../......mainwebappapp/shared/composables/date-format';
import EmployeUpdate from '../../../......mainwebappapp/entities/employe/employe-update.vue';
import EmployeService from '../../../......mainwebappapp/entities/employe/employe.service';
import AlertService from '../../../......mainwebappapp/shared/alert/alert.service';

import EntrepriseService from '../../../......mainwebappapp/entities/entreprise/entreprise.service';

type EmployeUpdateComponentType = InstanceType<typeof EmployeUpdate>;

let route: Partial<RouteLocation>;
const routerGoMock = vitest.fn();

vitest.mock('vue-router', () => ({
  useRoute: () => route,
  useRouter: () => ({ go: routerGoMock }),
}));

const employeSample = { id: 123 };

describe('Component Tests', () => {
  let mountOptions: MountingOptions<EmployeUpdateComponentType>['global'];
  let alertService: AlertService;

  describe('Employe Management Update Component', () => {
    let comp: EmployeUpdateComponentType;
    let employeServiceStub: SinonStubbedInstance<EmployeService>;

    beforeEach(() => {
      route = {};
      employeServiceStub = sinon.createStubInstance<EmployeService>(EmployeService);

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
          employeService: () => employeServiceStub,
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

    describe('load', () => {
      beforeEach(() => {
        const wrapper = shallowMount(EmployeUpdate, { global: mountOptions });
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
        const wrapper = shallowMount(EmployeUpdate, { global: mountOptions });
        comp = wrapper.vm;
        comp.employe = employeSample;
        employeServiceStub.update.resolves(employeSample);

        // WHEN
        comp.save();
        await comp.$nextTick();

        // THEN
        expect(employeServiceStub.update.calledWith(employeSample)).toBeTruthy();
        expect(comp.isSaving).toEqual(false);
      });

      it('Should call create service on save for new entity', async () => {
        // GIVEN
        const entity = {};
        employeServiceStub.create.resolves(entity);
        const wrapper = shallowMount(EmployeUpdate, { global: mountOptions });
        comp = wrapper.vm;
        comp.employe = entity;

        // WHEN
        comp.save();
        await comp.$nextTick();

        // THEN
        expect(employeServiceStub.create.calledWith(entity)).toBeTruthy();
        expect(comp.isSaving).toEqual(false);
      });
    });

    describe('Before route enter', () => {
      it('Should retrieve data', async () => {
        // GIVEN
        employeServiceStub.find.resolves(employeSample);
        employeServiceStub.retrieve.resolves([employeSample]);

        // WHEN
        route = {
          params: {
            employeId: '' + employeSample.id,
          },
        };
        const wrapper = shallowMount(EmployeUpdate, { global: mountOptions });
        comp = wrapper.vm;
        await comp.$nextTick();

        // THEN
        expect(comp.employe).toMatchObject(employeSample);
      });
    });

    describe('Previous state', () => {
      it('Should go previous state', async () => {
        employeServiceStub.find.resolves(employeSample);
        const wrapper = shallowMount(EmployeUpdate, { global: mountOptions });
        comp = wrapper.vm;
        await comp.$nextTick();

        comp.previousState();
        await comp.$nextTick();

        expect(routerGoMock).toHaveBeenCalledWith(-1);
      });
    });
  });
});
