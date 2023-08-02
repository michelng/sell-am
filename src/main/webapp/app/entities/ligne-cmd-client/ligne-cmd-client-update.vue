<template>
  <div class="row justify-content-center">
    <div class="col-8">
      <form name="editForm" role="form" novalidate v-on:submit.prevent="save()">
        <h2
          id="sellAmApp.ligneCmdClient.home.createOrEditLabel"
          data-cy="LigneCmdClientCreateUpdateHeading"
          v-text="t$('sellAmApp.ligneCmdClient.home.createOrEditLabel')"
        ></h2>
        <div>
          <div class="form-group" v-if="ligneCmdClient.id">
            <label for="id" v-text="t$('global.field.id')"></label>
            <input type="text" class="form-control" id="id" name="id" v-model="ligneCmdClient.id" readonly />
          </div>
          <div class="form-group">
            <label class="form-control-label" v-text="t$('sellAmApp.ligneCmdClient.quantite')" for="ligne-cmd-client-quantite"></label>
            <input
              type="number"
              class="form-control"
              name="quantite"
              id="ligne-cmd-client-quantite"
              data-cy="quantite"
              :class="{ valid: !v$.quantite.$invalid, invalid: v$.quantite.$invalid }"
              v-model.number="v$.quantite.$model"
            />
          </div>
          <div class="form-group">
            <label
              class="form-control-label"
              v-text="t$('sellAmApp.ligneCmdClient.prixUnitaire')"
              for="ligne-cmd-client-prixUnitaire"
            ></label>
            <input
              type="number"
              class="form-control"
              name="prixUnitaire"
              id="ligne-cmd-client-prixUnitaire"
              data-cy="prixUnitaire"
              :class="{ valid: !v$.prixUnitaire.$invalid, invalid: v$.prixUnitaire.$invalid }"
              v-model.number="v$.prixUnitaire.$model"
            />
          </div>
          <div class="form-group">
            <label
              class="form-control-label"
              v-text="t$('sellAmApp.ligneCmdClient.dateLivraisonPrevue')"
              for="ligne-cmd-client-dateLivraisonPrevue"
            ></label>
            <div class="d-flex">
              <input
                id="ligne-cmd-client-dateLivraisonPrevue"
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
              v-text="t$('sellAmApp.ligneCmdClient.montantTotal')"
              for="ligne-cmd-client-montantTotal"
            ></label>
            <input
              type="number"
              class="form-control"
              name="montantTotal"
              id="ligne-cmd-client-montantTotal"
              data-cy="montantTotal"
              :class="{ valid: !v$.montantTotal.$invalid, invalid: v$.montantTotal.$invalid }"
              v-model.number="v$.montantTotal.$model"
            />
          </div>
          <div class="form-group">
            <label
              class="form-control-label"
              v-text="t$('sellAmApp.ligneCmdClient.commentaire')"
              for="ligne-cmd-client-commentaire"
            ></label>
            <input
              type="text"
              class="form-control"
              name="commentaire"
              id="ligne-cmd-client-commentaire"
              data-cy="commentaire"
              :class="{ valid: !v$.commentaire.$invalid, invalid: v$.commentaire.$invalid }"
              v-model="v$.commentaire.$model"
            />
          </div>
          <div class="form-group">
            <label class="form-control-label" v-text="t$('sellAmApp.ligneCmdClient.statutCmd')" for="ligne-cmd-client-statutCmd"></label>
            <select
              class="form-control"
              name="statutCmd"
              :class="{ valid: !v$.statutCmd.$invalid, invalid: v$.statutCmd.$invalid }"
              v-model="v$.statutCmd.$model"
              id="ligne-cmd-client-statutCmd"
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
            <label class="form-control-label" v-text="t$('sellAmApp.ligneCmdClient.cmdClient')" for="ligne-cmd-client-cmdClient"></label>
            <select
              class="form-control"
              id="ligne-cmd-client-cmdClient"
              data-cy="cmdClient"
              name="cmdClient"
              v-model="ligneCmdClient.cmdClient"
            >
              <option v-bind:value="null"></option>
              <option
                v-bind:value="
                  ligneCmdClient.cmdClient && cmdClientOption.id === ligneCmdClient.cmdClient.id
                    ? ligneCmdClient.cmdClient
                    : cmdClientOption
                "
                v-for="cmdClientOption in cmdClients"
                :key="cmdClientOption.id"
              >
                {{ cmdClientOption.id }}
              </option>
            </select>
          </div>
          <div class="form-group">
            <label class="form-control-label" v-text="t$('sellAmApp.ligneCmdClient.article')" for="ligne-cmd-client-article"></label>
            <select class="form-control" id="ligne-cmd-client-article" data-cy="article" name="article" v-model="ligneCmdClient.article">
              <option v-bind:value="null"></option>
              <option
                v-bind:value="
                  ligneCmdClient.article && articleOption.id === ligneCmdClient.article.id ? ligneCmdClient.article : articleOption
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
<script lang="ts" src="./ligne-cmd-client-update.component.ts"></script>
