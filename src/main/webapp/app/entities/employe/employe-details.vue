<template>
  <div class="row justify-content-center">
    <div class="col-8">
      <div v-if="employe">
        <h2 class="jh-entity-heading" data-cy="employeDetailsHeading">
          <span v-text="t$('sellAmApp.employe.detail.title')"></span> {{ employe.id }}
        </h2>
        <dl class="row jh-entity-details">
          <dt>
            <span v-text="t$('sellAmApp.employe.identifiant')"></span>
          </dt>
          <dd>
            <span>{{ employe.identifiant }}</span>
          </dd>
          <dt>
            <span v-text="t$('sellAmApp.employe.nom')"></span>
          </dt>
          <dd>
            <span>{{ employe.nom }}</span>
          </dd>
          <dt>
            <span v-text="t$('sellAmApp.employe.prenom')"></span>
          </dt>
          <dd>
            <span>{{ employe.prenom }}</span>
          </dd>
          <dt>
            <span v-text="t$('sellAmApp.employe.dateNaissance')"></span>
          </dt>
          <dd>
            <span v-if="employe.dateNaissance">{{ formatDateLong(employe.dateNaissance) }}</span>
          </dd>
          <dt>
            <span v-text="t$('sellAmApp.employe.dateEmbauche')"></span>
          </dt>
          <dd>
            <span v-if="employe.dateEmbauche">{{ formatDateLong(employe.dateEmbauche) }}</span>
          </dd>
          <dt>
            <span v-text="t$('sellAmApp.employe.telephone1')"></span>
          </dt>
          <dd>
            <span>{{ employe.telephone1 }}</span>
          </dd>
          <dt>
            <span v-text="t$('sellAmApp.employe.telephone2')"></span>
          </dt>
          <dd>
            <span>{{ employe.telephone2 }}</span>
          </dd>
          <dt>
            <span v-text="t$('sellAmApp.employe.email')"></span>
          </dt>
          <dd>
            <span>{{ employe.email }}</span>
          </dd>
          <dt>
            <span v-text="t$('sellAmApp.employe.salaire')"></span>
          </dt>
          <dd>
            <span>{{ employe.salaire }}</span>
          </dd>
          <dt>
            <span v-text="t$('sellAmApp.employe.photo')"></span>
          </dt>
          <dd>
            <span>{{ employe.photo }}</span>
          </dd>
          <dt>
            <span v-text="t$('sellAmApp.employe.fonction')"></span>
          </dt>
          <dd>
            <span>{{ employe.fonction }}</span>
          </dd>
          <dt>
            <span v-text="t$('sellAmApp.employe.statutEmploi')"></span>
          </dt>
          <dd>
            <span v-text="t$('sellAmApp.StatutEmploi.' + employe.statutEmploi)"></span>
          </dd>
          <dt>
            <span v-text="t$('sellAmApp.employe.statut')"></span>
          </dt>
          <dd>
            <span v-text="t$('sellAmApp.Statut.' + employe.statut)"></span>
          </dd>
          <dt>
            <span v-text="t$('sellAmApp.employe.entreprise')"></span>
          </dt>
          <dd>
            <div v-if="employe.entreprise">
              <router-link :to="{ name: 'EntrepriseView', params: { entrepriseId: employe.entreprise.id } }">{{
                employe.entreprise.id
              }}</router-link>
            </div>
          </dd>
        </dl>
        <button type="submit" v-on:click.prevent="previousState()" class="btn btn-info" data-cy="entityDetailsBackButton">
          <font-awesome-icon icon="arrow-left"></font-awesome-icon>&nbsp;<span v-text="t$('entity.action.back')"></span>
        </button>
        <router-link v-if="employe.id" :to="{ name: 'EmployeEdit', params: { employeId: employe.id } }" custom v-slot="{ navigate }">
          <button @click="navigate" class="btn btn-primary">
            <font-awesome-icon icon="pencil-alt"></font-awesome-icon>&nbsp;<span v-text="t$('entity.action.edit')"></span>
          </button>
        </router-link>
      </div>
    </div>
  </div>
</template>

<script lang="ts" src="./employe-details.component.ts"></script>
