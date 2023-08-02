/* tslint:disable max-line-length */
import { vitest } from 'vitest';
import { shallowMount, MountingOptions } from '@vue/test-utils';
import sinon, { SinonStubbedInstance } from 'sinon';
import { RouteLocation } from 'vue-router';

import MvtStckDetails from '../../../......mainwebappapp/entities/mvt-stck/mvt-stck-details.vue';
import MvtStckService from '../../../......mainwebappapp/entities/mvt-stck/mvt-stck.service';
import AlertService from '../../../......mainwebappapp/shared/alert/alert.service';

type MvtStckDetailsComponentType = InstanceType<typeof MvtStckDetails>;

let route: Partial<RouteLocation>;
const routerGoMock = vitest.fn();

vitest.mock('vue-router', () => ({
  useRoute: () => route,
  useRouter: () => ({ go: routerGoMock }),
}));

const mvtStckSample = { id: 123 };

describe('Component Tests', () => {
  let alertService: AlertService;

  afterEach(() => {
    vitest.resetAllMocks();
  });

  describe('MvtStck Management Detail Component', () => {
    let mvtStckServiceStub: SinonStubbedInstance<MvtStckService>;
    let mountOptions: MountingOptions<MvtStckDetailsComponentType>['global'];

    beforeEach(() => {
      route = {};
      mvtStckServiceStub = sinon.createStubInstance<MvtStckService>(MvtStckService);

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
          mvtStckService: () => mvtStckServiceStub,
        },
      };
    });

    describe('Navigate to details', () => {
      it('Should call load all on init', async () => {
        // GIVEN
        mvtStckServiceStub.find.resolves(mvtStckSample);
        route = {
          params: {
            mvtStckId: '' + 123,
          },
        };
        const wrapper = shallowMount(MvtStckDetails, { global: mountOptions });
        const comp = wrapper.vm;
        // WHEN
        await comp.$nextTick();

        // THEN
        expect(comp.mvtStck).toMatchObject(mvtStckSample);
      });
    });

    describe('Previous state', () => {
      it('Should go previous state', async () => {
        mvtStckServiceStub.find.resolves(mvtStckSample);
        const wrapper = shallowMount(MvtStckDetails, { global: mountOptions });
        const comp = wrapper.vm;
        await comp.$nextTick();

        comp.previousState();
        await comp.$nextTick();

        expect(routerGoMock).toHaveBeenCalledWith(-1);
      });
    });
  });
});
