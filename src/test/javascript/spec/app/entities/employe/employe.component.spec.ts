/* tslint:disable max-line-length */
import { vitest } from 'vitest';
import { shallowMount, MountingOptions } from '@vue/test-utils';
import sinon, { SinonStubbedInstance } from 'sinon';

import Employe from '../../../......mainwebappapp/entities/employe/employe.vue';
import EmployeService from '../../../......mainwebappapp/entities/employe/employe.service';
import AlertService from '../../../......mainwebappapp/shared/alert/alert.service';

type EmployeComponentType = InstanceType<typeof Employe>;

const bModalStub = {
  render: () => {},
  methods: {
    hide: () => {},
    show: () => {},
  },
};

describe('Component Tests', () => {
  let alertService: AlertService;

  describe('Employe Management Component', () => {
    let employeServiceStub: SinonStubbedInstance<EmployeService>;
    let mountOptions: MountingOptions<EmployeComponentType>['global'];

    beforeEach(() => {
      employeServiceStub = sinon.createStubInstance<EmployeService>(EmployeService);
      employeServiceStub.retrieve.resolves({ headers: {} });

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
          employeService: () => employeServiceStub,
        },
      };
    });

    describe('Mount', () => {
      it('Should call load all on init', async () => {
        // GIVEN
        employeServiceStub.retrieve.resolves({ headers: {}, data: [{ id: 123 }] });

        // WHEN
        const wrapper = shallowMount(Employe, { global: mountOptions });
        const comp = wrapper.vm;
        await comp.$nextTick();

        // THEN
        expect(employeServiceStub.retrieve.calledOnce).toBeTruthy();
        expect(comp.employes[0]).toEqual(expect.objectContaining({ id: 123 }));
      });
    });
    describe('Handles', () => {
      let comp: EmployeComponentType;

      beforeEach(async () => {
        const wrapper = shallowMount(Employe, { global: mountOptions });
        comp = wrapper.vm;
        await comp.$nextTick();
        employeServiceStub.retrieve.reset();
        employeServiceStub.retrieve.resolves({ headers: {}, data: [] });
      });

      it('Should call delete service on confirmDelete', async () => {
        // GIVEN
        employeServiceStub.delete.resolves({});

        // WHEN
        comp.prepareRemove({ id: 123 });

        comp.removeEmploye();
        await comp.$nextTick(); // clear components

        // THEN
        expect(employeServiceStub.delete.called).toBeTruthy();

        // THEN
        await comp.$nextTick(); // handle component clear watch
        expect(employeServiceStub.retrieve.callCount).toEqual(1);
      });
    });
  });
});
