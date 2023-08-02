/* tslint:disable max-line-length */
import { vitest } from 'vitest';
import { shallowMount, MountingOptions } from '@vue/test-utils';
import sinon, { SinonStubbedInstance } from 'sinon';
import { RouteLocation } from 'vue-router';

import ArticleUpdate from '../../../......mainwebappapp/entities/article/article-update.vue';
import ArticleService from '../../../......mainwebappapp/entities/article/article.service';
import AlertService from '../../../......mainwebappapp/shared/alert/alert.service';

import MagasinService from '../../../......mainwebappapp/entities/magasin/magasin.service';
import CategorieService from '../../../......mainwebappapp/entities/categorie/categorie.service';

type ArticleUpdateComponentType = InstanceType<typeof ArticleUpdate>;

let route: Partial<RouteLocation>;
const routerGoMock = vitest.fn();

vitest.mock('vue-router', () => ({
  useRoute: () => route,
  useRouter: () => ({ go: routerGoMock }),
}));

const articleSample = { id: 123 };

describe('Component Tests', () => {
  let mountOptions: MountingOptions<ArticleUpdateComponentType>['global'];
  let alertService: AlertService;

  describe('Article Management Update Component', () => {
    let comp: ArticleUpdateComponentType;
    let articleServiceStub: SinonStubbedInstance<ArticleService>;

    beforeEach(() => {
      route = {};
      articleServiceStub = sinon.createStubInstance<ArticleService>(ArticleService);

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
          articleService: () => articleServiceStub,
          magasinService: () =>
            sinon.createStubInstance<MagasinService>(MagasinService, {
              retrieve: sinon.stub().resolves({}),
            } as any),
          categorieService: () =>
            sinon.createStubInstance<CategorieService>(CategorieService, {
              retrieve: sinon.stub().resolves({}),
            } as any),
        },
      };
    });

    afterEach(() => {
      vitest.resetAllMocks();
    });

    describe('save', () => {
      it('Should call update service on save for existing entity', async () => {
        // GIVEN
        const wrapper = shallowMount(ArticleUpdate, { global: mountOptions });
        comp = wrapper.vm;
        comp.article = articleSample;
        articleServiceStub.update.resolves(articleSample);

        // WHEN
        comp.save();
        await comp.$nextTick();

        // THEN
        expect(articleServiceStub.update.calledWith(articleSample)).toBeTruthy();
        expect(comp.isSaving).toEqual(false);
      });

      it('Should call create service on save for new entity', async () => {
        // GIVEN
        const entity = {};
        articleServiceStub.create.resolves(entity);
        const wrapper = shallowMount(ArticleUpdate, { global: mountOptions });
        comp = wrapper.vm;
        comp.article = entity;

        // WHEN
        comp.save();
        await comp.$nextTick();

        // THEN
        expect(articleServiceStub.create.calledWith(entity)).toBeTruthy();
        expect(comp.isSaving).toEqual(false);
      });
    });

    describe('Before route enter', () => {
      it('Should retrieve data', async () => {
        // GIVEN
        articleServiceStub.find.resolves(articleSample);
        articleServiceStub.retrieve.resolves([articleSample]);

        // WHEN
        route = {
          params: {
            articleId: '' + articleSample.id,
          },
        };
        const wrapper = shallowMount(ArticleUpdate, { global: mountOptions });
        comp = wrapper.vm;
        await comp.$nextTick();

        // THEN
        expect(comp.article).toMatchObject(articleSample);
      });
    });

    describe('Previous state', () => {
      it('Should go previous state', async () => {
        articleServiceStub.find.resolves(articleSample);
        const wrapper = shallowMount(ArticleUpdate, { global: mountOptions });
        comp = wrapper.vm;
        await comp.$nextTick();

        comp.previousState();
        await comp.$nextTick();

        expect(routerGoMock).toHaveBeenCalledWith(-1);
      });
    });
  });
});
