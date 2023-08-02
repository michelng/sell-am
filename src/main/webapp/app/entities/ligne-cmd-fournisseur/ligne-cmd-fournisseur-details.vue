<template>
  <div class="row justify-content-center">
    <div class="col-8">
      <div v-if="ligneCmdFournisseur">
        <h2 class="jh-entity-heading" data-cy="ligneCmdFournisseurDetailsHeading">
          <span v-text="t$('sellAmApp.ligneCmdFournisseur.detail.title')"></span> {{ ligneCmdFournisseur.id }}
        </h2>
        <dl class="row jh-entity-details">
          <dt>
            <span v-text="t$('sellAmApp.ligneCmdFournisseur.quantite')"></span>
          </dt>
          <dd>
            <span>{{ ligneCmdFournisseur.quantite }}</span>
          </dd>
          <dt>
            <span v-text="t$('sellAmApp.ligneCmdFournisseur.prixUnitaire')"></span>
          </dt>
          <dd>
            <span>{{ ligneCmdFournisseur.prixUnitaire }}</span>
          </dd>
          <dt>
            <span v-text="t$('sellAmApp.ligneCmdFournisseur.dateLivraisonPrevu')"></span>
          </dt>
          <dd>
            <span v-if="ligneCmdFournisseur.dateLivraisonPrevu">{{ formatDateLong(ligneCmdFournisseur.dateLivraisonPrevu) }}</span>
          </dd>
          <dt>
            <span v-text="t$('sellAmApp.ligneCmdFournisseur.montantTotal')"></span>
          </dt>
          <dd>
            <span>{{ ligneCmdFournisseur.montantTotal }}</span>
          </dd>
          <dt>
            <span v-text="t$('sellAmApp.ligneCmdFournisseur.commentaire')"></span>
          </dt>
          <dd>
            <span>{{ ligneCmdFournisseur.commentaire }}</span>
          </dd>
          <dt>
            <span v-text="t$('sellAmApp.ligneCmdFournisseur.statutCmd')"></span>
          </dt>
          <dd>
            <span v-text="t$('sellAmApp.StatutCmd.' + ligneCmdFournisseur.statutCmd)"></span>
          </dd>
          <dt>
            <span v-text="t$('sellAmApp.ligneCmdFournisseur.cmdFournisseur')"></span>
          </dt>
          <dd>
            <div v-if="ligneCmdFournisseur.cmdFournisseur">
              <router-link :to="{ name: 'CmdFournisseurView', params: { cmdFournisseurId: ligneCmdFournisseur.cmdFournisseur.id } }">{{
                ligneCmdFournisseur.cmdFournisseur.id
              }}</router-link>
            </div>
          </dd>
          <dt>
            <span v-text="t$('sellAmApp.ligneCmdFournisseur.article')"></span>
          </dt>
          <dd>
            <div v-if="ligneCmdFournisseur.article">
              <router-link :to="{ name: 'ArticleView', params: { articleId: ligneCmdFournisseur.article.id } }">{{
                ligneCmdFournisseur.article.id
              }}</router-link>
            </div>
          </dd>
        </dl>
        <button type="submit" v-on:click.prevent="previousState()" class="btn btn-info" data-cy="entityDetailsBackButton">
          <font-awesome-icon icon="arrow-left"></font-awesome-icon>&nbsp;<span v-text="t$('entity.action.back')"></span>
        </button>
        <router-link
          v-if="ligneCmdFournisseur.id"
          :to="{ name: 'LigneCmdFournisseurEdit', params: { ligneCmdFournisseurId: ligneCmdFournisseur.id } }"
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

<script lang="ts" src="./ligne-cmd-fournisseur-details.component.ts"></script>
