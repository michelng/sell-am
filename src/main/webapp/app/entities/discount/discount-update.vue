<template>
  <div class="row justify-content-center">
    <div class="col-8">
      <form name="editForm" role="form" novalidate v-on:submit.prevent="save()">
        <h2
          id="sellAmApp.discount.home.createOrEditLabel"
          data-cy="DiscountCreateUpdateHeading"
          v-text="t$('sellAmApp.discount.home.createOrEditLabel')"
        ></h2>
        <div>
          <div class="form-group" v-if="discount.id">
            <label for="id" v-text="t$('global.field.id')"></label>
            <input type="text" class="form-control" id="id" name="id" v-model="discount.id" readonly />
          </div>
          <div class="form-group">
            <label class="form-control-label" v-text="t$('sellAmApp.discount.code')" for="discount-code"></label>
            <input
              type="text"
              class="form-control"
              name="code"
              id="discount-code"
              data-cy="code"
              :class="{ valid: !v$.code.$invalid, invalid: v$.code.$invalid }"
              v-model="v$.code.$model"
            />
          </div>
          <div class="form-group">
            <label class="form-control-label" v-text="t$('sellAmApp.discount.description')" for="discount-description"></label>
            <input
              type="text"
              class="form-control"
              name="description"
              id="discount-description"
              data-cy="description"
              :class="{ valid: !v$.description.$invalid, invalid: v$.description.$invalid }"
              v-model="v$.description.$model"
            />
          </div>
          <div class="form-group">
            <label class="form-control-label" v-text="t$('sellAmApp.discount.montant')" for="discount-montant"></label>
            <input
              type="number"
              class="form-control"
              name="montant"
              id="discount-montant"
              data-cy="montant"
              :class="{ valid: !v$.montant.$invalid, invalid: v$.montant.$invalid }"
              v-model.number="v$.montant.$model"
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
<script lang="ts" src="./discount-update.component.ts"></script>
