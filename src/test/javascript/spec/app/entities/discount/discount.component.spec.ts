/* tslint:disable max-line-length */
import { vitest } from 'vitest';
import { shallowMount, MountingOptions } from '@vue/test-utils';
import sinon, { SinonStubbedInstance } from 'sinon';

import Discount from '../../../......mainwebappapp/entities/discount/discount.vue';
import DiscountService from '../../../......mainwebappapp/entities/discount/discount.service';
import AlertService from '../../../......mainwebappapp/shared/alert/alert.service';

type DiscountComponentType = InstanceType<typeof Discount>;

const bModalStub = {
  render: () => {},
  methods: {
    hide: () => {},
    show: () => {},
  },
};

describe('Component Tests', () => {
  let alertService: AlertService;

  describe('Discount Management Component', () => {
    let discountServiceStub: SinonStubbedInstance<DiscountService>;
    let mountOptions: MountingOptions<DiscountComponentType>['global'];

    beforeEach(() => {
      discountServiceStub = sinon.createStubInstance<DiscountService>(DiscountService);
      discountServiceStub.retrieve.resolves({ headers: {} });

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
          discountService: () => discountServiceStub,
        },
      };
    });

    describe('Mount', () => {
      it('Should call load all on init', async () => {
        // GIVEN
        discountServiceStub.retrieve.resolves({ headers: {}, data: [{ id: 123 }] });

        // WHEN
        const wrapper = shallowMount(Discount, { global: mountOptions });
        const comp = wrapper.vm;
        await comp.$nextTick();

        // THEN
        expect(discountServiceStub.retrieve.calledOnce).toBeTruthy();
        expect(comp.discounts[0]).toEqual(expect.objectContaining({ id: 123 }));
      });
    });
    describe('Handles', () => {
      let comp: DiscountComponentType;

      beforeEach(async () => {
        const wrapper = shallowMount(Discount, { global: mountOptions });
        comp = wrapper.vm;
        await comp.$nextTick();
        discountServiceStub.retrieve.reset();
        discountServiceStub.retrieve.resolves({ headers: {}, data: [] });
      });

      it('Should call delete service on confirmDelete', async () => {
        // GIVEN
        discountServiceStub.delete.resolves({});

        // WHEN
        comp.prepareRemove({ id: 123 });

        comp.removeDiscount();
        await comp.$nextTick(); // clear components

        // THEN
        expect(discountServiceStub.delete.called).toBeTruthy();

        // THEN
        await comp.$nextTick(); // handle component clear watch
        expect(discountServiceStub.retrieve.callCount).toEqual(1);
      });
    });
  });
});
