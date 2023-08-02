/* tslint:disable max-line-length */
import { vitest } from 'vitest';
import { shallowMount, MountingOptions } from '@vue/test-utils';
import sinon, { SinonStubbedInstance } from 'sinon';
import { RouteLocation } from 'vue-router';

import LigneCmdFournisseurDetails from '../../../......mainwebappapp/entities/ligne-cmd-fournisseur/ligne-cmd-fournisseur-details.vue';
import LigneCmdFournisseurService from '../../../......mainwebappapp/entities/ligne-cmd-fournisseur/ligne-cmd-fournisseur.service';
import AlertService from '../../../......mainwebappapp/shared/alert/alert.service';

type LigneCmdFournisseurDetailsComponentType = InstanceType<typeof LigneCmdFournisseurDetails>;

let route: Partial<RouteLocation>;
const routerGoMock = vitest.fn();

vitest.mock('vue-router', () => ({
  useRoute: () => route,
  useRouter: () => ({ go: routerGoMock }),
}));

const ligneCmdFournisseurSample = { id: 123 };

describe('Component Tests', () => {
  let alertService: AlertService;

  afterEach(() => {
    vitest.resetAllMocks();
  });

  describe('LigneCmdFournisseur Management Detail Component', () => {
    let ligneCmdFournisseurServiceStub: SinonStubbedInstance<LigneCmdFournisseurService>;
    let mountOptions: MountingOptions<LigneCmdFournisseurDetailsComponentType>['global'];

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
          'router-link': true,
        },
        provide: {
          alertService,
          ligneCmdFournisseurService: () => ligneCmdFournisseurServiceStub,
        },
      };
    });

    describe('Navigate to details', () => {
      it('Should call load all on init', async () => {
        // GIVEN
        ligneCmdFournisseurServiceStub.find.resolves(ligneCmdFournisseurSample);
        route = {
          params: {
            ligneCmdFournisseurId: '' + 123,
          },
        };
        const wrapper = shallowMount(LigneCmdFournisseurDetails, { global: mountOptions });
        const comp = wrapper.vm;
        // WHEN
        await comp.$nextTick();

        // THEN
        expect(comp.ligneCmdFournisseur).toMatchObject(ligneCmdFournisseurSample);
      });
    });

    describe('Previous state', () => {
      it('Should go previous state', async () => {
        ligneCmdFournisseurServiceStub.find.resolves(ligneCmdFournisseurSample);
        const wrapper = shallowMount(LigneCmdFournisseurDetails, { global: mountOptions });
        const comp = wrapper.vm;
        await comp.$nextTick();

        comp.previousState();
        await comp.$nextTick();

        expect(routerGoMock).toHaveBeenCalledWith(-1);
      });
    });
  });
});
