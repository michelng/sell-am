<template>
  <div class="row justify-content-center">
    <div class="col-8">
      <form name="editForm" role="form" novalidate v-on:submit.prevent="save()">
        <h2
          id="sellAmApp.cmdClient.home.createOrEditLabel"
          data-cy="CmdClientCreateUpdateHeading"
          v-text="t$('sellAmApp.cmdClient.home.createOrEditLabel')"
        ></h2>
        <div>
          <div class="form-group" v-if="cmdClient.id">
            <label for="id" v-text="t$('global.field.id')"></label>
            <input type="text" class="form-control" id="id" name="id" v-model="cmdClient.id" readonly />
          </div>
          <div class="form-group">
            <label class="form-control-label" v-text="t$('sellAmApp.cmdClient.code')" for="cmd-client-code"></label>
            <input
              type="text"
              class="form-control"
              name="code"
              id="cmd-client-code"
              data-cy="code"
              :class="{ valid: !v$.code.$invalid, invalid: v$.code.$invalid }"
              v-model="v$.code.$model"
            />
          </div>
          <div class="form-group">
            <label class="form-control-label" v-text="t$('sellAmApp.cmdClient.dateCommande')" for="cmd-client-dateCommande"></label>
            <div class="d-flex">
              <input
                id="cmd-client-dateCommande"
                data-cy="dateCommande"
                type="datetime-local"
                class="form-control"
                name="dateCommande"
                :class="{ valid: !v$.dateCommande.$invalid, invalid: v$.dateCommande.$invalid }"
                :value="convertDateTimeFromServer(v$.dateCommande.$model)"
                @change="updateInstantField('dateCommande', $event)"
              />
            </div>
          </div>
          <div class="form-group">
            <label
              class="form-control-label"
              v-text="t$('sellAmApp.cmdClient.dateLivraisonPrevue')"
              for="cmd-client-dateLivraisonPrevue"
            ></label>
            <div class="d-flex">
              <input
                id="cmd-client-dateLivraisonPrevue"
                data-cy="dateLivraisonPrevue"
                type="datetime-local"
                class="form-control"
                name="dateLivraisonPrevue"
                :class="{ valid: !v$.dateLivraisonPrevue.$invalid, invalid: v$.dateLivraisonPrevue.$invalid }"
                :value="convertDateTimeFromServer(v$.dateLivraisonPrevue.$model)"
                @change="updateInstantField('dateLivraisonPrevue', $event)"
              />
            </div>
          </div>
          <div class="form-group">
            <label class="form-control-label" v-text="t$('sellAmApp.cmdClient.montantTotal')" for="cmd-client-montantTotal"></label>
            <input
              type="number"
              class="form-control"
              name="montantTotal"
              id="cmd-client-montantTotal"
              data-cy="montantTotal"
              :class="{ valid: !v$.montantTotal.$invalid, invalid: v$.montantTotal.$invalid }"
              v-model.number="v$.montantTotal.$model"
            />
          </div>
          <div class="form-group">
            <label class="form-control-label" v-text="t$('sellAmApp.cmdClient.commentaire')" for="cmd-client-commentaire"></label>
            <input
              type="text"
              class="form-control"
              name="commentaire"
              id="cmd-client-commentaire"
              data-cy="commentaire"
              :class="{ valid: !v$.commentaire.$invalid, invalid: v$.commentaire.$invalid }"
              v-model="v$.commentaire.$model"
            />
          </div>
          <div class="form-group">
            <label class="form-control-label" v-text="t$('sellAmApp.cmdClient.statutCmd')" for="cmd-client-statutCmd"></label>
            <select
              class="form-control"
              name="statutCmd"
              :class="{ valid: !v$.statutCmd.$invalid, invalid: v$.statutCmd.$invalid }"
              v-model="v$.statutCmd.$model"
              id="cmd-client-statutCmd"
              data-cy="statutCmd"
            >
              <option
                v-for="statutCmd in statutCmdValues"
                :key="statutCmd"
                v-bind:value="statutCmd"
                v-bind:label="t$('sellAmApp.StatutCmd.' + statutCmd)"
              >
                {{ statutCmd }}
              </option>
            </select>
          </div>
          <div class="form-group">
            <label class="form-control-label" v-text="t$('sellAmApp.cmdClient.client')" for="cmd-client-client"></label>
            <select class="form-control" id="cmd-client-client" data-cy="client" name="client" v-model="cmdClient.client">
              <option v-bind:value="null"></option>
              <option
                v-bind:value="cmdClient.client && clientOption.id === cmdClient.client.id ? cmdClient.client : clientOption"
                v-for="clientOption in clients"
                :key="clientOption.id"
              >
                {{ clientOption.id }}
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
<script lang="ts" src="./cmd-client-update.component.ts"></script>
