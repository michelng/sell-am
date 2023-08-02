/* tslint:disable max-line-length */
import { vitest } from 'vitest';
import { shallowMount, MountingOptions } from '@vue/test-utils';
import sinon, { SinonStubbedInstance } from 'sinon';
import { RouteLocation } from 'vue-router';

import DiscountUpdate from '../../../......mainwebappapp/entities/discount/discount-update.vue';
import DiscountService from '../../../......mainwebappapp/entities/discount/discount.service';
import AlertService from '../../../......mainwebappapp/shared/alert/alert.service';

type DiscountUpdateComponentType = InstanceType<typeof DiscountUpdate>;

let route: Partial<RouteLocation>;
const routerGoMock = vitest.fn();

vitest.mock('vue-router', () => ({
  useRoute: () => route,
  useRouter: () => ({ go: routerGoMock }),
}));

const discountSample = { id: 123 };

describe('Component Tests', () => {
  let mountOptions: MountingOptions<DiscountUpdateComponentType>['global'];
  let alertService: AlertService;

  describe('Discount Management Update Component', () => {
    let comp: DiscountUpdateComponentType;
    let discountServiceStub: SinonStubbedInstance<DiscountService>;

    beforeEach(() => {
      route = {};
      discountServiceStub = sinon.createStubInstance<DiscountService>(DiscountService);

      alertService = new AlertService({
        i18n: { t: vitest.fn() } as any,
        bvToast: {
          toast: vitest.fn(),
        } as any,
      });

      mountOptions = {
        stubs: {
          'font-awesome-icon': true,
          'b-input-group': true,
          'b-input-group-prepend': true,
          'b-form-datepicker': true,
          'b-form-input': true,
        },
        provide: {
          alertService,
          discountService: () => discountServiceStub,
        },
      };
    });

    afterEach(() => {
      vitest.resetAllMocks();
    });

    describe('save', () => {
      it('Should call update service on save for existing entity', async () => {
        // GIVEN
        const wrapper = shallowMount(DiscountUpdate, { global: mountOptions });
        comp = wrapper.vm;
        comp.discount = discountSample;
        discountServiceStub.update.resolves(discountSample);

        // WHEN
        comp.save();
        await comp.$nextTick();

        // THEN
        expect(discountServiceStub.update.calledWith(discountSample)).toBeTruthy();
        expect(comp.isSaving).toEqual(false);
      });

      it('Should call create service on save for new entity', async () => {
        // GIVEN
        const entity = {};
        discountServiceStub.create.resolves(entity);
        const wrapper = shallowMount(DiscountUpdate, { global: mountOptions });
        comp = wrapper.vm;
        comp.discount = entity;

        // WHEN
        comp.save();
        await comp.$nextTick();

        // THEN
        expect(discountServiceStub.create.calledWith(entity)).toBeTruthy();
        expect(comp.isSaving).toEqual(false);
      });
    });

    describe('Before route enter', () => {
      it('Should retrieve data', async () => {
        // GIVEN
        discountServiceStub.find.resolves(discountSample);
        discountServiceStub.retrieve.resolves([discountSample]);

        // WHEN
        route = {
          params: {
            discountId: '' + discountSample.id,
          },
        };
        const wrapper = shallowMount(DiscountUpdate, { global: mountOptions });
        comp = wrapper.vm;
        await comp.$nextTick();

        // THEN
        expect(comp.discount).toMatchObject(discountSample);
      });
    });

    describe('Previous state', () => {
      it('Should go previous state', async () => {
        discountServiceStub.find.resolves(discountSample);
        const wrapper = shallowMount(DiscountUpdate, { global: mountOptions });
        comp = wrapper.vm;
        await comp.$nextTick();

        comp.previousState();
        await comp.$nextTick();

        expect(routerGoMock).toHaveBeenCalledWith(-1);
      });
    });
  });
});
