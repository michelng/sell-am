<template>
  <div class="row justify-content-center">
    <div class="col-8">
      <div v-if="article">
        <h2 class="jh-entity-heading" data-cy="articleDetailsHeading">
          <span v-text="t$('sellAmApp.article.detail.title')"></span> {{ article.id }}
        </h2>
        <dl class="row jh-entity-details">
          <dt>
            <span v-text="t$('sellAmApp.article.code')"></span>
          </dt>
          <dd>
            <span>{{ article.code }}</span>
          </dd>
          <dt>
            <span v-text="t$('sellAmApp.article.designation')"></span>
          </dt>
          <dd>
            <span>{{ article.designation }}</span>
          </dd>
          <dt>
            <span v-text="t$('sellAmApp.article.prixUnitaireHt')"></span>
          </dt>
          <dd>
            <span>{{ article.prixUnitaireHt }}</span>
          </dd>
          <dt>
            <span v-text="t$('sellAmApp.article.tauxTva')"></span>
          </dt>
          <dd>
            <span>{{ article.tauxTva }}</span>
          </dd>
          <dt>
            <span v-text="t$('sellAmApp.article.prixUnitaireTtc')"></span>
          </dt>
          <dd>
            <span>{{ article.prixUnitaireTtc }}</span>
          </dd>
          <dt>
            <span v-text="t$('sellAmApp.article.photo')"></span>
          </dt>
          <dd>
            <span>{{ article.photo }}</span>
          </dd>
          <dt>
            <span v-text="t$('sellAmApp.article.quantiteEnStock')"></span>
          </dt>
          <dd>
            <span>{{ article.quantiteEnStock }}</span>
          </dd>
          <dt>
            <span v-text="t$('sellAmApp.article.seuilDeReapprovisionnement')"></span>
          </dt>
          <dd>
            <span>{{ article.seuilDeReapprovisionnement }}</span>
          </dd>
          <dt>
            <span v-text="t$('sellAmApp.article.magasin')"></span>
          </dt>
          <dd>
            <div v-if="article.magasin">
              <router-link :to="{ name: 'MagasinView', params: { magasinId: article.magasin.id } }">{{ article.magasin.id }}</router-link>
            </div>
          </dd>
          <dt>
            <span v-text="t$('sellAmApp.article.categorie')"></span>
          </dt>
          <dd>
            <div v-if="article.categorie">
              <router-link :to="{ name: 'CategorieView', params: { categorieId: article.categorie.id } }">{{
                article.categorie.id
              }}</router-link>
            </div>
          </dd>
        </dl>
        <button type="submit" v-on:click.prevent="previousState()" class="btn btn-info" data-cy="entityDetailsBackButton">
          <font-awesome-icon icon="arrow-left"></font-awesome-icon>&nbsp;<span v-text="t$('entity.action.back')"></span>
        </button>
        <router-link v-if="article.id" :to="{ name: 'ArticleEdit', params: { articleId: article.id } }" custom v-slot="{ navigate }">
          <button @click="navigate" class="btn btn-primary">
            <font-awesome-icon icon="pencil-alt"></font-awesome-icon>&nbsp;<span v-text="t$('entity.action.edit')"></span>
          </button>
        </router-link>
      </div>
    </div>
  </div>
</template>

<script lang="ts" src="./article-details.component.ts"></script>
