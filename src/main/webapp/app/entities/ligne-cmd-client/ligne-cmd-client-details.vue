<template>
  <div class="row justify-content-center">
    <div class="col-8">
      <div v-if="ligneCmdClient">
        <h2 class="jh-entity-heading" data-cy="ligneCmdClientDetailsHeading">
          <span v-text="t$('sellAmApp.ligneCmdClient.detail.title')"></span> {{ ligneCmdClient.id }}
        </h2>
        <dl class="row jh-entity-details">
          <dt>
            <span v-text="t$('sellAmApp.ligneCmdClient.quantite')"></span>
          </dt>
          <dd>
            <span>{{ ligneCmdClient.quantite }}</span>
          </dd>
          <dt>
            <span v-text="t$('sellAmApp.ligneCmdClient.prixUnitaire')"></span>
          </dt>
          <dd>
            <span>{{ ligneCmdClient.prixUnitaire }}</span>
          </dd>
          <dt>
            <span v-text="t$('sellAmApp.ligneCmdClient.dateLivraisonPrevue')"></span>
          </dt>
          <dd>
            <span v-if="ligneCmdClient.dateLivraisonPrevue">{{ formatDateLong(ligneCmdClient.dateLivraisonPrevue) }}</span>
          </dd>
          <dt>
            <span v-text="t$('sellAmApp.ligneCmdClient.montantTotal')"></span>
          </dt>
          <dd>
            <span>{{ ligneCmdClient.montantTotal }}</span>
          </dd>
          <dt>
            <span v-text="t$('sellAmApp.ligneCmdClient.commentaire')"></span>
          </dt>
          <dd>
            <span>{{ ligneCmdClient.commentaire }}</span>
          </dd>
          <dt>
            <span v-text="t$('sellAmApp.ligneCmdClient.statutCmd')"></span>
          </dt>
          <dd>
            <span v-text="t$('sellAmApp.StatutCmd.' + ligneCmdClient.statutCmd)"></span>
          </dd>
          <dt>
            <span v-text="t$('sellAmApp.ligneCmdClient.cmdClient')"></span>
          </dt>
          <dd>
            <div v-if="ligneCmdClient.cmdClient">
              <router-link :to="{ name: 'CmdClientView', params: { cmdClientId: ligneCmdClient.cmdClient.id } }">{{
                ligneCmdClient.cmdClient.id
              }}</router-link>
            </div>
          </dd>
          <dt>
            <span v-text="t$('sellAmApp.ligneCmdClient.article')"></span>
          </dt>
          <dd>
            <div v-if="ligneCmdClient.article">
              <router-link :to="{ name: 'ArticleView', params: { articleId: ligneCmdClient.article.id } }">{{
                ligneCmdClient.article.id
              }}</router-link>
            </div>
          </dd>
        </dl>
        <button type="submit" v-on:click.prevent="previousState()" class="btn btn-info" data-cy="entityDetailsBackButton">
          <font-awesome-icon icon="arrow-left"></font-awesome-icon>&nbsp;<span v-text="t$('entity.action.back')"></span>
        </button>
        <router-link
          v-if="ligneCmdClient.id"
          :to="{ name: 'LigneCmdClientEdit', params: { ligneCmdClientId: ligneCmdClient.id } }"
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

<script lang="ts" src="./ligne-cmd-client-details.component.ts"></script>
