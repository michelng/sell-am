<template>
  <div class="row justify-content-center">
    <div class="col-8">
      <form name="editForm" role="form" novalidate v-on:submit.prevent="save()">
        <h2
          id="sellAmApp.roleEmploye.home.createOrEditLabel"
          data-cy="RoleEmployeCreateUpdateHeading"
          v-text="t$('sellAmApp.roleEmploye.home.createOrEditLabel')"
        ></h2>
        <div>
          <div class="form-group" v-if="roleEmploye.id">
            <label for="id" v-text="t$('global.field.id')"></label>
            <input type="text" class="form-control" id="id" name="id" v-model="roleEmploye.id" readonly />
          </div>
          <div class="form-group">
            <label class="form-control-label" v-text="t$('sellAmApp.roleEmploye.roleName')" for="role-employe-roleName"></label>
            <input
              type="text"
              class="form-control"
              name="roleName"
              id="role-employe-roleName"
              data-cy="roleName"
              :class="{ valid: !v$.roleName.$invalid, invalid: v$.roleName.$invalid }"
              v-model="v$.roleName.$model"
            />
          </div>
        </div>
        <div>
          <button type="button" id="cancel-save" data-cy="entityCreateCancelButton" class="btn btn-secondary" v-on:click="previousState()">
            <font-awesome-icon icon="ban"></font-awesome-icon>&nbsp;<span v-text="t$('entity.action.cancel')"></span>
          </button>
          <button
            type="submit"
            id="save-entity"
            data-cy="entityCreateSaveButton"
            :disabled="v$.$invalid || isSaving"
            class="btn btn-primary"
          >
            <font-awesome-icon icon="save"></font-awesome-icon>&nbsp;<span v-text="t$('entity.action.save')"></span>
          </button>
        </div>
      </form>
    </div>
  </div>
</template>
<script lang="ts" src="./role-employe-update.component.ts"></script>
