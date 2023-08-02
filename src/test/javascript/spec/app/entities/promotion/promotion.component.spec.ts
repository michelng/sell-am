/* tslint:disable max-line-length */
import { vitest } from 'vitest';
import { shallowMount, MountingOptions } from '@vue/test-utils';
import sinon, { SinonStubbedInstance } from 'sinon';

import Promotion from '../../../......mainwebappapp/entities/promotion/promotion.vue';
import PromotionService from '../../../......mainwebappapp/entities/promotion/promotion.service';
import AlertService from '../../../......mainwebappapp/shared/alert/alert.service';

type PromotionComponentType = InstanceType<typeof Promotion>;

const bModalStub = {
  render: () => {},
  methods: {
    hide: () => {},
    show: () => {},
  },
};

describe('Component Tests', () => {
  let alertService: AlertService;

  describe('Promotion Management Component', () => {
    let promotionServiceStub: SinonStubbedInstance<PromotionService>;
    let mountOptions: MountingOptions<PromotionComponentType>['global'];

    beforeEach(() => {
      promotionServiceStub = sinon.createStubInstance<PromotionService>(PromotionService);
      promotionServiceStub.retrieve.resolves({ headers: {} });

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
          promotionService: () => promotionServiceStub,
        },
      };
    });

    describe('Mount', () => {
      it('Should call load all on init', async () => {
        // GIVEN
        promotionServiceStub.retrieve.resolves({ headers: {}, data: [{ id: 123 }] });

        // WHEN
        const wrapper = shallowMount(Promotion, { global: mountOptions });
        const comp = wrapper.vm;
        await comp.$nextTick();

        // THEN
        expect(promotionServiceStub.retrieve.calledOnce).toBeTruthy();
        expect(comp.promotions[0]).toEqual(expect.objectContaining({ id: 123 }));
      });
    });
    describe('Handles', () => {
      let comp: PromotionComponentType;

      beforeEach(async () => {
        const wrapper = shallowMount(Promotion, { global: mountOptions });
        comp = wrapper.vm;
        await comp.$nextTick();
        promotionServiceStub.retrieve.reset();
        promotionServiceStub.retrieve.resolves({ headers: {}, data: [] });
      });

      it('Should call delete service on confirmDelete', async () => {
        // GIVEN
        promotionServiceStub.delete.resolves({});

        // WHEN
        comp.prepareRemove({ id: 123 });

        comp.removePromotion();
        await comp.$nextTick(); // clear components

        // THEN
        expect(promotionServiceStub.delete.called).toBeTruthy();

        // THEN
        await comp.$nextTick(); // handle component clear watch
        expect(promotionServiceStub.retrieve.callCount).toEqual(1);
      });
    });
  });
});
