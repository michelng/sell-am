/* tslint:disable max-line-length */
import { vitest } from 'vitest';
import { shallowMount, MountingOptions } from '@vue/test-utils';
import sinon, { SinonStubbedInstance } from 'sinon';
import { RouteLocation } from 'vue-router';

import dayjs from 'dayjs';
import { DATE_TIME_LONG_FORMAT } from '../../../......mainwebappapp/shared/composables/date-format';
import CmdFournisseurUpdate from '../../../......mainwebappapp/entities/cmd-fournisseur/cmd-fournisseur-update.vue';
import CmdFournisseurService from '../../../......mainwebappapp/entities/cmd-fournisseur/cmd-fournisseur.service';
import AlertService from '../../../......mainwebappapp/shared/alert/alert.service';

import FournisseurService from '../../../......mainwebappapp/entities/fournisseur/fournisseur.service';

type CmdFournisseurUpdateComponentType = InstanceType<typeof CmdFournisseurUpdate>;

let route: Partial<RouteLocation>;
const routerGoMock = vitest.fn();

vitest.mock('vue-router', () => ({
  useRoute: () => route,
  useRouter: () => ({ go: routerGoMock }),
}));

const cmdFournisseurSample = { id: 123 };

describe('Component Tests', () => {
  let mountOptions: MountingOptions<CmdFournisseurUpdateComponentType>['global'];
  let alertService: AlertService;

  describe('CmdFournisseur Management Update Component', () => {
    let comp: CmdFournisseurUpdateComponentType;
    let cmdFournisseurServiceStub: SinonStubbedInstance<CmdFournisseurService>;

    beforeEach(() => {
      route = {};
      cmdFournisseurServiceStub = sinon.createStubInstance<CmdFournisseurService>(CmdFournisseurService);

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
          cmdFournisseurService: () => cmdFournisseurServiceStub,
          fournisseurService: () =>
            sinon.createStubInstance<FournisseurService>(FournisseurService, {
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
        const wrapper = shallowMount(CmdFournisseurUpdate, { global: mountOptions });
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
        const wrapper = shallowMount(CmdFournisseurUpdate, { global: mountOptions });
        comp = wrapper.vm;
        comp.cmdFournisseur = cmdFournisseurSample;
        cmdFournisseurServiceStub.update.resolves(cmdFournisseurSample);

        // WHEN
        comp.save();
        await comp.$nextTick();

        // THEN
        expect(cmdFournisseurServiceStub.update.calledWith(cmdFournisseurSample)).toBeTruthy();
        expect(comp.isSaving).toEqual(false);
      });

      it('Should call create service on save for new entity', async () => {
        // GIVEN
        const entity = {};
        cmdFournisseurServiceStub.create.resolves(entity);
        const wrapper = shallowMount(CmdFournisseurUpdate, { global: mountOptions });
        comp = wrapper.vm;
        comp.cmdFournisseur = entity;

        // WHEN
        comp.save();
        await comp.$nextTick();

        // THEN
        expect(cmdFournisseurServiceStub.create.calledWith(entity)).toBeTruthy();
        expect(comp.isSaving).toEqual(false);
      });
    });

    describe('Before route enter', () => {
      it('Should retrieve data', async () => {
        // GIVEN
        cmdFournisseurServiceStub.find.resolves(cmdFournisseurSample);
        cmdFournisseurServiceStub.retrieve.resolves([cmdFournisseurSample]);

        // WHEN
        route = {
          params: {
            cmdFournisseurId: '' + cmdFournisseurSample.id,
          },
        };
        const wrapper = shallowMount(CmdFournisseurUpdate, { global: mountOptions });
        comp = wrapper.vm;
        await comp.$nextTick();

        // THEN
        expect(comp.cmdFournisseur).toMatchObject(cmdFournisseurSample);
      });
    });

    describe('Previous state', () => {
      it('Should go previous state', async () => {
        cmdFournisseurServiceStub.find.resolves(cmdFournisseurSample);
        const wrapper = shallowMount(CmdFournisseurUpdate, { global: mountOptions });
        comp = wrapper.vm;
        await comp.$nextTick();

        comp.previousState();
        await comp.$nextTick();

        expect(routerGoMock).toHaveBeenCalledWith(-1);
      });
    });
  });
});
