<template>
  <div>
    <h2 id="page-heading" data-cy="LigneCmdFournisseurHeading">
      <span v-text="t$('sellAmApp.ligneCmdFournisseur.home.title')" id="ligne-cmd-fournisseur-heading"></span>
      <div class="d-flex justify-content-end">
        <button class="btn btn-info mr-2" v-on:click="handleSyncList" :disabled="isFetching">
          <font-awesome-icon icon="sync" :spin="isFetching"></font-awesome-icon>
          <span v-text="t$('sellAmApp.ligneCmdFournisseur.home.refreshListLabel')"></span>
        </button>
        <router-link :to="{ name: 'LigneCmdFournisseurCreate' }" custom v-slot="{ navigate }">
          <button
            @click="navigate"
            id="jh-create-entity"
            data-cy="entityCreateButton"
            class="btn btn-primary jh-create-entity create-ligne-cmd-fournisseur"
          >
            <font-awesome-icon icon="plus"></font-awesome-icon>
            <span v-text="t$('sellAmApp.ligneCmdFournisseur.home.createLabel')"></span>
          </button>
        </router-link>
      </div>
    </h2>
    <br />
    <div class="alert alert-warning" v-if="!isFetching && ligneCmdFournisseurs && ligneCmdFournisseurs.length === 0">
      <span v-text="t$('sellAmApp.ligneCmdFournisseur.home.notFound')"></span>
    </div>
    <div class="table-responsive" v-if="ligneCmdFournisseurs && ligneCmdFournisseurs.length > 0">
      <table class="table table-striped" aria-describedby="ligneCmdFournisseurs">
        <thead>
          <tr>
            <th scope="row"><span v-text="t$('global.field.id')"></span></th>
            <th scope="row"><span v-text="t$('sellAmApp.ligneCmdFournisseur.quantite')"></span></th>
            <th scope="row"><span v-text="t$('sellAmApp.ligneCmdFournisseur.prixUnitaire')"></span></th>
            <th scope="row"><span v-text="t$('sellAmApp.ligneCmdFournisseur.dateLivraisonPrevu')"></span></th>
            <th scope="row"><span v-text="t$('sellAmApp.ligneCmdFournisseur.montantTotal')"></span></th>
            <th scope="row"><span v-text="t$('sellAmApp.ligneCmdFournisseur.commentaire')"></span></th>
            <th scope="row"><span v-text="t$('sellAmApp.ligneCmdFournisseur.statutCmd')"></span></th>
            <th scope="row"><span v-text="t$('sellAmApp.ligneCmdFournisseur.cmdFournisseur')"></span></th>
            <th scope="row"><span v-text="t$('sellAmApp.ligneCmdFournisseur.article')"></span></th>
            <th scope="row"></th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="ligneCmdFournisseur in ligneCmdFournisseurs" :key="ligneCmdFournisseur.id" data-cy="entityTable">
            <td>
              <router-link :to="{ name: 'LigneCmdFournisseurView', params: { ligneCmdFournisseurId: ligneCmdFournisseur.id } }">{{
                ligneCmdFournisseur.id
              }}</router-link>
            </td>
            <td>{{ ligneCmdFournisseur.quantite }}</td>
            <td>{{ ligneCmdFournisseur.prixUnitaire }}</td>
            <td>{{ formatDateShort(ligneCmdFournisseur.dateLivraisonPrevu) || '' }}</td>
            <td>{{ ligneCmdFournisseur.montantTotal }}</td>
            <td>{{ ligneCmdFournisseur.commentaire }}</td>
            <td v-text="t$('sellAmApp.StatutCmd.' + ligneCmdFournisseur.statutCmd)"></td>
            <td>
              <div v-if="ligneCmdFournisseur.cmdFournisseur">
                <router-link :to="{ name: 'CmdFournisseurView', params: { cmdFournisseurId: ligneCmdFournisseur.cmdFournisseur.id } }">{{
                  ligneCmdFournisseur.cmdFournisseur.id
                }}</router-link>
              </div>
            </td>
            <td>
              <div v-if="ligneCmdFournisseur.article">
                <router-link :to="{ name: 'ArticleView', params: { articleId: ligneCmdFournisseur.article.id } }">{{
                  ligneCmdFournisseur.article.id
                }}</router-link>
              </div>
            </td>
            <td class="text-right">
              <div class="btn-group">
                <router-link
                  :to="{ name: 'LigneCmdFournisseurView', params: { ligneCmdFournisseurId: ligneCmdFournisseur.id } }"
                  custom
                  v-slot="{ navigate }"
                >
                  <button @click="navigate" class="btn btn-info btn-sm details" data-cy="entityDetailsButton">
                    <font-awesome-icon icon="eye"></font-awesome-icon>
                    <span class="d-none d-md-inline" v-text="t$('entity.action.view')"></span>
                  </button>
                </router-link>
                <router-link
                  :to="{ name: 'LigneCmdFournisseurEdit', params: { ligneCmdFournisseurId: ligneCmdFournisseur.id } }"
                  custom
                  v-slot="{ navigate }"
                >
                  <button @click="navigate" class="btn btn-primary btn-sm edit" data-cy="entityEditButton">
                    <font-awesome-icon icon="pencil-alt"></font-awesome-icon>
                    <span class="d-none d-md-inline" v-text="t$('entity.action.edit')"></span>
                  </button>
                </router-link>
                <b-button
                  v-on:click="prepareRemove(ligneCmdFournisseur)"
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
        <span
          id="sellAmApp.ligneCmdFournisseur.delete.question"
          data-cy="ligneCmdFournisseurDeleteDialogHeading"
          v-text="t$('entity.delete.title')"
        ></span>
      </template>
      <div class="modal-body">
        <p id="jhi-delete-ligneCmdFournisseur-heading" v-text="t$('sellAmApp.ligneCmdFournisseur.delete.question', { id: removeId })"></p>
      </div>
      <template #modal-footer>
        <div>
          <button type="button" class="btn btn-secondary" v-text="t$('entity.action.cancel')" v-on:click="closeDialog()"></button>
          <button
            type="button"
            class="btn btn-primary"
            id="jhi-confirm-delete-ligneCmdFournisseur"
            data-cy="entityConfirmDeleteButton"
            v-text="t$('entity.action.delete')"
            v-on:click="removeLigneCmdFournisseur()"
          ></button>
        </div>
      </template>
    </b-modal>
  </div>
</template>

<script lang="ts" src="./ligne-cmd-fournisseur.component.ts"></script>
