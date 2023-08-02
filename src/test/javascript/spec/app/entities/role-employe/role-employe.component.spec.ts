/* tslint:disable max-line-length */
import { vitest } from 'vitest';
import { shallowMount, MountingOptions } from '@vue/test-utils';
import sinon, { SinonStubbedInstance } from 'sinon';

import RoleEmploye from '../../../......mainwebappapp/entities/role-employe/role-employe.vue';
import RoleEmployeService from '../../../......mainwebappapp/entities/role-employe/role-employe.service';
import AlertService from '../../../......mainwebappapp/shared/alert/alert.service';

type RoleEmployeComponentType = InstanceType<typeof RoleEmploye>;

const bModalStub = {
  render: () => {},
  methods: {
    hide: () => {},
    show: () => {},
  },
};

describe('Component Tests', () => {
  let alertService: AlertService;

  describe('RoleEmploye Management Component', () => {
    let roleEmployeServiceStub: SinonStubbedInstance<RoleEmployeService>;
    let mountOptions: MountingOptions<RoleEmployeComponentType>['global'];

    beforeEach(() => {
      roleEmployeServiceStub = sinon.createStubInstance<RoleEmployeService>(RoleEmployeService);
      roleEmployeServiceStub.retrieve.resolves({ headers: {} });

      alertService = new AlertService({
        i18n: { t: vitest.fn() } as any,
        bvToast: {
          toast: vitest.fn(),
        } as any,
      });

      mountOptions = {
        stubs: {
          bModal: bModalStub as any,
          'font-awesome-icon': true,
          'b-badge': true,
          'b-button': true,
          'router-link': true,
        },
        directives: {
          'b-modal': {},
        },
        provide: {
          alertService,
          roleEmployeService: () => roleEmployeServiceStub,
        },
      };
    });

    describe('Mount', () => {
      it('Should call load all on init', async () => {
        // GIVEN
        roleEmployeServiceStub.retrieve.resolves({ headers: {}, data: [{ id: 123 }] });

        // WHEN
        const wrapper = shallowMount(RoleEmploye, { global: mountOptions });
        const comp = wrapper.vm;
        await comp.$nextTick();

        // THEN
        expect(roleEmployeServiceStub.retrieve.calledOnce).toBeTruthy();
        expect(comp.roleEmployes[0]).toEqual(expect.objectContaining({ id: 123 }));
      });
    });
    describe('Handles', () => {
      let comp: RoleEmployeComponentType;

      beforeEach(async () => {
        const wrapper = shallowMount(RoleEmploye, { global: mountOptions });
        comp = wrapper.vm;
        await comp.$nextTick();
        roleEmployeServiceStub.retrieve.reset();
        roleEmployeServiceStub.retrieve.resolves({ headers: {}, data: [] });
      });

      it('Should call delete service on confirmDelete', async () => {
        // GIVEN
        roleEmployeServiceStub.delete.resolves({});

        // WHEN
        comp.prepareRemove({ id: 123 });

        comp.removeRoleEmploye();
        await comp.$nextTick(); // clear components

        // THEN
        expect(roleEmployeServiceStub.delete.called).toBeTruthy();

        // THEN
        await comp.$nextTick(); // handle component clear watch
        expect(roleEmployeServiceStub.retrieve.callCount).toEqual(1);
      });
    });
  });
});
