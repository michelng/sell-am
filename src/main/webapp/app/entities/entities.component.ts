import { defineComponent, provide } from 'vue';

import UserService from '@/entities/user/user.service';
import ArticleService from './article/article.service';
import CategorieService from './categorie/categorie.service';
import ClientService from './client/client.service';
import CmdClientService from './cmd-client/cmd-client.service';
import CmdFournisseurService from './cmd-fournisseur/cmd-fournisseur.service';
import DiscountService from './discount/discount.service';
import EmployeService from './employe/employe.service';
import EntrepriseService from './entreprise/entreprise.service';
import FactureService from './facture/facture.service';
import FournisseurService from './fournisseur/fournisseur.service';
import LigneCmdClientService from './ligne-cmd-client/ligne-cmd-client.service';
import LigneCmdFournisseurService from './ligne-cmd-fournisseur/ligne-cmd-fournisseur.service';
import LigneVenteService from './ligne-vente/ligne-vente.service';
import MagasinService from './magasin/magasin.service';
import MvtStckService from './mvt-stck/mvt-stck.service';
import PromotionService from './promotion/promotion.service';
import RoleEmployeService from './role-employe/role-employe.service';
import VenteService from './vente/vente.service';
// jhipster-needle-add-entity-service-to-entities-component-import - JHipster will import entities services here

export default defineComponent({
  compatConfig: { MODE: 3 },
  name: 'Entities',
  setup() {
    provide('userService', () => new UserService());
    provide('articleService', () => new ArticleService());
    provide('categorieService', () => new CategorieService());
    provide('clientService', () => new ClientService());
    provide('cmdClientService', () => new CmdClientService());
    provide('cmdFournisseurService', () => new CmdFournisseurService());
    provide('discountService', () => new DiscountService());
    provide('employeService', () => new EmployeService());
    provide('entrepriseService', () => new EntrepriseService());
    provide('factureService', () => new FactureService());
    provide('fournisseurService', () => new FournisseurService());
    provide('ligneCmdClientService', () => new LigneCmdClientService());
    provide('ligneCmdFournisseurService', () => new LigneCmdFournisseurService());
    provide('ligneVenteService', () => new LigneVenteService());
    provide('magasinService', () => new MagasinService());
    provide('mvtStckService', () => new MvtStckService());
    provide('promotionService', () => new PromotionService());
    provide('roleEmployeService', () => new RoleEmployeService());
    provide('venteService', () => new VenteService());
    // jhipster-needle-add-entity-service-to-entities-component - JHipster will import entities services here
  },
});
