/* tslint:disable max-line-length */
import { vitest } from 'vitest';
import { shallowMount, MountingOptions } from '@vue/test-utils';
import sinon, { SinonStubbedInstance } from 'sinon';
import { RouteLocation } from 'vue-router';

import dayjs from 'dayjs';
import { DATE_TIME_LONG_FORMAT } from '../../../......mainwebappapp/shared/composables/date-format';
import LigneCmdFournisseurUpdate from '../../../......mainwebappapp/entities/ligne-cmd-fournisseur/ligne-cmd-fournisseur-update.vue';
import LigneCmdFournisseurService from '../../../......mainwebappapp/entities/ligne-cmd-fournisseur/ligne-cmd-fournisseur.service';
import AlertService from '../../../......mainwebappapp/shared/alert/alert.service';

import CmdFournisseurService from '../../../......mainwebappapp/entities/cmd-fournisseur/cmd-fournisseur.service';
import ArticleService from '../../../......mainwebappapp/entities/article/article.service';

type LigneCmdFournisseurUpdateComponentType = InstanceType<typeof LigneCmdFournisseurUpdate>;

let route: Partial<RouteLocation>;
const routerGoMock = vitest.fn();

vitest.mock('vue-router', () => ({
  useRoute: () => route,
  useRouter: () => ({ go: routerGoMock }),
}));

const ligneCmdFournisseurSample = { id: 123 };

describe('Component Tests', () => {
  let mountOptions: MountingOptions<LigneCmdFournisseurUpdateComponentType>['global'];
  let alertService: AlertService;

  describe('LigneCmdFournisseur Management Update Component', () => {
    let comp: LigneCmdFournisseurUpdateComponentType;
    let ligneCmdFournisseurServiceStub: SinonStubbedInstance<LigneCmdFournisseurService>;

    beforeEach(() => {
      route = {};
      ligneCmdFournisseurServiceStub = sinon.createStubInstance<LigneCmdFournisseurService>(LigneCmdFournisseurService);

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
          ligneCmdFournisseurService: () => ligneCmdFournisseurServiceStub,
          cmdFournisseurService: () =>
            sinon.createStubInstance<CmdFournisseurService>(CmdFournisseurService, {
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
        const wrapper = shallowMount(LigneCmdFournisseurUpdate, { global: mountOptions });
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
        const wrapper = shallowMount(LigneCmdFournisseurUpdate, { global: mountOptions });
        comp = wrapper.vm;
        comp.ligneCmdFournisseur = ligneCmdFournisseurSample;
        ligneCmdFournisseurServiceStub.update.resolves(ligneCmdFournisseurSample);

        // WHEN
        comp.save();
        await comp.$nextTick();

        // THEN
        expect(ligneCmdFournisseurServiceStub.update.calledWith(ligneCmdFournisseurSample)).toBeTruthy();
        expect(comp.isSaving).toEqual(false);
      });

      it('Should call create service on save for new entity', async () => {
        // GIVEN
        const entity = {};
        ligneCmdFournisseurServiceStub.create.resolves(entity);
        const wrapper = shallowMount(LigneCmdFournisseurUpdate, { global: mountOptions });
        comp = wrapper.vm;
        comp.ligneCmdFournisseur = entity;

        // WHEN
        comp.save();
        await comp.$nextTick();

        // THEN
        expect(ligneCmdFournisseurServiceStub.create.calledWith(entity)).toBeTruthy();
        expect(comp.isSaving).toEqual(false);
      });
    });

    describe('Before route enter', () => {
      it('Should retrieve data', async () => {
        // GIVEN
        ligneCmdFournisseurServiceStub.find.resolves(ligneCmdFournisseurSample);
        ligneCmdFournisseurServiceStub.retrieve.resolves([ligneCmdFournisseurSample]);

        // WHEN
        route = {
          params: {
            ligneCmdFournisseurId: '' + ligneCmdFournisseurSample.id,
          },
        };
        const wrapper = shallowMount(LigneCmdFournisseurUpdate, { global: mountOptions });
        comp = wrapper.vm;
        await comp.$nextTick();

        // THEN
        expect(comp.ligneCmdFournisseur).toMatchObject(ligneCmdFournisseurSample);
      });
    });

    describe('Previous state', () => {
      it('Should go previous state', async () => {
        ligneCmdFournisseurServiceStub.find.resolves(ligneCmdFournisseurSample);
        const wrapper = shallowMount(LigneCmdFournisseurUpdate, { global: mountOptions });
        comp = wrapper.vm;
        await comp.$nextTick();

        comp.previousState();
        await comp.$nextTick();

        expect(routerGoMock).toHaveBeenCalledWith(-1);
      });
    });
  });
});
