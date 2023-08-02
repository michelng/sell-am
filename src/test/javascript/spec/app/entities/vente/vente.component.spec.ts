/* tslint:disable max-line-length */
import { vitest } from 'vitest';
import { shallowMount, MountingOptions } from '@vue/test-utils';
import sinon, { SinonStubbedInstance } from 'sinon';

import Vente from '../../../......mainwebappapp/entities/vente/vente.vue';
import VenteService from '../../../......mainwebappapp/entities/vente/vente.service';
import AlertService from '../../../......mainwebappapp/shared/alert/alert.service';

type VenteComponentType = InstanceType<typeof Vente>;

const bModalStub = {
  render: () => {},
  methods: {
    hide: () => {},
    show: () => {},
  },
};

describe('Component Tests', () => {
  let alertService: AlertService;

  describe('Vente Management Component', () => {
    let venteServiceStub: SinonStubbedInstance<VenteService>;
    let mountOptions: MountingOptions<VenteComponentType>['global'];

    beforeEach(() => {
      venteServiceStub = sinon.createStubInstance<VenteService>(VenteService);
      venteServiceStub.retrieve.resolves({ headers: {} });

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
          venteService: () => venteServiceStub,
        },
      };
    });

    describe('Mount', () => {
      it('Should call load all on init', async () => {
        // GIVEN
        venteServiceStub.retrieve.resolves({ headers: {}, data: [{ id: 123 }] });

        // WHEN
        const wrapper = shallowMount(Vente, { global: mountOptions });
        const comp = wrapper.vm;
        await comp.$nextTick();

        // THEN
        expect(venteServiceStub.retrieve.calledOnce).toBeTruthy();
        expect(comp.ventes[0]).toEqual(expect.objectContaining({ id: 123 }));
      });
    });
    describe('Handles', () => {
      let comp: VenteComponentType;

      beforeEach(async () => {
        const wrapper = shallowMount(Vente, { global: mountOptions });
        comp = wrapper.vm;
        await comp.$nextTick();
        venteServiceStub.retrieve.reset();
        venteServiceStub.retrieve.resolves({ headers: {}, data: [] });
      });

      it('Should call delete service on confirmDelete', async () => {
        // GIVEN
        venteServiceStub.delete.resolves({});

        // WHEN
        comp.prepareRemove({ id: 123 });

        comp.removeVente();
        await comp.$nextTick(); // clear components

        // THEN
        expect(venteServiceStub.delete.called).toBeTruthy();

        // THEN
        await comp.$nextTick(); // handle component clear watch
        expect(venteServiceStub.retrieve.callCount).toEqual(1);
      });
    });
  });
});
