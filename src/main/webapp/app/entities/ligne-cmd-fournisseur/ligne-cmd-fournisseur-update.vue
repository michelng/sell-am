<template>
  <div class="row justify-content-center">
    <div class="col-8">
      <form name="editForm" role="form" novalidate v-on:submit.prevent="save()">
        <h2
          id="sellAmApp.ligneCmdFournisseur.home.createOrEditLabel"
          data-cy="LigneCmdFournisseurCreateUpdateHeading"
          v-text="t$('sellAmApp.ligneCmdFournisseur.home.createOrEditLabel')"
        ></h2>
        <div>
          <div class="form-group" v-if="ligneCmdFournisseur.id">
            <label for="id" v-text="t$('global.field.id')"></label>
            <input type="text" class="form-control" id="id" name="id" v-model="ligneCmdFournisseur.id" readonly />
          </div>
          <div class="form-group">
            <label
              class="form-control-label"
              v-text="t$('sellAmApp.ligneCmdFournisseur.quantite')"
              for="ligne-cmd-fournisseur-quantite"
            ></label>
            <input
              type="number"
              class="form-control"
              name="quantite"
              id="ligne-cmd-fournisseur-quantite"
              data-cy="quantite"
              :class="{ valid: !v$.quantite.$invalid, invalid: v$.quantite.$invalid }"
              v-model.number="v$.quantite.$model"
            />
          </div>
          <div class="form-group">
            <label
              class="form-control-label"
              v-text="t$('sellAmApp.ligneCmdFournisseur.prixUnitaire')"
              for="ligne-cmd-fournisseur-prixUnitaire"
            ></label>
            <input
              type="number"
              class="form-control"
              name="prixUnitaire"
              id="ligne-cmd-fournisseur-prixUnitaire"
              data-cy="prixUnitaire"
              :class="{ valid: !v$.prixUnitaire.$invalid, invalid: v$.prixUnitaire.$invalid }"
              v-model.number="v$.prixUnitaire.$model"
            />
          </div>
          <div class="form-group">
            <label
              class="form-control-label"
              v-text="t$('sellAmApp.ligneCmdFournisseur.dateLivraisonPrevu')"
              for="ligne-cmd-fournisseur-dateLivraisonPrevu"
            ></label>
            <div class="d-flex">
              <input
                id="ligne-cmd-fournisseur-dateLivraisonPrevu"
                data-cy="dateLivraisonPrevu"
                type="datetime-local"
                class="form-control"
                name="dateLivraisonPrevu"
                :class="{ valid: !v$.dateLivraisonPrevu.$invalid, invalid: v$.dateLivraisonPrevu.$invalid }"
                :value="convertDateTimeFromServer(v$.dateLivraisonPrevu.$model)"
                @change="updateInstantField('dateLivraisonPrevu', $event)"
              />
            </div>
          </div>
          <div class="form-group">
            <label
              class="form-control-label"
              v-text="t$('sellAmApp.ligneCmdFournisseur.montantTotal')"
              for="ligne-cmd-fournisseur-montantTotal"
            ></label>
            <input
              type="number"
              class="form-control"
              name="montantTotal"
              id="ligne-cmd-fournisseur-montantTotal"
              data-cy="montantTotal"
              :class="{ valid: !v$.montantTotal.$invalid, invalid: v$.montantTotal.$invalid }"
              v-model.number="v$.montantTotal.$model"
            />
          </div>
          <div class="form-group">
            <label
              class="form-control-label"
              v-text="t$('sellAmApp.ligneCmdFournisseur.commentaire')"
              for="ligne-cmd-fournisseur-commentaire"
            ></label>
            <input
              type="text"
              class="form-control"
              name="commentaire"
              id="ligne-cmd-fournisseur-commentaire"
              data-cy="commentaire"
              :class="{ valid: !v$.commentaire.$invalid, invalid: v$.commentaire.$invalid }"
              v-model="v$.commentaire.$model"
            />
          </div>
          <div class="form-group">
            <label
              class="form-control-label"
              v-text="t$('sellAmApp.ligneCmdFournisseur.statutCmd')"
              for="ligne-cmd-fournisseur-statutCmd"
            ></label>
            <select
              class="form-control"
              name="statutCmd"
              :class="{ valid: !v$.statutCmd.$invalid, invalid: v$.statutCmd.$invalid }"
              v-model="v$.statutCmd.$model"
              id="ligne-cmd-fournisseur-statutCmd"
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
            <label
              class="form-control-label"
              v-text="t$('sellAmApp.ligneCmdFournisseur.cmdFournisseur')"
              for="ligne-cmd-fournisseur-cmdFournisseur"
            ></label>
            <select
              class="form-control"
              id="ligne-cmd-fournisseur-cmdFournisseur"
              data-cy="cmdFournisseur"
              name="cmdFournisseur"
              v-model="ligneCmdFournisseur.cmdFournisseur"
            >
              <option v-bind:value="null"></option>
              <option
                v-bind:value="
                  ligneCmdFournisseur.cmdFournisseur && cmdFournisseurOption.id === ligneCmdFournisseur.cmdFournisseur.id
                    ? ligneCmdFournisseur.cmdFournisseur
                    : cmdFournisseurOption
                "
                v-for="cmdFournisseurOption in cmdFournisseurs"
                :key="cmdFournisseurOption.id"
              >
                {{ cmdFournisseurOption.id }}
              </option>
            </select>
          </div>
          <div class="form-group">
            <label
              class="form-control-label"
              v-text="t$('sellAmApp.ligneCmdFournisseur.article')"
              for="ligne-cmd-fournisseur-article"
            ></label>
            <select
              class="form-control"
              id="ligne-cmd-fournisseur-article"
              data-cy="article"
              name="article"
              v-model="ligneCmdFournisseur.article"
            >
              <option v-bind:value="null"></option>
              <option
                v-bind:value="
                  ligneCmdFournisseur.article && articleOption.id === ligneCmdFournisseur.article.id
                    ? ligneCmdFournisseur.article
                    : articleOption
                "
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
<script lang="ts" src="./ligne-cmd-fournisseur-update.component.ts"></script>
