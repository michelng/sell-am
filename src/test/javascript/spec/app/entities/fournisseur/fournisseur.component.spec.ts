/* tslint:disable max-line-length */
import { vitest } from 'vitest';
import { shallowMount, MountingOptions } from '@vue/test-utils';
import sinon, { SinonStubbedInstance } from 'sinon';

import Fournisseur from '../../../......mainwebappapp/entities/fournisseur/fournisseur.vue';
import FournisseurService from '../../../......mainwebappapp/entities/fournisseur/fournisseur.service';
import AlertService from '../../../......mainwebappapp/shared/alert/alert.service';

type FournisseurComponentType = InstanceType<typeof Fournisseur>;

const bModalStub = {
  render: () => {},
  methods: {
    hide: () => {},
    show: () => {},
  },
};

describe('Component Tests', () => {
  let alertService: AlertService;

  describe('Fournisseur Management Component', () => {
    let fournisseurServiceStub: SinonStubbedInstance<FournisseurService>;
    let mountOptions: MountingOptions<FournisseurComponentType>['global'];

    beforeEach(() => {
      fournisseurServiceStub = sinon.createStubInstance<FournisseurService>(FournisseurService);
      fournisseurServiceStub.retrieve.resolves({ headers: {} });

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
          fournisseurService: () => fournisseurServiceStub,
        },
      };
    });

    describe('Mount', () => {
      it('Should call load all on init', async () => {
        // GIVEN
        fournisseurServiceStub.retrieve.resolves({ headers: {}, data: [{ id: 123 }] });

        // WHEN
        const wrapper = shallowMount(Fournisseur, { global: mountOptions });
        const comp = wrapper.vm;
        await comp.$nextTick();

        // THEN
        expect(fournisseurServiceStub.retrieve.calledOnce).toBeTruthy();
        expect(comp.fournisseurs[0]).toEqual(expect.objectContaining({ id: 123 }));
      });
    });
    describe('Handles', () => {
      let comp: FournisseurComponentType;

      beforeEach(async () => {
        const wrapper = shallowMount(Fournisseur, { global: mountOptions });
        comp = wrapper.vm;
        await comp.$nextTick();
        fournisseurServiceStub.retrieve.reset();
        fournisseurServiceStub.retrieve.resolves({ headers: {}, data: [] });
      });

      it('Should call delete service on confirmDelete', async () => {
        // GIVEN
        fournisseurServiceStub.delete.resolves({});

        // WHEN
        comp.prepareRemove({ id: 123 });

        comp.removeFournisseur();
        await comp.$nextTick(); // clear components

        // THEN
        expect(fournisseurServiceStub.delete.called).toBeTruthy();

        // THEN
        await comp.$nextTick(); // handle component clear watch
        expect(fournisseurServiceStub.retrieve.callCount).toEqual(1);
      });
    });
  });
});
