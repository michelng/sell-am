/* tslint:disable max-line-length */
import { vitest } from 'vitest';
import { shallowMount, MountingOptions } from '@vue/test-utils';
import sinon, { SinonStubbedInstance } from 'sinon';

import LigneVente from '../../../......mainwebappapp/entities/ligne-vente/ligne-vente.vue';
import LigneVenteService from '../../../......mainwebappapp/entities/ligne-vente/ligne-vente.service';
import AlertService from '../../../......mainwebappapp/shared/alert/alert.service';

type LigneVenteComponentType = InstanceType<typeof LigneVente>;

const bModalStub = {
  render: () => {},
  methods: {
    hide: () => {},
    show: () => {},
  },
};

describe('Component Tests', () => {
  let alertService: AlertService;

  describe('LigneVente Management Component', () => {
    let ligneVenteServiceStub: SinonStubbedInstance<LigneVenteService>;
    let mountOptions: MountingOptions<LigneVenteComponentType>['global'];

    beforeEach(() => {
      ligneVenteServiceStub = sinon.createStubInstance<LigneVenteService>(LigneVenteService);
      ligneVenteServiceStub.retrieve.resolves({ headers: {} });

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
          ligneVenteService: () => ligneVenteServiceStub,
        },
      };
    });

    describe('Mount', () => {
      it('Should call load all on init', async () => {
        // GIVEN
        ligneVenteServiceStub.retrieve.resolves({ headers: {}, data: [{ id: 123 }] });

        // WHEN
        const wrapper = shallowMount(LigneVente, { global: mountOptions });
        const comp = wrapper.vm;
        await comp.$nextTick();

        // THEN
        expect(ligneVenteServiceStub.retrieve.calledOnce).toBeTruthy();
        expect(comp.ligneVentes[0]).toEqual(expect.objectContaining({ id: 123 }));
      });
    });
    describe('Handles', () => {
      let comp: LigneVenteComponentType;

      beforeEach(async () => {
        const wrapper = shallowMount(LigneVente, { global: mountOptions });
        comp = wrapper.vm;
        await comp.$nextTick();
        ligneVenteServiceStub.retrieve.reset();
        ligneVenteServiceStub.retrieve.resolves({ headers: {}, data: [] });
      });

      it('Should call delete service on confirmDelete', async () => {
        // GIVEN
        ligneVenteServiceStub.delete.resolves({});

        // WHEN
        comp.prepareRemove({ id: 123 });

        comp.removeLigneVente();
        await comp.$nextTick(); // clear components

        // THEN
        expect(ligneVenteServiceStub.delete.called).toBeTruthy();

        // THEN
        await comp.$nextTick(); // handle component clear watch
        expect(ligneVenteServiceStub.retrieve.callCount).toEqual(1);
      });
    });
  });
});
