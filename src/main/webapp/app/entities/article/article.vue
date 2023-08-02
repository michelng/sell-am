<template>
  <div>
    <h2 id="page-heading" data-cy="ArticleHeading">
      <span v-text="t$('sellAmApp.article.home.title')" id="article-heading"></span>
      <div class="d-flex justify-content-end">
        <button class="btn btn-info mr-2" v-on:click="handleSyncList" :disabled="isFetching">
          <font-awesome-icon icon="sync" :spin="isFetching"></font-awesome-icon>
          <span v-text="t$('sellAmApp.article.home.refreshListLabel')"></span>
        </button>
        <router-link :to="{ name: 'ArticleCreate' }" custom v-slot="{ navigate }">
          <button
            @click="navigate"
            id="jh-create-entity"
            data-cy="entityCreateButton"
            class="btn btn-primary jh-create-entity create-article"
          >
            <font-awesome-icon icon="plus"></font-awesome-icon>
            <span v-text="t$('sellAmApp.article.home.createLabel')"></span>
          </button>
        </router-link>
      </div>
    </h2>
    <br />
    <div class="alert alert-warning" v-if="!isFetching && articles && articles.length === 0">
      <span v-text="t$('sellAmApp.article.home.notFound')"></span>
    </div>
    <div class="table-responsive" v-if="articles && articles.length > 0">
      <table class="table table-striped" aria-describedby="articles">
        <thead>
          <tr>
            <th scope="row"><span v-text="t$('global.field.id')"></span></th>
            <th scope="row"><span v-text="t$('sellAmApp.article.code')"></span></th>
            <th scope="row"><span v-text="t$('sellAmApp.article.designation')"></span></th>
            <th scope="row"><span v-text="t$('sellAmApp.article.prixUnitaireHt')"></span></th>
            <th scope="row"><span v-text="t$('sellAmApp.article.tauxTva')"></span></th>
            <th scope="row"><span v-text="t$('sellAmApp.article.prixUnitaireTtc')"></span></th>
            <th scope="row"><span v-text="t$('sellAmApp.article.photo')"></span></th>
            <th scope="row"><span v-text="t$('sellAmApp.article.quantiteEnStock')"></span></th>
            <th scope="row"><span v-text="t$('sellAmApp.article.seuilDeReapprovisionnement')"></span></th>
            <th scope="row"><span v-text="t$('sellAmApp.article.magasin')"></span></th>
            <th scope="row"><span v-text="t$('sellAmApp.article.categorie')"></span></th>
            <th scope="row"></th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="article in articles" :key="article.id" data-cy="entityTable">
            <td>
              <router-link :to="{ name: 'ArticleView', params: { articleId: article.id } }">{{ article.id }}</router-link>
            </td>
            <td>{{ article.code }}</td>
            <td>{{ article.designation }}</td>
            <td>{{ article.prixUnitaireHt }}</td>
            <td>{{ article.tauxTva }}</td>
            <td>{{ article.prixUnitaireTtc }}</td>
            <td>{{ article.photo }}</td>
            <td>{{ article.quantiteEnStock }}</td>
            <td>{{ article.seuilDeReapprovisionnement }}</td>
            <td>
              <div v-if="article.magasin">
                <router-link :to="{ name: 'MagasinView', params: { magasinId: article.magasin.id } }">{{ article.magasin.id }}</router-link>
              </div>
            </td>
            <td>
              <div v-if="article.categorie">
                <router-link :to="{ name: 'CategorieView', params: { categorieId: article.categorie.id } }">{{
                  article.categorie.id
                }}</router-link>
              </div>
            </td>
            <td class="text-right">
              <div class="btn-group">
                <router-link :to="{ name: 'ArticleView', params: { articleId: article.id } }" custom v-slot="{ navigate }">
                  <button @click="navigate" class="btn btn-info btn-sm details" data-cy="entityDetailsButton">
                    <font-awesome-icon icon="eye"></font-awesome-icon>
                    <span class="d-none d-md-inline" v-text="t$('entity.action.view')"></span>
                  </button>
                </router-link>
                <router-link :to="{ name: 'ArticleEdit', params: { articleId: article.id } }" custom v-slot="{ navigate }">
                  <button @click="navigate" class="btn btn-primary btn-sm edit" data-cy="entityEditButton">
                    <font-awesome-icon icon="pencil-alt"></font-awesome-icon>
                    <span class="d-none d-md-inline" v-text="t$('entity.action.edit')"></span>
                  </button>
                </router-link>
                <b-button
                  v-on:click="prepareRemove(article)"
                  variant="danger"
                  class="btn btn-sm"
                  data-cy="entityDeleteButton"
                  v-b-modal.removeEntity
                >
                  <font-awesome-icon icon="times"></font-awesome-icon>
                  <span class="d-none d-md-inline" v-text="t$('entity.action.delete')"></span>
                </b-button>
              </div>
            </td>
          </tr>
        </tbody>
      </table>
    </div>
    <b-modal ref="removeEntity" id="removeEntity">
      <template #modal-title>
        <span id="sellAmApp.article.delete.question" data-cy="articleDeleteDialogHeading" v-text="t$('entity.delete.title')"></span>
      </template>
      <div class="modal-body">
        <p id="jhi-delete-article-heading" v-text="t$('sellAmApp.article.delete.question', { id: removeId })"></p>
      </div>
      <template #modal-footer>
        <div>
          <button type="button" class="btn btn-secondary" v-text="t$('entity.action.cancel')" v-on:click="closeDialog()"></button>
          <button
            type="button"
            class="btn btn-primary"
            id="jhi-confirm-delete-article"
            data-cy="entityConfirmDeleteButton"
            v-text="t$('entity.action.delete')"
            v-on:click="removeArticle()"
          ></button>
        </div>
      </template>
    </b-modal>
  </div>
</template>

<script lang="ts" src="./article.component.ts"></script>
