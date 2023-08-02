<template>
  <div>
    <h2 id="page-heading" data-cy="LigneCmdClientHeading">
      <span v-text="t$('sellAmApp.ligneCmdClient.home.title')" id="ligne-cmd-client-heading"></span>
      <div class="d-flex justify-content-end">
        <button class="btn btn-info mr-2" v-on:click="handleSyncList" :disabled="isFetching">
          <font-awesome-icon icon="sync" :spin="isFetching"></font-awesome-icon>
          <span v-text="t$('sellAmApp.ligneCmdClient.home.refreshListLabel')"></span>
        </button>
        <router-link :to="{ name: 'LigneCmdClientCreate' }" custom v-slot="{ navigate }">
          <button
            @click="navigate"
            id="jh-create-entity"
            data-cy="entityCreateButton"
            class="btn btn-primary jh-create-entity create-ligne-cmd-client"
          >
            <font-awesome-icon icon="plus"></font-awesome-icon>
            <span v-text="t$('sellAmApp.ligneCmdClient.home.createLabel')"></span>
          </button>
        </router-link>
      </div>
    </h2>
    <br />
    <div class="alert alert-warning" v-if="!isFetching && ligneCmdClients && ligneCmdClients.length === 0">
      <span v-text="t$('sellAmApp.ligneCmdClient.home.notFound')"></span>
    </div>
    <div class="table-responsive" v-if="ligneCmdClients && ligneCmdClients.length > 0">
      <table class="table table-striped" aria-describedby="ligneCmdClients">
        <thead>
          <tr>
            <th scope="row"><span v-text="t$('global.field.id')"></span></th>
            <th scope="row"><span v-text="t$('sellAmApp.ligneCmdClient.quantite')"></span></th>
            <th scope="row"><span v-text="t$('sellAmApp.ligneCmdClient.prixUnitaire')"></span></th>
            <th scope="row"><span v-text="t$('sellAmApp.ligneCmdClient.dateLivraisonPrevue')"></span></th>
            <th scope="row"><span v-text="t$('sellAmApp.ligneCmdClient.montantTotal')"></span></th>
            <th scope="row"><span v-text="t$('sellAmApp.ligneCmdClient.commentaire')"></span></th>
            <th scope="row"><span v-text="t$('sellAmApp.ligneCmdClient.statutCmd')"></span></th>
            <th scope="row"><span v-text="t$('sellAmApp.ligneCmdClient.cmdClient')"></span></th>
            <th scope="row"><span v-text="t$('sellAmApp.ligneCmdClient.article')"></span></th>
            <th scope="row"></th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="ligneCmdClient in ligneCmdClients" :key="ligneCmdClient.id" data-cy="entityTable">
            <td>
              <router-link :to="{ name: 'LigneCmdClientView', params: { ligneCmdClientId: ligneCmdClient.id } }">{{
                ligneCmdClient.id
              }}</router-link>
            </td>
            <td>{{ ligneCmdClient.quantite }}</td>
            <td>{{ ligneCmdClient.prixUnitaire }}</td>
            <td>{{ formatDateShort(ligneCmdClient.dateLivraisonPrevue) || '' }}</td>
            <td>{{ ligneCmdClient.montantTotal }}</td>
            <td>{{ ligneCmdClient.commentaire }}</td>
            <td v-text="t$('sellAmApp.StatutCmd.' + ligneCmdClient.statutCmd)"></td>
            <td>
              <div v-if="ligneCmdClient.cmdClient">
                <router-link :to="{ name: 'CmdClientView', params: { cmdClientId: ligneCmdClient.cmdClient.id } }">{{
                  ligneCmdClient.cmdClient.id
                }}</router-link>
              </div>
            </td>
            <td>
              <div v-if="ligneCmdClient.article">
                <router-link :to="{ name: 'ArticleView', params: { articleId: ligneCmdClient.article.id } }">{{
                  ligneCmdClient.article.id
                }}</router-link>
              </div>
            </td>
            <td class="text-right">
              <div class="btn-group">
                <router-link
                  :to="{ name: 'LigneCmdClientView', params: { ligneCmdClientId: ligneCmdClient.id } }"
                  custom
                  v-slot="{ navigate }"
                >
                  <button @click="navigate" class="btn btn-info btn-sm details" data-cy="entityDetailsButton">
                    <font-awesome-icon icon="eye"></font-awesome-icon>
                    <span class="d-none d-md-inline" v-text="t$('entity.action.view')"></span>
                  </button>
                </router-link>
                <router-link
                  :to="{ name: 'LigneCmdClientEdit', params: { ligneCmdClientId: ligneCmdClient.id } }"
                  custom
                  v-slot="{ navigate }"
                >
                  <button @click="navigate" class="btn btn-primary btn-sm edit" data-cy="entityEditButton">
                    <font-awesome-icon icon="pencil-alt"></font-awesome-icon>
                    <span class="d-none d-md-inline" v-text="t$('entity.action.edit')"></span>
                  </button>
                </router-link>
                <b-button
                  v-on:click="prepareRemove(ligneCmdClient)"
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
          id="sellAmApp.ligneCmdClient.delete.question"
          data-cy="ligneCmdClientDeleteDialogHeading"
          v-text="t$('entity.delete.title')"
        ></span>
      </template>
      <div class="modal-body">
        <p id="jhi-delete-ligneCmdClient-heading" v-text="t$('sellAmApp.ligneCmdClient.delete.question', { id: removeId })"></p>
      </div>
      <template #modal-footer>
        <div>
          <button type="button" class="btn btn-secondary" v-text="t$('entity.action.cancel')" v-on:click="closeDialog()"></button>
          <button
            type="button"
            class="btn btn-primary"
            id="jhi-confirm-delete-ligneCmdClient"
            data-cy="entityConfirmDeleteButton"
            v-text="t$('entity.action.delete')"
            v-on:click="removeLigneCmdClient()"
          ></button>
        </div>
      </template>
    </b-modal>
  </div>
</template>

<script lang="ts" src="./ligne-cmd-client.component.ts"></script>
