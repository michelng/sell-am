/* tslint:disable max-line-length */
import { vitest } from 'vitest';
import { shallowMount, MountingOptions } from '@vue/test-utils';
import sinon, { SinonStubbedInstance } from 'sinon';

import LigneCmdFournisseur from '../../../......mainwebappapp/entities/ligne-cmd-fournisseur/ligne-cmd-fournisseur.vue';
import LigneCmdFournisseurService from '../../../......mainwebappapp/entities/ligne-cmd-fournisseur/ligne-cmd-fournisseur.service';
import AlertService from '../../../......mainwebappapp/shared/alert/alert.service';

type LigneCmdFournisseurComponentType = InstanceType<typeof LigneCmdFournisseur>;

const bModalStub = {
  render: () => {},
  methods: {
    hide: () => {},
    show: () => {},
  },
};

describe('Component Tests', () => {
  let alertService: AlertService;

  describe('LigneCmdFournisseur Management Component', () => {
    let ligneCmdFournisseurServiceStub: SinonStubbedInstance<LigneCmdFournisseurService>;
    let mountOptions: MountingOptions<LigneCmdFournisseurComponentType>['global'];

    beforeEach(() => {
      ligneCmdFournisseurServiceStub = sinon.createStubInstance<LigneCmdFournisseurService>(LigneCmdFournisseurService);
      ligneCmdFournisseurServiceStub.retrieve.resolves({ headers: {} });

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
          ligneCmdFournisseurService: () => ligneCmdFournisseurServiceStub,
        },
      };
    });

    describe('Mount', () => {
      it('Should call load all on init', async () => {
        // GIVEN
        ligneCmdFournisseurServiceStub.retrieve.resolves({ headers: {}, data: [{ id: 123 }] });

        // WHEN
        const wrapper = shallowMount(LigneCmdFournisseur, { global: mountOptions });
        const comp = wrapper.vm;
        await comp.$nextTick();

        // THEN
        expect(ligneCmdFournisseurServiceStub.retrieve.calledOnce).toBeTruthy();
        expect(comp.ligneCmdFournisseurs[0]).toEqual(expect.objectContaining({ id: 123 }));
      });
    });
    describe('Handles', () => {
      let comp: LigneCmdFournisseurComponentType;

      beforeEach(async () => {
        const wrapper = shallowMount(LigneCmdFournisseur, { global: mountOptions });
        comp = wrapper.vm;
        await comp.$nextTick();
        ligneCmdFournisseurServiceStub.retrieve.reset();
        ligneCmdFournisseurServiceStub.retrieve.resolves({ headers: {}, data: [] });
      });

      it('Should call delete service on confirmDelete', async () => {
        // GIVEN
        ligneCmdFournisseurServiceStub.delete.resolves({});

        // WHEN
        comp.prepareRemove({ id: 123 });

        comp.removeLigneCmdFournisseur();
        await comp.$nextTick(); // clear components

        // THEN
        expect(ligneCmdFournisseurServiceStub.delete.called).toBeTruthy();

        // THEN
        await comp.$nextTick(); // handle component clear watch
        expect(ligneCmdFournisseurServiceStub.retrieve.callCount).toEqual(1);
      });
    });
  });
});
