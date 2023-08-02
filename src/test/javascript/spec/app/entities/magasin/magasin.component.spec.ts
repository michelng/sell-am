/* tslint:disable max-line-length */
import { vitest } from 'vitest';
import { shallowMount, MountingOptions } from '@vue/test-utils';
import sinon, { SinonStubbedInstance } from 'sinon';

import Magasin from '../../../......mainwebappapp/entities/magasin/magasin.vue';
import MagasinService from '../../../......mainwebappapp/entities/magasin/magasin.service';
import AlertService from '../../../......mainwebappapp/shared/alert/alert.service';

type MagasinComponentType = InstanceType<typeof Magasin>;

const bModalStub = {
  render: () => {},
  methods: {
    hide: () => {},
    show: () => {},
  },
};

describe('Component Tests', () => {
  let alertService: AlertService;

  describe('Magasin Management Component', () => {
    let magasinServiceStub: SinonStubbedInstance<MagasinService>;
    let mountOptions: MountingOptions<MagasinComponentType>['global'];

    beforeEach(() => {
      magasinServiceStub = sinon.createStubInstance<MagasinService>(MagasinService);
      magasinServiceStub.retrieve.resolves({ headers: {} });

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
          magasinService: () => magasinServiceStub,
        },
      };
    });

    describe('Mount', () => {
      it('Should call load all on init', async () => {
        // GIVEN
        magasinServiceStub.retrieve.resolves({ headers: {}, data: [{ id: 123 }] });

        // WHEN
        const wrapper = shallowMount(Magasin, { global: mountOptions });
        const comp = wrapper.vm;
        await comp.$nextTick();

        // THEN
        expect(magasinServiceStub.retrieve.calledOnce).toBeTruthy();
        expect(comp.magasins[0]).toEqual(expect.objectContaining({ id: 123 }));
      });
    });
    describe('Handles', () => {
      let comp: MagasinComponentType;

      beforeEach(async () => {
        const wrapper = shallowMount(Magasin, { global: mountOptions });
        comp = wrapper.vm;
        await comp.$nextTick();
        magasinServiceStub.retrieve.reset();
        magasinServiceStub.retrieve.resolves({ headers: {}, data: [] });
      });

      it('Should call delete service on confirmDelete', async () => {
        // GIVEN
        magasinServiceStub.delete.resolves({});

        // WHEN
        comp.prepareRemove({ id: 123 });

        comp.removeMagasin();
        await comp.$nextTick(); // clear components

        // THEN
        expect(magasinServiceStub.delete.called).toBeTruthy();

        // THEN
        await comp.$nextTick(); // handle component clear watch
        expect(magasinServiceStub.retrieve.callCount).toEqual(1);
      });
    });
  });
});
