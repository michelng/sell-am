<template>
  <div class="row justify-content-center">
    <div class="col-8">
      <form name="editForm" role="form" novalidate v-on:submit.prevent="save()">
        <h2
          id="sellAmApp.promotion.home.createOrEditLabel"
          data-cy="PromotionCreateUpdateHeading"
          v-text="t$('sellAmApp.promotion.home.createOrEditLabel')"
        ></h2>
        <div>
          <div class="form-group" v-if="promotion.id">
            <label for="id" v-text="t$('global.field.id')"></label>
            <input type="text" class="form-control" id="id" name="id" v-model="promotion.id" readonly />
          </div>
          <div class="form-group">
            <label class="form-control-label" v-text="t$('sellAmApp.promotion.code')" for="promotion-code"></label>
            <input
              type="text"
              class="form-control"
              name="code"
              id="promotion-code"
              data-cy="code"
              :class="{ valid: !v$.code.$invalid, invalid: v$.code.$invalid }"
              v-model="v$.code.$model"
            />
          </div>
          <div class="form-group">
            <label class="form-control-label" v-text="t$('sellAmApp.promotion.description')" for="promotion-description"></label>
            <input
              type="text"
              class="form-control"
              name="description"
              id="promotion-description"
              data-cy="description"
              :class="{ valid: !v$.description.$invalid, invalid: v$.description.$invalid }"
              v-model="v$.description.$model"
            />
          </div>
          <div class="form-group">
            <label class="form-control-label" v-text="t$('sellAmApp.promotion.dateDebut')" for="promotion-dateDebut"></label>
            <div class="d-flex">
              <input
                id="promotion-dateDebut"
                data-cy="dateDebut"
                type="datetime-local"
                class="form-control"
                name="dateDebut"
                :class="{ valid: !v$.dateDebut.$invalid, invalid: v$.dateDebut.$invalid }"
                :value="convertDateTimeFromServer(v$.dateDebut.$model)"
                @change="updateInstantField('dateDebut', $event)"
              />
            </div>
          </div>
          <div class="form-group">
            <label class="form-control-label" v-text="t$('sellAmApp.promotion.dateFin')" for="promotion-dateFin"></label>
            <div class="d-flex">
              <input
                id="promotion-dateFin"
                data-cy="dateFin"
                type="datetime-local"
                class="form-control"
                name="dateFin"
                :class="{ valid: !v$.dateFin.$invalid, invalid: v$.dateFin.$invalid }"
                :value="convertDateTimeFromServer(v$.dateFin.$model)"
                @change="updateInstantField('dateFin', $event)"
              />
            </div>
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
<script lang="ts" src="./promotion-update.component.ts"></script>
