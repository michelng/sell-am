/* tslint:disable max-line-length */
import { vitest } from 'vitest';
import { shallowMount, MountingOptions } from '@vue/test-utils';
import sinon, { SinonStubbedInstance } from 'sinon';

import Facture from '../../../......mainwebappapp/entities/facture/facture.vue';
import FactureService from '../../../......mainwebappapp/entities/facture/facture.service';
import AlertService from '../../../......mainwebappapp/shared/alert/alert.service';

type FactureComponentType = InstanceType<typeof Facture>;

const bModalStub = {
  render: () => {},
  methods: {
    hide: () => {},
    show: () => {},
  },
};

describe('Component Tests', () => {
  let alertService: AlertService;

  describe('Facture Management Component', () => {
    let factureServiceStub: SinonStubbedInstance<FactureService>;
    let mountOptions: MountingOptions<FactureComponentType>['global'];

    beforeEach(() => {
      factureServiceStub = sinon.createStubInstance<FactureService>(FactureService);
      factureServiceStub.retrieve.resolves({ headers: {} });

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
          factureService: () => factureServiceStub,
        },
      };
    });

    describe('Mount', () => {
      it('Should call load all on init', async () => {
        // GIVEN
        factureServiceStub.retrieve.resolves({ headers: {}, data: [{ id: 123 }] });

        // WHEN
        const wrapper = shallowMount(Facture, { global: mountOptions });
        const comp = wrapper.vm;
        await comp.$nextTick();

        // THEN
        expect(factureServiceStub.retrieve.calledOnce).toBeTruthy();
        expect(comp.factures[0]).toEqual(expect.objectContaining({ id: 123 }));
      });
    });
    describe('Handles', () => {
      let comp: FactureComponentType;

      beforeEach(async () => {
        const wrapper = shallowMount(Facture, { global: mountOptions });
        comp = wrapper.vm;
        await comp.$nextTick();
        factureServiceStub.retrieve.reset();
        factureServiceStub.retrieve.resolves({ headers: {}, data: [] });
      });

      it('Should call delete service on confirmDelete', async () => {
        // GIVEN
        factureServiceStub.delete.resolves({});

        // WHEN
        comp.prepareRemove({ id: 123 });

        comp.removeFacture();
        await comp.$nextTick(); // clear components

        // THEN
        expect(factureServiceStub.delete.called).toBeTruthy();

        // THEN
        await comp.$nextTick(); // handle component clear watch
        expect(factureServiceStub.retrieve.callCount).toEqual(1);
      });
    });
  });
});
