<template>
  <div class="row justify-content-center">
    <div class="col-8">
      <div v-if="client">
        <h2 class="jh-entity-heading" data-cy="clientDetailsHeading">
          <span v-text="t$('sellAmApp.client.detail.title')"></span> {{ client.id }}
        </h2>
        <dl class="row jh-entity-details">
          <dt>
            <span v-text="t$('sellAmApp.client.identifiant')"></span>
          </dt>
          <dd>
            <span>{{ client.identifiant }}</span>
          </dd>
          <dt>
            <span v-text="t$('sellAmApp.client.nom')"></span>
          </dt>
          <dd>
            <span>{{ client.nom }}</span>
          </dd>
          <dt>
            <span v-text="t$('sellAmApp.client.prenom')"></span>
          </dt>
          <dd>
            <span>{{ client.prenom }}</span>
          </dd>
          <dt>
            <span v-text="t$('sellAmApp.client.telephone1')"></span>
          </dt>
          <dd>
            <span>{{ client.telephone1 }}</span>
          </dd>
          <dt>
            <span v-text="t$('sellAmApp.client.telephone2')"></span>
          </dt>
          <dd>
            <span>{{ client.telephone2 }}</span>
          </dd>
          <dt>
            <span v-text="t$('sellAmApp.client.email')"></span>
          </dt>
          <dd>
            <span>{{ client.email }}</span>
          </dd>
          <dt>
            <span v-text="t$('sellAmApp.client.photo')"></span>
          </dt>
          <dd>
            <span>{{ client.photo }}</span>
          </dd>
          <dt>
            <span v-text="t$('sellAmApp.client.description')"></span>
          </dt>
          <dd>
            <span>{{ client.description }}</span>
          </dd>
          <dt>
            <span v-text="t$('sellAmApp.client.typeClient')"></span>
          </dt>
          <dd>
            <span v-text="t$('sellAmApp.TypeClient.' + client.typeClient)"></span>
          </dd>
          <dt>
            <span v-text="t$('sellAmApp.client.statut')"></span>
          </dt>
          <dd>
            <span v-text="t$('sellAmApp.Statut.' + client.statut)"></span>
          </dd>
          <dt>
            <span v-text="t$('sellAmApp.client.carteCredit')"></span>
          </dt>
          <dd>
            <span>{{ client.carteCredit }}</span>
          </dd>
        </dl>
        <button type="submit" v-on:click.prevent="previousState()" class="btn btn-info" data-cy="entityDetailsBackButton">
          <font-awesome-icon icon="arrow-left"></font-awesome-icon>&nbsp;<span v-text="t$('entity.action.back')"></span>
        </button>
        <router-link v-if="client.id" :to="{ name: 'ClientEdit', params: { clientId: client.id } }" custom v-slot="{ navigate }">
          <button @click="navigate" class="btn btn-primary">
            <font-awesome-icon icon="pencil-alt"></font-awesome-icon>&nbsp;<span v-text="t$('entity.action.edit')"></span>
          </button>
        </router-link>
      </div>
    </div>
  </div>
</template>

<script lang="ts" src="./client-details.component.ts"></script>
