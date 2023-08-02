<template>
  <div class="row justify-content-center">
    <div class="col-8">
      <div v-if="cmdFournisseur">
        <h2 class="jh-entity-heading" data-cy="cmdFournisseurDetailsHeading">
          <span v-text="t$('sellAmApp.cmdFournisseur.detail.title')"></span> {{ cmdFournisseur.id }}
        </h2>
        <dl class="row jh-entity-details">
          <dt>
            <span v-text="t$('sellAmApp.cmdFournisseur.code')"></span>
          </dt>
          <dd>
            <span>{{ cmdFournisseur.code }}</span>
          </dd>
          <dt>
            <span v-text="t$('sellAmApp.cmdFournisseur.dateCommande')"></span>
          </dt>
          <dd>
            <span v-if="cmdFournisseur.dateCommande">{{ formatDateLong(cmdFournisseur.dateCommande) }}</span>
          </dd>
          <dt>
            <span v-text="t$('sellAmApp.cmdFournisseur.dateLivraisonPrevue')"></span>
          </dt>
          <dd>
            <span v-if="cmdFournisseur.dateLivraisonPrevue">{{ formatDateLong(cmdFournisseur.dateLivraisonPrevue) }}</span>
          </dd>
          <dt>
            <span v-text="t$('sellAmApp.cmdFournisseur.montantTotal')"></span>
          </dt>
          <dd>
            <span>{{ cmdFournisseur.montantTotal }}</span>
          </dd>
          <dt>
            <span v-text="t$('sellAmApp.cmdFournisseur.commentaire')"></span>
          </dt>
          <dd>
            <span>{{ cmdFournisseur.commentaire }}</span>
          </dd>
          <dt>
            <span v-text="t$('sellAmApp.cmdFournisseur.statutCmd')"></span>
          </dt>
          <dd>
            <span v-text="t$('sellAmApp.StatutCmd.' + cmdFournisseur.statutCmd)"></span>
          </dd>
          <dt>
            <span v-text="t$('sellAmApp.cmdFournisseur.fournisseur')"></span>
          </dt>
          <dd>
            <div v-if="cmdFournisseur.fournisseur">
              <router-link :to="{ name: 'FournisseurView', params: { fournisseurId: cmdFournisseur.fournisseur.id } }">{{
                cmdFournisseur.fournisseur.id
              }}</router-link>
            </div>
          </dd>
        </dl>
        <button type="submit" v-on:click.prevent="previousState()" class="btn btn-info" data-cy="entityDetailsBackButton">
          <font-awesome-icon icon="arrow-left"></font-awesome-icon>&nbsp;<span v-text="t$('entity.action.back')"></span>
        </button>
        <router-link
          v-if="cmdFournisseur.id"
          :to="{ name: 'CmdFournisseurEdit', params: { cmdFournisseurId: cmdFournisseur.id } }"
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

<script lang="ts" src="./cmd-fournisseur-details.component.ts"></script>
