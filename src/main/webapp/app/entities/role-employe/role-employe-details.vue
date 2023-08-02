<template>
  <div class="row justify-content-center">
    <div class="col-8">
      <div v-if="roleEmploye">
        <h2 class="jh-entity-heading" data-cy="roleEmployeDetailsHeading">
          <span v-text="t$('sellAmApp.roleEmploye.detail.title')"></span> {{ roleEmploye.id }}
        </h2>
        <dl class="row jh-entity-details">
          <dt>
            <span v-text="t$('sellAmApp.roleEmploye.roleName')"></span>
          </dt>
          <dd>
            <span>{{ roleEmploye.roleName }}</span>
          </dd>
        </dl>
        <button type="submit" v-on:click.prevent="previousState()" class="btn btn-info" data-cy="entityDetailsBackButton">
          <font-awesome-icon icon="arrow-left"></font-awesome-icon>&nbsp;<span v-text="t$('entity.action.back')"></span>
        </button>
        <router-link
          v-if="roleEmploye.id"
          :to="{ name: 'RoleEmployeEdit', params: { roleEmployeId: roleEmploye.id } }"
          custom
          v-slot="{ navigate }"
        >
          <button @click="navigate" class="btn btn-primary">
            <font-awesome-icon icon="pencil-alt"></font-awesome-icon>&nbsp;<span v-text="t$('entity.action.edit')"></span>
          </button>
        </router-link>
      </div>
    </div>
  </div>
</template>

<script lang="ts" src="./role-employe-details.component.ts"></script>
