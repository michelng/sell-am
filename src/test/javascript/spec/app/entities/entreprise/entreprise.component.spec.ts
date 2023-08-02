/* tslint:disable max-line-length */
import { vitest } from 'vitest';
import { shallowMount, MountingOptions } from '@vue/test-utils';
import sinon, { SinonStubbedInstance } from 'sinon';

import Entreprise from '../../../......mainwebappapp/entities/entreprise/entreprise.vue';
import EntrepriseService from '../../../......mainwebappapp/entities/entreprise/entreprise.service';
import AlertService from '../../../......mainwebappapp/shared/alert/alert.service';

type EntrepriseComponentType = InstanceType<typeof Entreprise>;

const bModalStub = {
  render: () => {},
  methods: {
    hide: () => {},
    show: () => {},
  },
};

describe('Component Tests', () => {
  let alertService: AlertService;

  describe('Entreprise Management Component', () => {
    let entrepriseServiceStub: SinonStubbedInstance<EntrepriseService>;
    let mountOptions: MountingOptions<EntrepriseComponentType>['global'];

    beforeEach(() => {
      entrepriseServiceStub = sinon.createStubInstance<EntrepriseService>(EntrepriseService);
      entrepriseServiceStub.retrieve.resolves({ headers: {} });

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
          entrepriseService: () => entrepriseServiceStub,
        },
      };
    });

    describe('Mount', () => {
      it('Should call load all on init', async () => {
        // GIVEN
        entrepriseServiceStub.retrieve.resolves({ headers: {}, data: [{ id: 123 }] });

        // WHEN
        const wrapper = shallowMount(Entreprise, { global: mountOptions });
        const comp = wrapper.vm;
        await comp.$nextTick();

        // THEN
        expect(entrepriseServiceStub.retrieve.calledOnce).toBeTruthy();
        expect(comp.entreprises[0]).toEqual(expect.objectContaining({ id: 123 }));
      });
    });
    describe('Handles', () => {
      let comp: EntrepriseComponentType;

      beforeEach(async () => {
        const wrapper = shallowMount(Entreprise, { global: mountOptions });
        comp = wrapper.vm;
        await comp.$nextTick();
        entrepriseServiceStub.retrieve.reset();
        entrepriseServiceStub.retrieve.resolves({ headers: {}, data: [] });
      });

      it('Should call delete service on confirmDelete', async () => {
        // GIVEN
        entrepriseServiceStub.delete.resolves({});

        // WHEN
        comp.prepareRemove({ id: 123 });

        comp.removeEntreprise();
        await comp.$nextTick(); // clear components

        // THEN
        expect(entrepriseServiceStub.delete.called).toBeTruthy();

        // THEN
        await comp.$nextTick(); // handle component clear watch
        expect(entrepriseServiceStub.retrieve.callCount).toEqual(1);
      });
    });
  });
});
