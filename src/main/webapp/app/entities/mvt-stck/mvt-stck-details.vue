<template>
  <div class="row justify-content-center">
    <div class="col-8">
      <div v-if="mvtStck">
        <h2 class="jh-entity-heading" data-cy="mvtStckDetailsHeading">
          <span v-text="t$('sellAmApp.mvtStck.detail.title')"></span> {{ mvtStck.id }}
        </h2>
        <dl class="row jh-entity-details">
          <dt>
            <span v-text="t$('sellAmApp.mvtStck.dateMvnt')"></span>
          </dt>
          <dd>
            <span v-if="mvtStck.dateMvnt">{{ formatDateLong(mvtStck.dateMvnt) }}</span>
          </dd>
          <dt>
            <span v-text="t$('sellAmApp.mvtStck.quantite')"></span>
          </dt>
          <dd>
            <span>{{ mvtStck.quantite }}</span>
          </dd>
          <dt>
            <span v-text="t$('sellAmApp.mvtStck.typeMvt')"></span>
          </dt>
          <dd>
            <span v-text="t$('sellAmApp.TypeMvt.' + mvtStck.typeMvt)"></span>
          </dd>
          <dt>
            <span v-text="t$('sellAmApp.mvtStck.article')"></span>
          </dt>
          <dd>
            <div v-if="mvtStck.article">
              <router-link :to="{ name: 'ArticleView', params: { articleId: mvtStck.article.id } }">{{ mvtStck.article.id }}</router-link>
            </div>
          </dd>
        </dl>
        <button type="submit" v-on:click.prevent="previousState()" class="btn btn-info" data-cy="entityDetailsBackButton">
          <font-awesome-icon icon="arrow-left"></font-awesome-icon>&nbsp;<span v-text="t$('entity.action.back')"></span>
        </button>
        <router-link v-if="mvtStck.id" :to="{ name: 'MvtStckEdit', params: { mvtStckId: mvtStck.id } }" custom v-slot="{ navigate }">
          <button @click="navigate" class="btn btn-primary">
            <font-awesome-icon icon="pencil-alt"></font-awesome-icon>&nbsp;<span v-text="t$('entity.action.edit')"></span>
          </button>
        </router-link>
      </div>
    </div>
  </div>
</template>

<script lang="ts" src="./mvt-stck-details.component.ts"></script>
