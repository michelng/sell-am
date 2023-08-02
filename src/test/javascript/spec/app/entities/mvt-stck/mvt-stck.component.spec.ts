/* tslint:disable max-line-length */
import { vitest } from 'vitest';
import { shallowMount, MountingOptions } from '@vue/test-utils';
import sinon, { SinonStubbedInstance } from 'sinon';

import MvtStck from '../../../......mainwebappapp/entities/mvt-stck/mvt-stck.vue';
import MvtStckService from '../../../......mainwebappapp/entities/mvt-stck/mvt-stck.service';
import AlertService from '../../../......mainwebappapp/shared/alert/alert.service';

type MvtStckComponentType = InstanceType<typeof MvtStck>;

const bModalStub = {
  render: () => {},
  methods: {
    hide: () => {},
    show: () => {},
  },
};

describe('Component Tests', () => {
  let alertService: AlertService;

  describe('MvtStck Management Component', () => {
    let mvtStckServiceStub: SinonStubbedInstance<MvtStckService>;
    let mountOptions: MountingOptions<MvtStckComponentType>['global'];

    beforeEach(() => {
      mvtStckServiceStub = sinon.createStubInstance<MvtStckService>(MvtStckService);
      mvtStckServiceStub.retrieve.resolves({ headers: {} });

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
          mvtStckService: () => mvtStckServiceStub,
        },
      };
    });

    describe('Mount', () => {
      it('Should call load all on init', async () => {
        // GIVEN
        mvtStckServiceStub.retrieve.resolves({ headers: {}, data: [{ id: 123 }] });

        // WHEN
        const wrapper = shallowMount(MvtStck, { global: mountOptions });
        const comp = wrapper.vm;
        await comp.$nextTick();

        // THEN
        expect(mvtStckServiceStub.retrieve.calledOnce).toBeTruthy();
        expect(comp.mvtStcks[0]).toEqual(expect.objectContaining({ id: 123 }));
      });
    });
    describe('Handles', () => {
      let comp: MvtStckComponentType;

      beforeEach(async () => {
        const wrapper = shallowMount(MvtStck, { global: mountOptions });
        comp = wrapper.vm;
        await comp.$nextTick();
        mvtStckServiceStub.retrieve.reset();
        mvtStckServiceStub.retrieve.resolves({ headers: {}, data: [] });
      });

      it('Should call delete service on confirmDelete', async () => {
        // GIVEN
        mvtStckServiceStub.delete.resolves({});

        // WHEN
        comp.prepareRemove({ id: 123 });

        comp.removeMvtStck();
        await comp.$nextTick(); // clear components

        // THEN
        expect(mvtStckServiceStub.delete.called).toBeTruthy();

        // THEN
        await comp.$nextTick(); // handle component clear watch
        expect(mvtStckServiceStub.retrieve.callCount).toEqual(1);
      });
    });
  });
});
