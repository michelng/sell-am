import { computed, defineComponent, inject, ref, Ref } from 'vue';
import { useI18n } from 'vue-i18n';
import { useRoute, useRouter } from 'vue-router';
import { useVuelidate } from '@vuelidate/core';

import { useValidation, useDateFormat } from '@/shared/composables';
import { useAlertService } from '@/shared/alert/alert.service';

import ClientService from '@/entities/client/client.service';
import { IClient } from '@/shared/model/client.model';
import EmployeService from '@/entities/employe/employe.service';
import { IEmploye } from '@/shared/model/employe.model';
import { IVente, Vente } from '@/shared/model/vente.model';
import VenteService from './vente.service';
import { StatutPaiement } from '@/shared/model/enumerations/statut-paiement.model';

export default defineComponent({
  compatConfig: { MODE: 3 },
  name: 'VenteUpdate',
  setup() {
    const venteService = inject('venteService', () => new VenteService());
    const alertService = inject('alertService', () => useAlertService(), true);

    const vente: Ref<IVente> = ref(new Vente());
    const clientService = inject('clientService', () => new ClientService());
    const clients: Ref<IClient[]> = ref([]);
    const employeService = inject('employeService', () => new EmployeService());
    const employes: Ref<IEmploye[]> = ref([]);
    const statutPaiementValues: Ref<string[]> = ref(Object.keys(StatutPaiement));
    const isSaving = ref(false);
    const currentLanguage = inject('currentLanguage', () => computed(() => navigator.language ?? 'fr'), true);

    const route = useRoute();
    const router = useRouter();

    const previousState = () => router.go(-1);

    const retrieveVente = async venteId => {
      try {
        const res = await venteService().find(venteId);
        res.dateVente = new Date(res.dateVente);
        vente.value = res;
      } catch (error) {
        alertService.showHttpError(error.response);
      }
    };

    if (route.params?.venteId) {
      retrieveVente(route.params.venteId);
    }

    const initRelationships = () => {
      clientService()
        .retrieve()
        .then(res => {
          clients.value = res.data;
        });
      employeService()
        .retrieve()
        .then(res => {
          employes.value = res.data;
        });
    };

    initRelationships();

    const { t: t$ } = useI18n();
    const validations = useValidation();
    const validationRules = {
      code: {},
      dateVente: {},
      commentaire: {},
      montantTotal: {},
      statutPaiement: {},
      client: {},
      employe: {},
    };
    const v$ = useVuelidate(validationRules, vente as any);
    v$.value.$validate();

    return {
      venteService,
      alertService,
      vente,
      previousState,
      statutPaiementValues,
      isSaving,
      currentLanguage,
      clients,
      employes,
      v$,
      ...useDateFormat({ entityRef: vente }),
      t$,
    };
  },
  created(): void {},
  methods: {
    save(): void {
      this.isSaving = true;
      if (this.vente.id) {
        this.venteService()
          .update(this.vente)
          .then(param => {
            this.isSaving = false;
            this.previousState();
            this.alertService.showInfo(this.t$('sellAmApp.vente.updated', { param: param.id }));
          })
          .catch(error => {
            this.isSaving = false;
            this.alertService.showHttpError(error.response);
          });
      } else {
        this.venteService()
          .create(this.vente)
          .then(param => {
            this.isSaving = false;
            this.previousState();
            this.alertService.showSuccess(this.t$('sellAmApp.vente.created', { param: param.id }).toString());
          })
          .catch(error => {
            this.isSaving = false;
            this.alertService.showHttpError(error.response);
          });
      }
    },
  },
});
