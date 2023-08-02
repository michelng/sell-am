/* tslint:disable max-line-length */
import { vitest } from 'vitest';
import { shallowMount, MountingOptions } from '@vue/test-utils';
import sinon, { SinonStubbedInstance } from 'sinon';
import { RouteLocation } from 'vue-router';

import RoleEmployeUpdate from '../../../......mainwebappapp/entities/role-employe/role-employe-update.vue';
import RoleEmployeService from '../../../......mainwebappapp/entities/role-employe/role-employe.service';
import AlertService from '../../../......mainwebappapp/shared/alert/alert.service';

type RoleEmployeUpdateComponentType = InstanceType<typeof RoleEmployeUpdate>;

let route: Partial<RouteLocation>;
const routerGoMock = vitest.fn();

vitest.mock('vue-router', () => ({
  useRoute: () => route,
  useRouter: () => ({ go: routerGoMock }),
}));

const roleEmployeSample = { id: 123 };

describe('Component Tests', () => {
  let mountOptions: MountingOptions<RoleEmployeUpdateComponentType>['global'];
  let alertService: AlertService;

  describe('RoleEmploye Management Update Component', () => {
    let comp: RoleEmployeUpdateComponentType;
    let roleEmployeServiceStub: SinonStubbedInstance<RoleEmployeService>;

    beforeEach(() => {
      route = {};
      roleEmployeServiceStub = sinon.createStubInstance<RoleEmployeService>(RoleEmployeService);

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
          roleEmployeService: () => roleEmployeServiceStub,
        },
      };
    });

    afterEach(() => {
      vitest.resetAllMocks();
    });

    describe('save', () => {
      it('Should call update service on save for existing entity', async () => {
        // GIVEN
        const wrapper = shallowMount(RoleEmployeUpdate, { global: mountOptions });
        comp = wrapper.vm;
        comp.roleEmploye = roleEmployeSample;
        roleEmployeServiceStub.update.resolves(roleEmployeSample);

        // WHEN
        comp.save();
        await comp.$nextTick();

        // THEN
        expect(roleEmployeServiceStub.update.calledWith(roleEmployeSample)).toBeTruthy();
        expect(comp.isSaving).toEqual(false);
      });

      it('Should call create service on save for new entity', async () => {
        // GIVEN
        const entity = {};
        roleEmployeServiceStub.create.resolves(entity);
        const wrapper = shallowMount(RoleEmployeUpdate, { global: mountOptions });
        comp = wrapper.vm;
        comp.roleEmploye = entity;

        // WHEN
        comp.save();
        await comp.$nextTick();

        // THEN
        expect(roleEmployeServiceStub.create.calledWith(entity)).toBeTruthy();
        expect(comp.isSaving).toEqual(false);
      });
    });

    describe('Before route enter', () => {
      it('Should retrieve data', async () => {
        // GIVEN
        roleEmployeServiceStub.find.resolves(roleEmployeSample);
        roleEmployeServiceStub.retrieve.resolves([roleEmployeSample]);

        // WHEN
        route = {
          params: {
            roleEmployeId: '' + roleEmployeSample.id,
          },
        };
        const wrapper = shallowMount(RoleEmployeUpdate, { global: mountOptions });
        comp = wrapper.vm;
        await comp.$nextTick();

        // THEN
        expect(comp.roleEmploye).toMatchObject(roleEmployeSample);
      });
    });

    describe('Previous state', () => {
      it('Should go previous state', async () => {
        roleEmployeServiceStub.find.resolves(roleEmployeSample);
        const wrapper = shallowMount(RoleEmployeUpdate, { global: mountOptions });
        comp = wrapper.vm;
        await comp.$nextTick();

        comp.previousState();
        await comp.$nextTick();

        expect(routerGoMock).toHaveBeenCalledWith(-1);
      });
    });
  });
});
