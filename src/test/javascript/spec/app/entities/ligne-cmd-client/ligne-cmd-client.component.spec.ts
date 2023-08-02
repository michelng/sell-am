/* tslint:disable max-line-length */
import { vitest } from 'vitest';
import { shallowMount, MountingOptions } from '@vue/test-utils';
import sinon, { SinonStubbedInstance } from 'sinon';

import LigneCmdClient from '../../../......mainwebappapp/entities/ligne-cmd-client/ligne-cmd-client.vue';
import LigneCmdClientService from '../../../......mainwebappapp/entities/ligne-cmd-client/ligne-cmd-client.service';
import AlertService from '../../../......mainwebappapp/shared/alert/alert.service';

type LigneCmdClientComponentType = InstanceType<typeof LigneCmdClient>;

const bModalStub = {
  render: () => {},
  methods: {
    hide: () => {},
    show: () => {},
  },
};

describe('Component Tests', () => {
  let alertService: AlertService;

  describe('LigneCmdClient Management Component', () => {
    let ligneCmdClientServiceStub: SinonStubbedInstance<LigneCmdClientService>;
    let mountOptions: MountingOptions<LigneCmdClientComponentType>['global'];

    beforeEach(() => {
      ligneCmdClientServiceStub = sinon.createStubInstance<LigneCmdClientService>(LigneCmdClientService);
      ligneCmdClientServiceStub.retrieve.resolves({ headers: {} });

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
          ligneCmdClientService: () => ligneCmdClientServiceStub,
        },
      };
    });

    describe('Mount', () => {
      it('Should call load all on init', async () => {
        // GIVEN
        ligneCmdClientServiceStub.retrieve.resolves({ headers: {}, data: [{ id: 123 }] });

        // WHEN
        const wrapper = shallowMount(LigneCmdClient, { global: mountOptions });
        const comp = wrapper.vm;
        await comp.$nextTick();

        // THEN
        expect(ligneCmdClientServiceStub.retrieve.calledOnce).toBeTruthy();
        expect(comp.ligneCmdClients[0]).toEqual(expect.objectContaining({ id: 123 }));
      });
    });
    describe('Handles', () => {
      let comp: LigneCmdClientComponentType;

      beforeEach(async () => {
        const wrapper = shallowMount(LigneCmdClient, { global: mountOptions });
        comp = wrapper.vm;
        await comp.$nextTick();
        ligneCmdClientServiceStub.retrieve.reset();
        ligneCmdClientServiceStub.retrieve.resolves({ headers: {}, data: [] });
      });

      it('Should call delete service on confirmDelete', async () => {
        // GIVEN
        ligneCmdClientServiceStub.delete.resolves({});

        // WHEN
        comp.prepareRemove({ id: 123 });

        comp.removeLigneCmdClient();
        await comp.$nextTick(); // clear components

        // THEN
        expect(ligneCmdClientServiceStub.delete.called).toBeTruthy();

        // THEN
        await comp.$nextTick(); // handle component clear watch
        expect(ligneCmdClientServiceStub.retrieve.callCount).toEqual(1);
      });
    });
  });
});
