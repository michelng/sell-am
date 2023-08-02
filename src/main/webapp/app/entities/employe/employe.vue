<template>
  <div>
    <h2 id="page-heading" data-cy="EmployeHeading">
      <span v-text="t$('sellAmApp.employe.home.title')" id="employe-heading"></span>
      <div class="d-flex justify-content-end">
        <button class="btn btn-info mr-2" v-on:click="handleSyncList" :disabled="isFetching">
          <font-awesome-icon icon="sync" :spin="isFetching"></font-awesome-icon>
          <span v-text="t$('sellAmApp.employe.home.refreshListLabel')"></span>
        </button>
        <router-link :to="{ name: 'EmployeCreate' }" custom v-slot="{ navigate }">
          <button
            @click="navigate"
            id="jh-create-entity"
            data-cy="entityCreateButton"
            class="btn btn-primary jh-create-entity create-employe"
          >
            <font-awesome-icon icon="plus"></font-awesome-icon>
            <span v-text="t$('sellAmApp.employe.home.createLabel')"></span>
          </button>
        </router-link>
      </div>
    </h2>
    <br />
    <div class="alert alert-warning" v-if="!isFetching && employes && employes.length === 0">
      <span v-text="t$('sellAmApp.employe.home.notFound')"></span>
    </div>
    <div class="table-responsive" v-if="employes && employes.length > 0">
      <table class="table table-striped" aria-describedby="employes">
        <thead>
          <tr>
            <th scope="row"><span v-text="t$('global.field.id')"></span></th>
            <th scope="row"><span v-text="t$('sellAmApp.employe.identifiant')"></span></th>
            <th scope="row"><span v-text="t$('sellAmApp.employe.nom')"></span></th>
            <th scope="row"><span v-text="t$('sellAmApp.employe.prenom')"></span></th>
            <th scope="row"><span v-text="t$('sellAmApp.employe.dateNaissance')"></span></th>
            <th scope="row"><span v-text="t$('sellAmApp.employe.dateEmbauche')"></span></th>
            <th scope="row"><span v-text="t$('sellAmApp.employe.telephone1')"></span></th>
            <th scope="row"><span v-text="t$('sellAmApp.employe.telephone2')"></span></th>
            <th scope="row"><span v-text="t$('sellAmApp.employe.email')"></span></th>
            <th scope="row"><span v-text="t$('sellAmApp.employe.salaire')"></span></th>
            <th scope="row"><span v-text="t$('sellAmApp.employe.photo')"></span></th>
            <th scope="row"><span v-text="t$('sellAmApp.employe.fonction')"></span></th>
            <th scope="row"><span v-text="t$('sellAmApp.employe.statutEmploi')"></span></th>
            <th scope="row"><span v-text="t$('sellAmApp.employe.statut')"></span></th>
            <th scope="row"><span v-text="t$('sellAmApp.employe.entreprise')"></span></th>
            <th scope="row"></th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="employe in employes" :key="employe.id" data-cy="entityTable">
            <td>
              <router-link :to="{ name: 'EmployeView', params: { employeId: employe.id } }">{{ employe.id }}</router-link>
            </td>
            <td>{{ employe.identifiant }}</td>
            <td>{{ employe.nom }}</td>
            <td>{{ employe.prenom }}</td>
            <td>{{ formatDateShort(employe.dateNaissance) || '' }}</td>
            <td>{{ formatDateShort(employe.dateEmbauche) || '' }}</td>
            <td>{{ employe.telephone1 }}</td>
            <td>{{ employe.telephone2 }}</td>
            <td>{{ employe.email }}</td>
            <td>{{ employe.salaire }}</td>
            <td>{{ employe.photo }}</td>
            <td>{{ employe.fonction }}</td>
            <td v-text="t$('sellAmApp.StatutEmploi.' + employe.statutEmploi)"></td>
            <td v-text="t$('sellAmApp.Statut.' + employe.statut)"></td>
            <td>
              <div v-if="employe.entreprise">
                <router-link :to="{ name: 'EntrepriseView', params: { entrepriseId: employe.entreprise.id } }">{{
                  employe.entreprise.id
                }}</router-link>
              </div>
            </td>
            <td class="text-right">
              <div class="btn-group">
                <router-link :to="{ name: 'EmployeView', params: { employeId: employe.id } }" custom v-slot="{ navigate }">
                  <button @click="navigate" class="btn btn-info btn-sm details" data-cy="entityDetailsButton">
                    <font-awesome-icon icon="eye"></font-awesome-icon>
                    <span class="d-none d-md-inline" v-text="t$('entity.action.view')"></span>
                  </button>
                </router-link>
                <router-link :to="{ name: 'EmployeEdit', params: { employeId: employe.id } }" custom v-slot="{ navigate }">
                  <button @click="navigate" class="btn btn-primary btn-sm edit" data-cy="entityEditButton">
                    <font-awesome-icon icon="pencil-alt"></font-awesome-icon>
                    <span class="d-none d-md-inline" v-text="t$('entity.action.edit')"></span>
                  </button>
                </router-link>
                <b-button
                  v-on:click="prepareRemove(employe)"
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
        <span id="sellAmApp.employe.delete.question" data-cy="employeDeleteDialogHeading" v-text="t$('entity.delete.title')"></span>
      </template>
      <div class="modal-body">
        <p id="jhi-delete-employe-heading" v-text="t$('sellAmApp.employe.delete.question', { id: removeId })"></p>
      </div>
      <template #modal-footer>
        <div>
          <button type="button" class="btn btn-secondary" v-text="t$('entity.action.cancel')" v-on:click="closeDialog()"></button>
          <button
            type="button"
            class="btn btn-primary"
            id="jhi-confirm-delete-employe"
            data-cy="entityConfirmDeleteButton"
            v-text="t$('entity.action.delete')"
            v-on:click="removeEmploye()"
          ></button>
        </div>
      </template>
    </b-modal>
  </div>
</template>

<script lang="ts" src="./employe.component.ts"></script>
