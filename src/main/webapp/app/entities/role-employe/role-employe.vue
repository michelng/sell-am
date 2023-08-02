<template>
  <div>
    <h2 id="page-heading" data-cy="RoleEmployeHeading">
      <span v-text="t$('sellAmApp.roleEmploye.home.title')" id="role-employe-heading"></span>
      <div class="d-flex justify-content-end">
        <button class="btn btn-info mr-2" v-on:click="handleSyncList" :disabled="isFetching">
          <font-awesome-icon icon="sync" :spin="isFetching"></font-awesome-icon>
          <span v-text="t$('sellAmApp.roleEmploye.home.refreshListLabel')"></span>
        </button>
        <router-link :to="{ name: 'RoleEmployeCreate' }" custom v-slot="{ navigate }">
          <button
            @click="navigate"
            id="jh-create-entity"
            data-cy="entityCreateButton"
            class="btn btn-primary jh-create-entity create-role-employe"
          >
            <font-awesome-icon icon="plus"></font-awesome-icon>
            <span v-text="t$('sellAmApp.roleEmploye.home.createLabel')"></span>
          </button>
        </router-link>
      </div>
    </h2>
    <br />
    <div class="alert alert-warning" v-if="!isFetching && roleEmployes && roleEmployes.length === 0">
      <span v-text="t$('sellAmApp.roleEmploye.home.notFound')"></span>
    </div>
    <div class="table-responsive" v-if="roleEmployes && roleEmployes.length > 0">
      <table class="table table-striped" aria-describedby="roleEmployes">
        <thead>
          <tr>
            <th scope="row"><span v-text="t$('global.field.id')"></span></th>
            <th scope="row"><span v-text="t$('sellAmApp.roleEmploye.roleName')"></span></th>
            <th scope="row"></th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="roleEmploye in roleEmployes" :key="roleEmploye.id" data-cy="entityTable">
            <td>
              <router-link :to="{ name: 'RoleEmployeView', params: { roleEmployeId: roleEmploye.id } }">{{ roleEmploye.id }}</router-link>
            </td>
            <td>{{ roleEmploye.roleName }}</td>
            <td class="text-right">
              <div class="btn-group">
                <router-link :to="{ name: 'RoleEmployeView', params: { roleEmployeId: roleEmploye.id } }" custom v-slot="{ navigate }">
                  <button @click="navigate" class="btn btn-info btn-sm details" data-cy="entityDetailsButton">
                    <font-awesome-icon icon="eye"></font-awesome-icon>
                    <span class="d-none d-md-inline" v-text="t$('entity.action.view')"></span>
                  </button>
                </router-link>
                <router-link :to="{ name: 'RoleEmployeEdit', params: { roleEmployeId: roleEmploye.id } }" custom v-slot="{ navigate }">
                  <button @click="navigate" class="btn btn-primary btn-sm edit" data-cy="entityEditButton">
                    <font-awesome-icon icon="pencil-alt"></font-awesome-icon>
                    <span class="d-none d-md-inline" v-text="t$('entity.action.edit')"></span>
                  </button>
                </router-link>
                <b-button
                  v-on:click="prepareRemove(roleEmploye)"
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
        <span id="sellAmApp.roleEmploye.delete.question" data-cy="roleEmployeDeleteDialogHeading" v-text="t$('entity.delete.title')"></span>
      </template>
      <div class="modal-body">
        <p id="jhi-delete-roleEmploye-heading" v-text="t$('sellAmApp.roleEmploye.delete.question', { id: removeId })"></p>
      </div>
      <template #modal-footer>
        <div>
          <button type="button" class="btn btn-secondary" v-text="t$('entity.action.cancel')" v-on:click="closeDialog()"></button>
          <button
            type="button"
            class="btn btn-primary"
            id="jhi-confirm-delete-roleEmploye"
            data-cy="entityConfirmDeleteButton"
            v-text="t$('entity.action.delete')"
            v-on:click="removeRoleEmploye()"
          ></button>
        </div>
      </template>
    </b-modal>
  </div>
</template>

<script lang="ts" src="./role-employe.component.ts"></script>
