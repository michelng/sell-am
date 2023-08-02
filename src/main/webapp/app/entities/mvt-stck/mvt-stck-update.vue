<template>
  <div class="row justify-content-center">
    <div class="col-8">
      <form name="editForm" role="form" novalidate v-on:submit.prevent="save()">
        <h2
          id="sellAmApp.mvtStck.home.createOrEditLabel"
          data-cy="MvtStckCreateUpdateHeading"
          v-text="t$('sellAmApp.mvtStck.home.createOrEditLabel')"
        ></h2>
        <div>
          <div class="form-group" v-if="mvtStck.id">
            <label for="id" v-text="t$('global.field.id')"></label>
            <input type="text" class="form-control" id="id" name="id" v-model="mvtStck.id" readonly />
          </div>
          <div class="form-group">
            <label class="form-control-label" v-text="t$('sellAmApp.mvtStck.dateMvnt')" for="mvt-stck-dateMvnt"></label>
            <div class="d-flex">
              <input
                id="mvt-stck-dateMvnt"
                data-cy="dateMvnt"
                type="datetime-local"
                class="form-control"
                name="dateMvnt"
                :class="{ valid: !v$.dateMvnt.$invalid, invalid: v$.dateMvnt.$invalid }"
                :value="convertDateTimeFromServer(v$.dateMvnt.$model)"
                @change="updateInstantField('dateMvnt', $event)"
              />
            </div>
          </div>
          <div class="form-group">
            <label class="form-control-label" v-text="t$('sellAmApp.mvtStck.quantite')" for="mvt-stck-quantite"></label>
            <input
              type="number"
              class="form-control"
              name="quantite"
              id="mvt-stck-quantite"
              data-cy="quantite"
              :class="{ valid: !v$.quantite.$invalid, invalid: v$.quantite.$invalid }"
              v-model.number="v$.quantite.$model"
            />
          </div>
          <div class="form-group">
            <label class="form-control-label" v-text="t$('sellAmApp.mvtStck.typeMvt')" for="mvt-stck-typeMvt"></label>
            <select
              class="form-control"
              name="typeMvt"
              :class="{ valid: !v$.typeMvt.$invalid, invalid: v$.typeMvt.$invalid }"
              v-model="v$.typeMvt.$model"
              id="mvt-stck-typeMvt"
              data-cy="typeMvt"
            >
              <option
                v-for="typeMvt in typeMvtValues"
                :key="typeMvt"
                v-bind:value="typeMvt"
                v-bind:label="t$('sellAmApp.TypeMvt.' + typeMvt)"
              >
                {{ typeMvt }}
              </option>
            </select>
          </div>
          <div class="form-group">
            <label class="form-control-label" v-text="t$('sellAmApp.mvtStck.article')" for="mvt-stck-article"></label>
            <select class="form-control" id="mvt-stck-article" data-cy="article" name="article" v-model="mvtStck.article">
              <option v-bind:value="null"></option>
              <option
                v-bind:value="mvtStck.article && articleOption.id === mvtStck.article.id ? mvtStck.article : articleOption"
                v-for="articleOption in articles"
                :key="articleOption.id"
              >
                {{ articleOption.id }}
              </option>
            </select>
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
<script lang="ts" src="./mvt-stck-update.component.ts"></script>
