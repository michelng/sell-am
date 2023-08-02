<template>
  <div class="row justify-content-center">
    <div class="col-8">
      <div v-if="cmdClient">
        <h2 class="jh-entity-heading" data-cy="cmdClientDetailsHeading">
          <span v-text="t$('sellAmApp.cmdClient.detail.title')"></span> {{ cmdClient.id }}
        </h2>
        <dl class="row jh-entity-details">
          <dt>
            <span v-text="t$('sellAmApp.cmdClient.code')"></span>
          </dt>
          <dd>
            <span>{{ cmdClient.code }}</span>
          </dd>
          <dt>
            <span v-text="t$('sellAmApp.cmdClient.dateCommande')"></span>
          </dt>
          <dd>
            <span v-if="cmdClient.dateCommande">{{ formatDateLong(cmdClient.dateCommande) }}</span>
          </dd>
          <dt>
            <span v-text="t$('sellAmApp.cmdClient.dateLivraisonPrevue')"></span>
          </dt>
          <dd>
            <span v-if="cmdClient.dateLivraisonPrevue">{{ formatDateLong(cmdClient.dateLivraisonPrevue) }}</span>
          </dd>
          <dt>
            <span v-text="t$('sellAmApp.cmdClient.montantTotal')"></span>
          </dt>
          <dd>
            <span>{{ cmdClient.montantTotal }}</span>
          </dd>
          <dt>
            <span v-text="t$('sellAmApp.cmdClient.commentaire')"></span>
          </dt>
          <dd>
            <span>{{ cmdClient.commentaire }}</span>
          </dd>
          <dt>
            <span v-text="t$('sellAmApp.cmdClient.statutCmd')"></span>
          </dt>
          <dd>
            <span v-text="t$('sellAmApp.StatutCmd.' + cmdClient.statutCmd)"></span>
          </dd>
          <dt>
            <span v-text="t$('sellAmApp.cmdClient.client')"></span>
          </dt>
          <dd>
            <div v-if="cmdClient.client">
              <router-link :to="{ name: 'ClientView', params: { clientId: cmdClient.client.id } }">{{ cmdClient.client.id }}</router-link>
            </div>
          </dd>
        </dl>
        <button type="submit" v-on:click.prevent="previousState()" class="btn btn-info" data-cy="entityDetailsBackButton">
          <font-awesome-icon icon="arrow-left"></font-awesome-icon>&nbsp;<span v-text="t$('entity.action.back')"></span>
        </button>
        <router-link
          v-if="cmdClient.id"
          :to="{ name: 'CmdClientEdit', params: { cmdClientId: cmdClient.id } }"
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

<script lang="ts" src="./cmd-client-details.component.ts"></script>
