/* tslint:disable max-line-length */
import { vitest } from 'vitest';
import { shallowMount, MountingOptions } from '@vue/test-utils';
import sinon, { SinonStubbedInstance } from 'sinon';
import { RouteLocation } from 'vue-router';

import DiscountDetails from '../../../......mainwebappapp/entities/discount/discount-details.vue';
import DiscountService from '../../../......mainwebappapp/entities/discount/discount.service';
import AlertService from '../../../......mainwebappapp/shared/alert/alert.service';

type DiscountDetailsComponentType = InstanceType<typeof DiscountDetails>;

let route: Partial<RouteLocation>;
const routerGoMock = vitest.fn();

vitest.mock('vue-router', () => ({
  useRoute: () => route,
  useRouter: () => ({ go: routerGoMock }),
}));

const discountSample = { id: 123 };

describe('Component Tests', () => {
  let alertService: AlertService;

  afterEach(() => {
    vitest.resetAllMocks();
  });

  describe('Discount Management Detail Component', () => {
    let discountServiceStub: SinonStubbedInstance<DiscountService>;
    let mountOptions: MountingOptions<DiscountDetailsComponentType>['global'];

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
          'router-link': true,
        },
        provide: {
          alertService,
          discountService: () => discountServiceStub,
        },
      };
    });

    describe('Navigate to details', () => {
      it('Should call load all on init', async () => {
        // GIVEN
        discountServiceStub.find.resolves(discountSample);
        route = {
          params: {
            discountId: '' + 123,
          },
        };
        const wrapper = shallowMount(DiscountDetails, { global: mountOptions });
        const comp = wrapper.vm;
        // WHEN
        await comp.$nextTick();

        // THEN
        expect(comp.discount).toMatchObject(discountSample);
      });
    });

    describe('Previous state', () => {
      it('Should go previous state', async () => {
        discountServiceStub.find.resolves(discountSample);
        const wrapper = shallowMount(DiscountDetails, { global: mountOptions });
        const comp = wrapper.vm;
        await comp.$nextTick();

        comp.previousState();
        await comp.$nextTick();

        expect(routerGoMock).toHaveBeenCalledWith(-1);
      });
    });
  });
});
