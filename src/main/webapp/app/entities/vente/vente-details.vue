<template>
  <div class="row justify-content-center">
    <div class="col-8">
      <div v-if="vente">
        <h2 class="jh-entity-heading" data-cy="venteDetailsHeading">
          <span v-text="t$('sellAmApp.vente.detail.title')"></span> {{ vente.id }}
        </h2>
        <dl class="row jh-entity-details">
          <dt>
            <span v-text="t$('sellAmApp.vente.code')"></span>
          </dt>
          <dd>
            <span>{{ vente.code }}</span>
          </dd>
          <dt>
            <span v-text="t$('sellAmApp.vente.dateVente')"></span>
          </dt>
          <dd>
            <span v-if="vente.dateVente">{{ formatDateLong(vente.dateVente) }}</span>
          </dd>
          <dt>
            <span v-text="t$('sellAmApp.vente.commentaire')"></span>
          </dt>
          <dd>
            <span>{{ vente.commentaire }}</span>
          </dd>
          <dt>
            <span v-text="t$('sellAmApp.vente.montantTotal')"></span>
          </dt>
          <dd>
            <span>{{ vente.montantTotal }}</span>
          </dd>
          <dt>
            <span v-text="t$('sellAmApp.vente.statutPaiement')"></span>
          </dt>
          <dd>
            <span v-text="t$('sellAmApp.StatutPaiement.' + vente.statutPaiement)"></span>
          </dd>
          <dt>
            <span v-text="t$('sellAmApp.vente.client')"></span>
          </dt>
          <dd>
            <div v-if="vente.client">
              <router-link :to="{ name: 'ClientView', params: { clientId: vente.client.id } }">{{ vente.client.id }}</router-link>
            </div>
          </dd>
          <dt>
            <span v-text="t$('sellAmApp.vente.employe')"></span>
          </dt>
          <dd>
            <div v-if="vente.employe">
              <router-link :to="{ name: 'EmployeView', params: { employeId: vente.employe.id } }">{{ vente.employe.id }}</router-link>
            </div>
          </dd>
        </dl>
        <button type="submit" v-on:click.prevent="previousState()" class="btn btn-info" data-cy="entityDetailsBackButton">
          <font-awesome-icon icon="arrow-left"></font-awesome-icon>&nbsp;<span v-text="t$('entity.action.back')"></span>
        </button>
        <router-link v-if="vente.id" :to="{ name: 'VenteEdit', params: { venteId: vente.id } }" custom v-slot="{ navigate }">
          <button @click="navigate" class="btn btn-primary">
            <font-awesome-icon icon="pencil-alt"></font-awesome-icon>&nbsp;<span v-text="t$('entity.action.edit')"></span>
          </button>
        </router-link>
      </div>
    </div>
  </div>
</template>

<script lang="ts" src="./vente-details.component.ts"></script>
