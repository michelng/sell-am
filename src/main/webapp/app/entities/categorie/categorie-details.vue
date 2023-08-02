<template>
  <div class="row justify-content-center">
    <div class="col-8">
      <div v-if="categorie">
        <h2 class="jh-entity-heading" data-cy="categorieDetailsHeading">
          <span v-text="t$('sellAmApp.categorie.detail.title')"></span> {{ categorie.id }}
        </h2>
        <dl class="row jh-entity-details">
          <dt>
            <span v-text="t$('sellAmApp.categorie.code')"></span>
          </dt>
          <dd>
            <span>{{ categorie.code }}</span>
          </dd>
          <dt>
            <span v-text="t$('sellAmApp.categorie.designation')"></span>
          </dt>
          <dd>
            <span>{{ categorie.designation }}</span>
          </dd>
          <dt>
            <span v-text="t$('sellAmApp.categorie.description')"></span>
          </dt>
          <dd>
            <span>{{ categorie.description }}</span>
          </dd>
        </dl>
        <button type="submit" v-on:click.prevent="previousState()" class="btn btn-info" data-cy="entityDetailsBackButton">
          <font-awesome-icon icon="arrow-left"></font-awesome-icon>&nbsp;<span v-text="t$('entity.action.back')"></span>
        </button>
        <router-link
          v-if="categorie.id"
          :to="{ name: 'CategorieEdit', params: { categorieId: categorie.id } }"
          custom
          v-slot="{ navigate }"
        >
          <button @click="navigate" class="btn btn-primary">
            <font-awesome-icon icon="pencil-alt"></font-awesome-icon>&nbsp;<span v-text="t$('entity.action.edit')"></span>
          </button>
        </router-link>
      </div>
    </div>
  </div>
</template>

<script lang="ts" src="./categorie-details.component.ts"></script>
