/* tslint:disable max-line-length */
import { vitest } from 'vitest';
import { shallowMount, MountingOptions } from '@vue/test-utils';
import sinon, { SinonStubbedInstance } from 'sinon';
import { RouteLocation } from 'vue-router';

import dayjs from 'dayjs';
import { DATE_TIME_LONG_FORMAT } from '../../../......mainwebappapp/shared/composables/date-format';
import LigneCmdClientUpdate from '../../../......mainwebappapp/entities/ligne-cmd-client/ligne-cmd-client-update.vue';
import LigneCmdClientService from '../../../......mainwebappapp/entities/ligne-cmd-client/ligne-cmd-client.service';
import AlertService from '../../../......mainwebappapp/shared/alert/alert.service';

import CmdClientService from '../../../......mainwebappapp/entities/cmd-client/cmd-client.service';
import ArticleService from '../../../......mainwebappapp/entities/article/article.service';

type LigneCmdClientUpdateComponentType = InstanceType<typeof LigneCmdClientUpdate>;

let route: Partial<RouteLocation>;
const routerGoMock = vitest.fn();

vitest.mock('vue-router', () => ({
  useRoute: () => route,
  useRouter: () => ({ go: routerGoMock }),
}));

const ligneCmdClientSample = { id: 123 };

describe('Component Tests', () => {
  let mountOptions: MountingOptions<LigneCmdClientUpdateComponentType>['global'];
  let alertService: AlertService;

  describe('LigneCmdClient Management Update Component', () => {
    let comp: LigneCmdClientUpdateComponentType;
    let ligneCmdClientServiceStub: SinonStubbedInstance<LigneCmdClientService>;

    beforeEach(() => {
      route = {};
      ligneCmdClientServiceStub = sinon.createStubInstance<LigneCmdClientService>(LigneCmdClientService);

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
          ligneCmdClientService: () => ligneCmdClientServiceStub,
          cmdClientService: () =>
            sinon.createStubInstance<CmdClientService>(CmdClientService, {
              retrieve: sinon.stub().resolves({}),
            } as any),
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
        const wrapper = shallowMount(LigneCmdClientUpdate, { global: mountOptions });
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
        const wrapper = shallowMount(LigneCmdClientUpdate, { global: mountOptions });
        comp = wrapper.vm;
        comp.ligneCmdClient = ligneCmdClientSample;
        ligneCmdClientServiceStub.update.resolves(ligneCmdClientSample);

        // WHEN
        comp.save();
        await comp.$nextTick();

        // THEN
        expect(ligneCmdClientServiceStub.update.calledWith(ligneCmdClientSample)).toBeTruthy();
        expect(comp.isSaving).toEqual(false);
      });

      it('Should call create service on save for new entity', async () => {
        // GIVEN
        const entity = {};
        ligneCmdClientServiceStub.create.resolves(entity);
        const wrapper = shallowMount(LigneCmdClientUpdate, { global: mountOptions });
        comp = wrapper.vm;
        comp.ligneCmdClient = entity;

        // WHEN
        comp.save();
        await comp.$nextTick();

        // THEN
        expect(ligneCmdClientServiceStub.create.calledWith(entity)).toBeTruthy();
        expect(comp.isSaving).toEqual(false);
      });
    });

    describe('Before route enter', () => {
      it('Should retrieve data', async () => {
        // GIVEN
        ligneCmdClientServiceStub.find.resolves(ligneCmdClientSample);
        ligneCmdClientServiceStub.retrieve.resolves([ligneCmdClientSample]);

        // WHEN
        route = {
          params: {
            ligneCmdClientId: '' + ligneCmdClientSample.id,
          },
        };
        const wrapper = shallowMount(LigneCmdClientUpdate, { global: mountOptions });
        comp = wrapper.vm;
        await comp.$nextTick();

        // THEN
        expect(comp.ligneCmdClient).toMatchObject(ligneCmdClientSample);
      });
    });

    describe('Previous state', () => {
      it('Should go previous state', async () => {
        ligneCmdClientServiceStub.find.resolves(ligneCmdClientSample);
        const wrapper = shallowMount(LigneCmdClientUpdate, { global: mountOptions });
        comp = wrapper.vm;
        await comp.$nextTick();

        comp.previousState();
        await comp.$nextTick();

        expect(routerGoMock).toHaveBeenCalledWith(-1);
      });
    });
  });
});
