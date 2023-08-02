<template>
  <div class="row justify-content-center">
    <div class="col-8">
      <form name="editForm" role="form" novalidate v-on:submit.prevent="save()">
        <h2
          id="sellAmApp.cmdFournisseur.home.createOrEditLabel"
          data-cy="CmdFournisseurCreateUpdateHeading"
          v-text="t$('sellAmApp.cmdFournisseur.home.createOrEditLabel')"
        ></h2>
        <div>
          <div class="form-group" v-if="cmdFournisseur.id">
            <label for="id" v-text="t$('global.field.id')"></label>
            <input type="text" class="form-control" id="id" name="id" v-model="cmdFournisseur.id" readonly />
          </div>
          <div class="form-group">
            <label class="form-control-label" v-text="t$('sellAmApp.cmdFournisseur.code')" for="cmd-fournisseur-code"></label>
            <input
              type="text"
              class="form-control"
              name="code"
              id="cmd-fournisseur-code"
              data-cy="code"
              :class="{ valid: !v$.code.$invalid, invalid: v$.code.$invalid }"
              v-model="v$.code.$model"
            />
          </div>
          <div class="form-group">
            <label
              class="form-control-label"
              v-text="t$('sellAmApp.cmdFournisseur.dateCommande')"
              for="cmd-fournisseur-dateCommande"
            ></label>
            <div class="d-flex">
              <input
                id="cmd-fournisseur-dateCommande"
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
              v-text="t$('sellAmApp.cmdFournisseur.dateLivraisonPrevue')"
              for="cmd-fournisseur-dateLivraisonPrevue"
            ></label>
            <div class="d-flex">
              <input
                id="cmd-fournisseur-dateLivraisonPrevue"
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
            <label
              class="form-control-label"
              v-text="t$('sellAmApp.cmdFournisseur.montantTotal')"
              for="cmd-fournisseur-montantTotal"
            ></label>
            <input
              type="number"
              class="form-control"
              name="montantTotal"
              id="cmd-fournisseur-montantTotal"
              data-cy="montantTotal"
              :class="{ valid: !v$.montantTotal.$invalid, invalid: v$.montantTotal.$invalid }"
              v-model.number="v$.montantTotal.$model"
            />
          </div>
          <div class="form-group">
            <label class="form-control-label" v-text="t$('sellAmApp.cmdFournisseur.commentaire')" for="cmd-fournisseur-commentaire"></label>
            <input
              type="text"
              class="form-control"
              name="commentaire"
              id="cmd-fournisseur-commentaire"
              data-cy="commentaire"
              :class="{ valid: !v$.commentaire.$invalid, invalid: v$.commentaire.$invalid }"
              v-model="v$.commentaire.$model"
            />
          </div>
          <div class="form-group">
            <label class="form-control-label" v-text="t$('sellAmApp.cmdFournisseur.statutCmd')" for="cmd-fournisseur-statutCmd"></label>
            <select
              class="form-control"
              name="statutCmd"
              :class="{ valid: !v$.statutCmd.$invalid, invalid: v$.statutCmd.$invalid }"
              v-model="v$.statutCmd.$model"
              id="cmd-fournisseur-statutCmd"
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
            <label class="form-control-label" v-text="t$('sellAmApp.cmdFournisseur.fournisseur')" for="cmd-fournisseur-fournisseur"></label>
            <select
              class="form-control"
              id="cmd-fournisseur-fournisseur"
              data-cy="fournisseur"
              name="fournisseur"
              v-model="cmdFournisseur.fournisseur"
            >
              <option v-bind:value="null"></option>
              <option
                v-bind:value="
                  cmdFournisseur.fournisseur && fournisseurOption.id === cmdFournisseur.fournisseur.id
                    ? cmdFournisseur.fournisseur
                    : fournisseurOption
                "
                v-for="fournisseurOption in fournisseurs"
                :key="fournisseurOption.id"
              >
                {{ fournisseurOption.id }}
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
<script lang="ts" src="./cmd-fournisseur-update.component.ts"></script>
