/* tslint:disable max-line-length */
import { vitest } from 'vitest';
import { shallowMount, MountingOptions } from '@vue/test-utils';
import sinon, { SinonStubbedInstance } from 'sinon';
import { RouteLocation } from 'vue-router';

import CmdFournisseurDetails from '../../../......mainwebappapp/entities/cmd-fournisseur/cmd-fournisseur-details.vue';
import CmdFournisseurService from '../../../......mainwebappapp/entities/cmd-fournisseur/cmd-fournisseur.service';
import AlertService from '../../../......mainwebappapp/shared/alert/alert.service';

type CmdFournisseurDetailsComponentType = InstanceType<typeof CmdFournisseurDetails>;

let route: Partial<RouteLocation>;
const routerGoMock = vitest.fn();

vitest.mock('vue-router', () => ({
  useRoute: () => route,
  useRouter: () => ({ go: routerGoMock }),
}));

const cmdFournisseurSample = { id: 123 };

describe('Component Tests', () => {
  let alertService: AlertService;

  afterEach(() => {
    vitest.resetAllMocks();
  });

  describe('CmdFournisseur Management Detail Component', () => {
    let cmdFournisseurServiceStub: SinonStubbedInstance<CmdFournisseurService>;
    let mountOptions: MountingOptions<CmdFournisseurDetailsComponentType>['global'];

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
          'router-link': true,
        },
        provide: {
          alertService,
          cmdFournisseurService: () => cmdFournisseurServiceStub,
        },
      };
    });

    describe('Navigate to details', () => {
      it('Should call load all on init', async () => {
        // GIVEN
        cmdFournisseurServiceStub.find.resolves(cmdFournisseurSample);
        route = {
          params: {
            cmdFournisseurId: '' + 123,
          },
        };
        const wrapper = shallowMount(CmdFournisseurDetails, { global: mountOptions });
        const comp = wrapper.vm;
        // WHEN
        await comp.$nextTick();

        // THEN
        expect(comp.cmdFournisseur).toMatchObject(cmdFournisseurSample);
      });
    });

    describe('Previous state', () => {
      it('Should go previous state', async () => {
        cmdFournisseurServiceStub.find.resolves(cmdFournisseurSample);
        const wrapper = shallowMount(CmdFournisseurDetails, { global: mountOptions });
        const comp = wrapper.vm;
        await comp.$nextTick();

        comp.previousState();
        await comp.$nextTick();

        expect(routerGoMock).toHaveBeenCalledWith(-1);
      });
    });
  });
});
