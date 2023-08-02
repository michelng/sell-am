/* tslint:disable max-line-length */
import { vitest } from 'vitest';
import { shallowMount, MountingOptions } from '@vue/test-utils';
import sinon, { SinonStubbedInstance } from 'sinon';

import CmdFournisseur from '../../../......mainwebappapp/entities/cmd-fournisseur/cmd-fournisseur.vue';
import CmdFournisseurService from '../../../......mainwebappapp/entities/cmd-fournisseur/cmd-fournisseur.service';
import AlertService from '../../../......mainwebappapp/shared/alert/alert.service';

type CmdFournisseurComponentType = InstanceType<typeof CmdFournisseur>;

const bModalStub = {
  render: () => {},
  methods: {
    hide: () => {},
    show: () => {},
  },
};

describe('Component Tests', () => {
  let alertService: AlertService;

  describe('CmdFournisseur Management Component', () => {
    let cmdFournisseurServiceStub: SinonStubbedInstance<CmdFournisseurService>;
    let mountOptions: MountingOptions<CmdFournisseurComponentType>['global'];

    beforeEach(() => {
      cmdFournisseurServiceStub = sinon.createStubInstance<CmdFournisseurService>(CmdFournisseurService);
      cmdFournisseurServiceStub.retrieve.resolves({ headers: {} });

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
          cmdFournisseurService: () => cmdFournisseurServiceStub,
        },
      };
    });

    describe('Mount', () => {
      it('Should call load all on init', async () => {
        // GIVEN
        cmdFournisseurServiceStub.retrieve.resolves({ headers: {}, data: [{ id: 123 }] });

        // WHEN
        const wrapper = shallowMount(CmdFournisseur, { global: mountOptions });
        const comp = wrapper.vm;
        await comp.$nextTick();

        // THEN
        expect(cmdFournisseurServiceStub.retrieve.calledOnce).toBeTruthy();
        expect(comp.cmdFournisseurs[0]).toEqual(expect.objectContaining({ id: 123 }));
      });
    });
    describe('Handles', () => {
      let comp: CmdFournisseurComponentType;

      beforeEach(async () => {
        const wrapper = shallowMount(CmdFournisseur, { global: mountOptions });
        comp = wrapper.vm;
        await comp.$nextTick();
        cmdFournisseurServiceStub.retrieve.reset();
        cmdFournisseurServiceStub.retrieve.resolves({ headers: {}, data: [] });
      });

      it('Should call delete service on confirmDelete', async () => {
        // GIVEN
        cmdFournisseurServiceStub.delete.resolves({});

        // WHEN
        comp.prepareRemove({ id: 123 });

        comp.removeCmdFournisseur();
        await comp.$nextTick(); // clear components

        // THEN
        expect(cmdFournisseurServiceStub.delete.called).toBeTruthy();

        // THEN
        await comp.$nextTick(); // handle component clear watch
        expect(cmdFournisseurServiceStub.retrieve.callCount).toEqual(1);
      });
    });
  });
});
