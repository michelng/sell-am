<template>
  <div>
    <h2 id="page-heading" data-cy="CmdClientHeading">
      <span v-text="t$('sellAmApp.cmdClient.home.title')" id="cmd-client-heading"></span>
      <div class="d-flex justify-content-end">
        <button class="btn btn-info mr-2" v-on:click="handleSyncList" :disabled="isFetching">
          <font-awesome-icon icon="sync" :spin="isFetching"></font-awesome-icon>
          <span v-text="t$('sellAmApp.cmdClient.home.refreshListLabel')"></span>
        </button>
        <router-link :to="{ name: 'CmdClientCreate' }" custom v-slot="{ navigate }">
          <button
            @click="navigate"
            id="jh-create-entity"
            data-cy="entityCreateButton"
            class="btn btn-primary jh-create-entity create-cmd-client"
          >
            <font-awesome-icon icon="plus"></font-awesome-icon>
            <span v-text="t$('sellAmApp.cmdClient.home.createLabel')"></span>
          </button>
        </router-link>
      </div>
    </h2>
    <br />
    <div class="alert alert-warning" v-if="!isFetching && cmdClients && cmdClients.length === 0">
      <span v-text="t$('sellAmApp.cmdClient.home.notFound')"></span>
    </div>
    <div class="table-responsive" v-if="cmdClients && cmdClients.length > 0">
      <table class="table table-striped" aria-describedby="cmdClients">
        <thead>
          <tr>
            <th scope="row"><span v-text="t$('global.field.id')"></span></th>
            <th scope="row"><span v-text="t$('sellAmApp.cmdClient.code')"></span></th>
            <th scope="row"><span v-text="t$('sellAmApp.cmdClient.dateCommande')"></span></th>
            <th scope="row"><span v-text="t$('sellAmApp.cmdClient.dateLivraisonPrevue')"></span></th>
            <th scope="row"><span v-text="t$('sellAmApp.cmdClient.montantTotal')"></span></th>
            <th scope="row"><span v-text="t$('sellAmApp.cmdClient.commentaire')"></span></th>
            <th scope="row"><span v-text="t$('sellAmApp.cmdClient.statutCmd')"></span></th>
            <th scope="row"><span v-text="t$('sellAmApp.cmdClient.client')"></span></th>
            <th scope="row"></th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="cmdClient in cmdClients" :key="cmdClient.id" data-cy="entityTable">
            <td>
              <router-link :to="{ name: 'CmdClientView', params: { cmdClientId: cmdClient.id } }">{{ cmdClient.id }}</router-link>
            </td>
            <td>{{ cmdClient.code }}</td>
            <td>{{ formatDateShort(cmdClient.dateCommande) || '' }}</td>
            <td>{{ formatDateShort(cmdClient.dateLivraisonPrevue) || '' }}</td>
            <td>{{ cmdClient.montantTotal }}</td>
            <td>{{ cmdClient.commentaire }}</td>
            <td v-text="t$('sellAmApp.StatutCmd.' + cmdClient.statutCmd)"></td>
            <td>
              <div v-if="cmdClient.client">
                <router-link :to="{ name: 'ClientView', params: { clientId: cmdClient.client.id } }">{{ cmdClient.client.id }}</router-link>
              </div>
            </td>
            <td class="text-right">
              <div class="btn-group">
                <router-link :to="{ name: 'CmdClientView', params: { cmdClientId: cmdClient.id } }" custom v-slot="{ navigate }">
                  <button @click="navigate" class="btn btn-info btn-sm details" data-cy="entityDetailsButton">
                    <font-awesome-icon icon="eye"></font-awesome-icon>
                    <span class="d-none d-md-inline" v-text="t$('entity.action.view')"></span>
                  </button>
                </router-link>
                <router-link :to="{ name: 'CmdClientEdit', params: { cmdClientId: cmdClient.id } }" custom v-slot="{ navigate }">
                  <button @click="navigate" class="btn btn-primary btn-sm edit" data-cy="entityEditButton">
                    <font-awesome-icon icon="pencil-alt"></font-awesome-icon>
                    <span class="d-none d-md-inline" v-text="t$('entity.action.edit')"></span>
                  </button>
                </router-link>
                <b-button
                  v-on:click="prepareRemove(cmdClient)"
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
        <span id="sellAmApp.cmdClient.delete.question" data-cy="cmdClientDeleteDialogHeading" v-text="t$('entity.delete.title')"></span>
      </template>
      <div class="modal-body">
        <p id="jhi-delete-cmdClient-heading" v-text="t$('sellAmApp.cmdClient.delete.question', { id: removeId })"></p>
      </div>
      <template #modal-footer>
        <div>
          <button type="button" class="btn btn-secondary" v-text="t$('entity.action.cancel')" v-on:click="closeDialog()"></button>
          <button
            type="button"
            class="btn btn-primary"
            id="jhi-confirm-delete-cmdClient"
            data-cy="entityConfirmDeleteButton"
            v-text="t$('entity.action.delete')"
            v-on:click="removeCmdClient()"
          ></button>
        </div>
      </template>
    </b-modal>
  </div>
</template>

<script lang="ts" src="./cmd-client.component.ts"></script>
