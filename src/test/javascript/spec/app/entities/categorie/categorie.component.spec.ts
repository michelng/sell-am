/* tslint:disable max-line-length */
import { vitest } from 'vitest';
import { shallowMount, MountingOptions } from '@vue/test-utils';
import sinon, { SinonStubbedInstance } from 'sinon';

import Categorie from '../../../......mainwebappapp/entities/categorie/categorie.vue';
import CategorieService from '../../../......mainwebappapp/entities/categorie/categorie.service';
import AlertService from '../../../......mainwebappapp/shared/alert/alert.service';

type CategorieComponentType = InstanceType<typeof Categorie>;

const bModalStub = {
  render: () => {},
  methods: {
    hide: () => {},
    show: () => {},
  },
};

describe('Component Tests', () => {
  let alertService: AlertService;

  describe('Categorie Management Component', () => {
    let categorieServiceStub: SinonStubbedInstance<CategorieService>;
    let mountOptions: MountingOptions<CategorieComponentType>['global'];

    beforeEach(() => {
      categorieServiceStub = sinon.createStubInstance<CategorieService>(CategorieService);
      categorieServiceStub.retrieve.resolves({ headers: {} });

      alertService = new AlertService({
        i18n: { t: vitest.fn() } as any,
        bvToast: {
          toast: vitest.fn(),
        } as any,
      });

      mountOptions = {
        stubs: {
          bModal: bModalStub as any,
          'font-awesome-icon': true,
          'b-badge': true,
          'b-button': true,
          'router-link': true,
        },
        directives: {
          'b-modal': {},
        },
        provide: {
          alertService,
          categorieService: () => categorieServiceStub,
        },
      };
    });

    describe('Mount', () => {
      it('Should call load all on init', async () => {
        // GIVEN
        categorieServiceStub.retrieve.resolves({ headers: {}, data: [{ id: 123 }] });

        // WHEN
        const wrapper = shallowMount(Categorie, { global: mountOptions });
        const comp = wrapper.vm;
        await comp.$nextTick();

        // THEN
        expect(categorieServiceStub.retrieve.calledOnce).toBeTruthy();
        expect(comp.categories[0]).toEqual(expect.objectContaining({ id: 123 }));
      });
    });
    describe('Handles', () => {
      let comp: CategorieComponentType;

      beforeEach(async () => {
        const wrapper = shallowMount(Categorie, { global: mountOptions });
        comp = wrapper.vm;
        await comp.$nextTick();
        categorieServiceStub.retrieve.reset();
        categorieServiceStub.retrieve.resolves({ headers: {}, data: [] });
      });

      it('Should call delete service on confirmDelete', async () => {
        // GIVEN
        categorieServiceStub.delete.resolves({});

        // WHEN
        comp.prepareRemove({ id: 123 });

        comp.removeCategorie();
        await comp.$nextTick(); // clear components

        // THEN
        expect(categorieServiceStub.delete.called).toBeTruthy();

        // THEN
        await comp.$nextTick(); // handle component clear watch
        expect(categorieServiceStub.retrieve.callCount).toEqual(1);
      });
    });
  });
});
