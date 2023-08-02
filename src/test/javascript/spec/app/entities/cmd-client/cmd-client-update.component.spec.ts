/* tslint:disable max-line-length */
import { vitest } from 'vitest';
import { shallowMount, MountingOptions } from '@vue/test-utils';
import sinon, { SinonStubbedInstance } from 'sinon';
import { RouteLocation } from 'vue-router';

import dayjs from 'dayjs';
import { DATE_TIME_LONG_FORMAT } from '../../../......mainwebappapp/shared/composables/date-format';
import CmdClientUpdate from '../../../......mainwebappapp/entities/cmd-client/cmd-client-update.vue';
import CmdClientService from '../../../......mainwebappapp/entities/cmd-client/cmd-client.service';
import AlertService from '../../../......mainwebappapp/shared/alert/alert.service';

import ClientService from '../../../......mainwebappapp/entities/client/client.service';

type CmdClientUpdateComponentType = InstanceType<typeof CmdClientUpdate>;

let route: Partial<RouteLocation>;
const routerGoMock = vitest.fn();

vitest.mock('vue-router', () => ({
  useRoute: () => route,
  useRouter: () => ({ go: routerGoMock }),
}));

const cmdClientSample = { id: 123 };

describe('Component Tests', () => {
  let mountOptions: MountingOptions<CmdClientUpdateComponentType>['global'];
  let alertService: AlertService;

  describe('CmdClient Management Update Component', () => {
    let comp: CmdClientUpdateComponentType;
    let cmdClientServiceStub: SinonStubbedInstance<CmdClientService>;

    beforeEach(() => {
      route = {};
      cmdClientServiceStub = sinon.createStubInstance<CmdClientService>(CmdClientService);

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
          cmdClientService: () => cmdClientServiceStub,
          clientService: () =>
            sinon.createStubInstance<ClientService>(ClientService, {
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
        const wrapper = shallowMount(CmdClientUpdate, { global: mountOptions });
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
        const wrapper = shallowMount(CmdClientUpdate, { global: mountOptions });
        comp = wrapper.vm;
        comp.cmdClient = cmdClientSample;
        cmdClientServiceStub.update.resolves(cmdClientSample);

        // WHEN
        comp.save();
        await comp.$nextTick();

        // THEN
        expect(cmdClientServiceStub.update.calledWith(cmdClientSample)).toBeTruthy();
        expect(comp.isSaving).toEqual(false);
      });

      it('Should call create service on save for new entity', async () => {
        // GIVEN
        const entity = {};
        cmdClientServiceStub.create.resolves(entity);
        const wrapper = shallowMount(CmdClientUpdate, { global: mountOptions });
        comp = wrapper.vm;
        comp.cmdClient = entity;

        // WHEN
        comp.save();
        await comp.$nextTick();

        // THEN
        expect(cmdClientServiceStub.create.calledWith(entity)).toBeTruthy();
        expect(comp.isSaving).toEqual(false);
      });
    });

    describe('Before route enter', () => {
      it('Should retrieve data', async () => {
        // GIVEN
        cmdClientServiceStub.find.resolves(cmdClientSample);
        cmdClientServiceStub.retrieve.resolves([cmdClientSample]);

        // WHEN
        route = {
          params: {
            cmdClientId: '' + cmdClientSample.id,
          },
        };
        const wrapper = shallowMount(CmdClientUpdate, { global: mountOptions });
        comp = wrapper.vm;
        await comp.$nextTick();

        // THEN
        expect(comp.cmdClient).toMatchObject(cmdClientSample);
      });
    });

    describe('Previous state', () => {
      it('Should go previous state', async () => {
        cmdClientServiceStub.find.resolves(cmdClientSample);
        const wrapper = shallowMount(CmdClientUpdate, { global: mountOptions });
        comp = wrapper.vm;
        await comp.$nextTick();

        comp.previousState();
        await comp.$nextTick();

        expect(routerGoMock).toHaveBeenCalledWith(-1);
      });
    });
  });
});
