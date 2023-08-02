/* tslint:disable max-line-length */
import { vitest } from 'vitest';
import { shallowMount, MountingOptions } from '@vue/test-utils';
import sinon, { SinonStubbedInstance } from 'sinon';
import { RouteLocation } from 'vue-router';

import dayjs from 'dayjs';
import { DATE_TIME_LONG_FORMAT } from '../../../......mainwebappapp/shared/composables/date-format';
import MvtStckUpdate from '../../../......mainwebappapp/entities/mvt-stck/mvt-stck-update.vue';
import MvtStckService from '../../../......mainwebappapp/entities/mvt-stck/mvt-stck.service';
import AlertService from '../../../......mainwebappapp/shared/alert/alert.service';

import ArticleService from '../../../......mainwebappapp/entities/article/article.service';

type MvtStckUpdateComponentType = InstanceType<typeof MvtStckUpdate>;

let route: Partial<RouteLocation>;
const routerGoMock = vitest.fn();

vitest.mock('vue-router', () => ({
  useRoute: () => route,
  useRouter: () => ({ go: routerGoMock }),
}));

const mvtStckSample = { id: 123 };

describe('Component Tests', () => {
  let mountOptions: MountingOptions<MvtStckUpdateComponentType>['global'];
  let alertService: AlertService;

  describe('MvtStck Management Update Component', () => {
    let comp: MvtStckUpdateComponentType;
    let mvtStckServiceStub: SinonStubbedInstance<MvtStckService>;

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
          'b-input-group': true,
          'b-input-group-prepend': true,
          'b-form-datepicker': true,
          'b-form-input': true,
        },
        provide: {
          alertService,
          mvtStckService: () => mvtStckServiceStub,
          articleService: () =>
            sinon.createStubInstance<ArticleService>(ArticleService, {
              retrieve: sinon.stub().resolves({}),
            } as any),
        },
      };
    });

    afterEach(() => {
      vitest.resetAllMocks();
    });

    describe('load', () => {
      beforeEach(() => {
        const wrapper = shallowMount(MvtStckUpdate, { global: mountOptions });
        comp = wrapper.vm;
      });
      it('Should convert date from string', () => {
        // GIVEN
        const date = new Date('2019-10-15T11:42:02Z');

        // WHEN
        const convertedDate = comp.convertDateTimeFromServer(date);

        // THEN
        expect(convertedDate).toEqual(dayjs(date).format(DATE_TIME_LONG_FORMAT));
      });

      it('Should not convert date if date is not present', () => {
        expect(comp.convertDateTimeFromServer(null)).toBeNull();
      });
    });

    describe('save', () => {
      it('Should call update service on save for existing entity', async () => {
        // GIVEN
        const wrapper = shallowMount(MvtStckUpdate, { global: mountOptions });
        comp = wrapper.vm;
        comp.mvtStck = mvtStckSample;
        mvtStckServiceStub.update.resolves(mvtStckSample);

        // WHEN
        comp.save();
        await comp.$nextTick();

        // THEN
        expect(mvtStckServiceStub.update.calledWith(mvtStckSample)).toBeTruthy();
        expect(comp.isSaving).toEqual(false);
      });

      it('Should call create service on save for new entity', async () => {
        // GIVEN
        const entity = {};
        mvtStckServiceStub.create.resolves(entity);
        const wrapper = shallowMount(MvtStckUpdate, { global: mountOptions });
        comp = wrapper.vm;
        comp.mvtStck = entity;

        // WHEN
        comp.save();
        await comp.$nextTick();

        // THEN
        expect(mvtStckServiceStub.create.calledWith(entity)).toBeTruthy();
        expect(comp.isSaving).toEqual(false);
      });
    });

    describe('Before route enter', () => {
      it('Should retrieve data', async () => {
        // GIVEN
        mvtStckServiceStub.find.resolves(mvtStckSample);
        mvtStckServiceStub.retrieve.resolves([mvtStckSample]);

        // WHEN
        route = {
          params: {
            mvtStckId: '' + mvtStckSample.id,
          },
        };
        const wrapper = shallowMount(MvtStckUpdate, { global: mountOptions });
        comp = wrapper.vm;
        await comp.$nextTick();

        // THEN
        expect(comp.mvtStck).toMatchObject(mvtStckSample);
      });
    });

    describe('Previous state', () => {
      it('Should go previous state', async () => {
        mvtStckServiceStub.find.resolves(mvtStckSample);
        const wrapper = shallowMount(MvtStckUpdate, { global: mountOptions });
        comp = wrapper.vm;
        await comp.$nextTick();

        comp.previousState();
        await comp.$nextTick();

        expect(routerGoMock).toHaveBeenCalledWith(-1);
      });
    });
  });
});
