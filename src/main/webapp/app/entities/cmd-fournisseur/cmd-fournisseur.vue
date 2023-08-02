<template>
  <div>
    <h2 id="page-heading" data-cy="CmdFournisseurHeading">
      <span v-text="t$('sellAmApp.cmdFournisseur.home.title')" id="cmd-fournisseur-heading"></span>
      <div class="d-flex justify-content-end">
        <button class="btn btn-info mr-2" v-on:click="handleSyncList" :disabled="isFetching">
          <font-awesome-icon icon="sync" :spin="isFetching"></font-awesome-icon>
          <span v-text="t$('sellAmApp.cmdFournisseur.home.refreshListLabel')"></span>
        </button>
        <router-link :to="{ name: 'CmdFournisseurCreate' }" custom v-slot="{ navigate }">
          <button
            @click="navigate"
            id="jh-create-entity"
            data-cy="entityCreateButton"
            class="btn btn-primary jh-create-entity create-cmd-fournisseur"
          >
            <font-awesome-icon icon="plus"></font-awesome-icon>
            <span v-text="t$('sellAmApp.cmdFournisseur.home.createLabel')"></span>
          </button>
        </router-link>
      </div>
    </h2>
    <br />
    <div class="alert alert-warning" v-if="!isFetching && cmdFournisseurs && cmdFournisseurs.length === 0">
      <span v-text="t$('sellAmApp.cmdFournisseur.home.notFound')"></span>
    </div>
    <div class="table-responsive" v-if="cmdFournisseurs && cmdFournisseurs.length > 0">
      <table class="table table-striped" aria-describedby="cmdFournisseurs">
        <thead>
          <tr>
            <th scope="row"><span v-text="t$('global.field.id')"></span></th>
            <th scope="row"><span v-text="t$('sellAmApp.cmdFournisseur.code')"></span></th>
            <th scope="row"><span v-text="t$('sellAmApp.cmdFournisseur.dateCommande')"></span></th>
            <th scope="row"><span v-text="t$('sellAmApp.cmdFournisseur.dateLivraisonPrevue')"></span></th>
            <th scope="row"><span v-text="t$('sellAmApp.cmdFournisseur.montantTotal')"></span></th>
            <th scope="row"><span v-text="t$('sellAmApp.cmdFournisseur.commentaire')"></span></th>
            <th scope="row"><span v-text="t$('sellAmApp.cmdFournisseur.statutCmd')"></span></th>
            <th scope="row"><span v-text="t$('sellAmApp.cmdFournisseur.fournisseur')"></span></th>
            <th scope="row"></th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="cmdFournisseur in cmdFournisseurs" :key="cmdFournisseur.id" data-cy="entityTable">
            <td>
              <router-link :to="{ name: 'CmdFournisseurView', params: { cmdFournisseurId: cmdFournisseur.id } }">{{
                cmdFournisseur.id
              }}</router-link>
            </td>
            <td>{{ cmdFournisseur.code }}</td>
            <td>{{ formatDateShort(cmdFournisseur.dateCommande) || '' }}</td>
            <td>{{ formatDateShort(cmdFournisseur.dateLivraisonPrevue) || '' }}</td>
            <td>{{ cmdFournisseur.montantTotal }}</td>
            <td>{{ cmdFournisseur.commentaire }}</td>
            <td v-text="t$('sellAmApp.StatutCmd.' + cmdFournisseur.statutCmd)"></td>
            <td>
              <div v-if="cmdFournisseur.fournisseur">
                <router-link :to="{ name: 'FournisseurView', params: { fournisseurId: cmdFournisseur.fournisseur.id } }">{{
                  cmdFournisseur.fournisseur.id
                }}</router-link>
              </div>
            </td>
            <td class="text-right">
              <div class="btn-group">
                <router-link
                  :to="{ name: 'CmdFournisseurView', params: { cmdFournisseurId: cmdFournisseur.id } }"
                  custom
                  v-slot="{ navigate }"
                >
                  <button @click="navigate" class="btn btn-info btn-sm details" data-cy="entityDetailsButton">
                    <font-awesome-icon icon="eye"></font-awesome-icon>
                    <span class="d-none d-md-inline" v-text="t$('entity.action.view')"></span>
                  </button>
                </router-link>
                <router-link
                  :to="{ name: 'CmdFournisseurEdit', params: { cmdFournisseurId: cmdFournisseur.id } }"
                  custom
                  v-slot="{ navigate }"
                >
                  <button @click="navigate" class="btn btn-primary btn-sm edit" data-cy="entityEditButton">
                    <font-awesome-icon icon="pencil-alt"></font-awesome-icon>
                    <span class="d-none d-md-inline" v-text="t$('entity.action.edit')"></span>
                  </button>
                </router-link>
                <b-button
                  v-on:click="prepareRemove(cmdFournisseur)"
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
          id="sellAmApp.cmdFournisseur.delete.question"
          data-cy="cmdFournisseurDeleteDialogHeading"
          v-text="t$('entity.delete.title')"
        ></span>
      </template>
      <div class="modal-body">
        <p id="jhi-delete-cmdFournisseur-heading" v-text="t$('sellAmApp.cmdFournisseur.delete.question', { id: removeId })"></p>
      </div>
      <template #modal-footer>
        <div>
          <button type="button" class="btn btn-secondary" v-text="t$('entity.action.cancel')" v-on:click="closeDialog()"></button>
          <button
            type="button"
            class="btn btn-primary"
            id="jhi-confirm-delete-cmdFournisseur"
            data-cy="entityConfirmDeleteButton"
            v-text="t$('entity.action.delete')"
            v-on:click="removeCmdFournisseur()"
          ></button>
        </div>
      </template>
    </b-modal>
  </div>
</template>

<script lang="ts" src="./cmd-fournisseur.component.ts"></script>
