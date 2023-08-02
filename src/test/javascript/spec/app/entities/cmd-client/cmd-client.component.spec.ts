/* tslint:disable max-line-length */
import { vitest } from 'vitest';
import { shallowMount, MountingOptions } from '@vue/test-utils';
import sinon, { SinonStubbedInstance } from 'sinon';

import CmdClient from '../../../......mainwebappapp/entities/cmd-client/cmd-client.vue';
import CmdClientService from '../../../......mainwebappapp/entities/cmd-client/cmd-client.service';
import AlertService from '../../../......mainwebappapp/shared/alert/alert.service';

type CmdClientComponentType = InstanceType<typeof CmdClient>;

const bModalStub = {
  render: () => {},
  methods: {
    hide: () => {},
    show: () => {},
  },
};

describe('Component Tests', () => {
  let alertService: AlertService;

  describe('CmdClient Management Component', () => {
    let cmdClientServiceStub: SinonStubbedInstance<CmdClientService>;
    let mountOptions: MountingOptions<CmdClientComponentType>['global'];

    beforeEach(() => {
      cmdClientServiceStub = sinon.createStubInstance<CmdClientService>(CmdClientService);
      cmdClientServiceStub.retrieve.resolves({ headers: {} });

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
          cmdClientService: () => cmdClientServiceStub,
        },
      };
    });

    describe('Mount', () => {
      it('Should call load all on init', async () => {
        // GIVEN
        cmdClientServiceStub.retrieve.resolves({ headers: {}, data: [{ id: 123 }] });

        // WHEN
        const wrapper = shallowMount(CmdClient, { global: mountOptions });
        const comp = wrapper.vm;
        await comp.$nextTick();

        // THEN
        expect(cmdClientServiceStub.retrieve.calledOnce).toBeTruthy();
        expect(comp.cmdClients[0]).toEqual(expect.objectContaining({ id: 123 }));
      });
    });
    describe('Handles', () => {
      let comp: CmdClientComponentType;

      beforeEach(async () => {
        const wrapper = shallowMount(CmdClient, { global: mountOptions });
        comp = wrapper.vm;
        await comp.$nextTick();
        cmdClientServiceStub.retrieve.reset();
        cmdClientServiceStub.retrieve.resolves({ headers: {}, data: [] });
      });

      it('Should call delete service on confirmDelete', async () => {
        // GIVEN
        cmdClientServiceStub.delete.resolves({});

        // WHEN
        comp.prepareRemove({ id: 123 });

        comp.removeCmdClient();
        await comp.$nextTick(); // clear components

        // THEN
        expect(cmdClientServiceStub.delete.called).toBeTruthy();

        // THEN
        await comp.$nextTick(); // handle component clear watch
        expect(cmdClientServiceStub.retrieve.callCount).toEqual(1);
      });
    });
  });
});
