import { computed, defineComponent, inject, ref, Ref } from 'vue';
import { useI18n } from 'vue-i18n';
import { useRoute, useRouter } from 'vue-router';
import { useVuelidate } from '@vuelidate/core';

import { useValidation, useDateFormat } from '@/shared/composables';
import { useAlertService } from '@/shared/alert/alert.service';

import EntrepriseService from '@/entities/entreprise/entreprise.service';
import { IEntreprise } from '@/shared/model/entreprise.model';
import { IEmploye, Employe } from '@/shared/model/employe.model';
import EmployeService from './employe.service';
import { StatutEmploi } from '@/shared/model/enumerations/statut-emploi.model';
import { Statut } from '@/shared/model/enumerations/statut.model';

export default defineComponent({
  compatConfig: { MODE: 3 },
  name: 'EmployeUpdate',
  setup() {
    const employeService = inject('employeService', () => new EmployeService());
    const alertService = inject('alertService', () => useAlertService(), true);

    const employe: Ref<IEmploye> = ref(new Employe());
    const entrepriseService = inject('entrepriseService', () => new EntrepriseService());
    const entreprises: Ref<IEntreprise[]> = ref([]);
    const statutEmploiValues: Ref<string[]> = ref(Object.keys(StatutEmploi));
    const statutValues: Ref<string[]> = ref(Object.keys(Statut));
    const isSaving = ref(false);
    const currentLanguage = inject('currentLanguage', () => computed(() => navigator.language ?? 'fr'), true);

    const route = useRoute();
    const router = useRouter();

    const previousState = () => router.go(-1);

    const retrieveEmploye = async employeId => {
      try {
        const res = await employeService().find(employeId);
        res.dateNaissance = new Date(res.dateNaissance);
        res.dateEmbauche = new Date(res.dateEmbauche);
        employe.value = res;
      } catch (error) {
        alertService.showHttpError(error.response);
      }
    };

    if (route.params?.employeId) {
      retrieveEmploye(route.params.employeId);
    }

    const initRelationships = () => {
      entrepriseService()
        .retrieve()
        .then(res => {
          entreprises.value = res.data;
        });
    };

    initRelationships();

    const { t: t$ } = useI18n();
    const validations = useValidation();
    const validationRules = {
      identifiant: {},
      nom: {},
      prenom: {},
      dateNaissance: {},
      dateEmbauche: {},
      telephone1: {},
      telephone2: {},
      email: {},
      salaire: {},
      photo: {},
      fonction: {},
      statutEmploi: {},
      statut: {},
      ventes: {},
      entreprise: {},
    };
    const v$ = useVuelidate(validationRules, employe as any);
    v$.value.$validate();

    return {
      employeService,
      alertService,
      employe,
      previousState,
      statutEmploiValues,
      statutValues,
      isSaving,
      currentLanguage,
      entreprises,
      v$,
      ...useDateFormat({ entityRef: employe }),
      t$,
    };
  },
  created(): void {},
  methods: {
    save(): void {
      this.isSaving = true;
      if (this.employe.id) {
        this.employeService()
          .update(this.employe)
          .then(param => {
            this.isSaving = false;
            this.previousState();
            this.alertService.showInfo(this.t$('sellAmApp.employe.updated', { param: param.id }));
          })
          .catch(error => {
            this.isSaving = false;
            this.alertService.showHttpError(error.response);
          });
      } else {
        this.employeService()
          .create(this.employe)
          .then(param => {
            this.isSaving = false;
            this.previousState();
            this.alertService.showSuccess(this.t$('sellAmApp.employe.created', { param: param.id }).toString());
          })
          .catch(error => {
            this.isSaving = false;
            this.alertService.showHttpError(error.response);
          });
      }
    },
  },
});
