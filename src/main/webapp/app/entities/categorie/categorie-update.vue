<template>
  <div class="row justify-content-center">
    <div class="col-8">
      <form name="editForm" role="form" novalidate v-on:submit.prevent="save()">
        <h2
          id="sellAmApp.categorie.home.createOrEditLabel"
          data-cy="CategorieCreateUpdateHeading"
          v-text="t$('sellAmApp.categorie.home.createOrEditLabel')"
        ></h2>
        <div>
          <div class="form-group" v-if="categorie.id">
            <label for="id" v-text="t$('global.field.id')"></label>
            <input type="text" class="form-control" id="id" name="id" v-model="categorie.id" readonly />
          </div>
          <div class="form-group">
            <label class="form-control-label" v-text="t$('sellAmApp.categorie.code')" for="categorie-code"></label>
            <input
              type="text"
              class="form-control"
              name="code"
              id="categorie-code"
              data-cy="code"
              :class="{ valid: !v$.code.$invalid, invalid: v$.code.$invalid }"
              v-model="v$.code.$model"
            />
          </div>
          <div class="form-group">
            <label class="form-control-label" v-text="t$('sellAmApp.categorie.designation')" for="categorie-designation"></label>
            <input
              type="text"
              class="form-control"
              name="designation"
              id="categorie-designation"
              data-cy="designation"
              :class="{ valid: !v$.designation.$invalid, invalid: v$.designation.$invalid }"
              v-model="v$.designation.$model"
            />
          </div>
          <div class="form-group">
            <label class="form-control-label" v-text="t$('sellAmApp.categorie.description')" for="categorie-description"></label>
            <input
              type="text"
              class="form-control"
              name="description"
              id="categorie-description"
              data-cy="description"
              :class="{ valid: !v$.description.$invalid, invalid: v$.description.$invalid }"
              v-model="v$.description.$model"
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
<script lang="ts" src="./categorie-update.component.ts"></script>
