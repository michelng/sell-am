/* tslint:disable max-line-length */
import { vitest } from 'vitest';
import { shallowMount, MountingOptions } from '@vue/test-utils';
import sinon, { SinonStubbedInstance } from 'sinon';

import Article from '../../../......mainwebappapp/entities/article/article.vue';
import ArticleService from '../../../......mainwebappapp/entities/article/article.service';
import AlertService from '../../../......mainwebappapp/shared/alert/alert.service';

type ArticleComponentType = InstanceType<typeof Article>;

const bModalStub = {
  render: () => {},
  methods: {
    hide: () => {},
    show: () => {},
  },
};

describe('Component Tests', () => {
  let alertService: AlertService;

  describe('Article Management Component', () => {
    let articleServiceStub: SinonStubbedInstance<ArticleService>;
    let mountOptions: MountingOptions<ArticleComponentType>['global'];

    beforeEach(() => {
      articleServiceStub = sinon.createStubInstance<ArticleService>(ArticleService);
      articleServiceStub.retrieve.resolves({ headers: {} });

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
          articleService: () => articleServiceStub,
        },
      };
    });

    describe('Mount', () => {
      it('Should call load all on init', async () => {
        // GIVEN
        articleServiceStub.retrieve.resolves({ headers: {}, data: [{ id: 123 }] });

        // WHEN
        const wrapper = shallowMount(Article, { global: mountOptions });
        const comp = wrapper.vm;
        await comp.$nextTick();

        // THEN
        expect(articleServiceStub.retrieve.calledOnce).toBeTruthy();
        expect(comp.articles[0]).toEqual(expect.objectContaining({ id: 123 }));
      });
    });
    describe('Handles', () => {
      let comp: ArticleComponentType;

      beforeEach(async () => {
        const wrapper = shallowMount(Article, { global: mountOptions });
        comp = wrapper.vm;
        await comp.$nextTick();
        articleServiceStub.retrieve.reset();
        articleServiceStub.retrieve.resolves({ headers: {}, data: [] });
      });

      it('Should call delete service on confirmDelete', async () => {
        // GIVEN
        articleServiceStub.delete.resolves({});

        // WHEN
        comp.prepareRemove({ id: 123 });

        comp.removeArticle();
        await comp.$nextTick(); // clear components

        // THEN
        expect(articleServiceStub.delete.called).toBeTruthy();

        // THEN
        await comp.$nextTick(); // handle component clear watch
        expect(articleServiceStub.retrieve.callCount).toEqual(1);
      });
    });
  });
});
