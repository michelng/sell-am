import { Authority } from '@/shared/security/authority';
/* tslint:disable */
// prettier-ignore
const Entities = () => import('@/entities/entities.vue');

const Article = () => import('@/entities/article/article.vue');
const ArticleUpdate = () => import('@/entities/article/article-update.vue');
const ArticleDetails = () => import('@/entities/article/article-details.vue');

const Categorie = () => import('@/entities/categorie/categorie.vue');
const CategorieUpdate = () => import('@/entities/categorie/categorie-update.vue');
const CategorieDetails = () => import('@/entities/categorie/categorie-details.vue');

const Client = () => import('@/entities/client/client.vue');
const ClientUpdate = () => import('@/entities/client/client-update.vue');
const ClientDetails = () => import('@/entities/client/client-details.vue');

const CmdClient = () => import('@/entities/cmd-client/cmd-client.vue');
const CmdClientUpdate = () => import('@/entities/cmd-client/cmd-client-update.vue');
const CmdClientDetails = () => import('@/entities/cmd-client/cmd-client-details.vue');

const CmdFournisseur = () => import('@/entities/cmd-fournisseur/cmd-fournisseur.vue');
const CmdFournisseurUpdate = () => import('@/entities/cmd-fournisseur/cmd-fournisseur-update.vue');
const CmdFournisseurDetails = () => import('@/entities/cmd-fournisseur/cmd-fournisseur-details.vue');

const Discount = () => import('@/entities/discount/discount.vue');
const DiscountUpdate = () => import('@/entities/discount/discount-update.vue');
const DiscountDetails = () => import('@/entities/discount/discount-details.vue');

const Employe = () => import('@/entities/employe/employe.vue');
const EmployeUpdate = () => import('@/entities/employe/employe-update.vue');
const EmployeDetails = () => import('@/entities/employe/employe-details.vue');

const Entreprise = () => import('@/entities/entreprise/entreprise.vue');
const EntrepriseUpdate = () => import('@/entities/entreprise/entreprise-update.vue');
const EntrepriseDetails = () => import('@/entities/entreprise/entreprise-details.vue');

const Facture = () => import('@/entities/facture/facture.vue');
const FactureUpdate = () => import('@/entities/facture/facture-update.vue');
const FactureDetails = () => import('@/entities/facture/facture-details.vue');

const Fournisseur = () => import('@/entities/fournisseur/fournisseur.vue');
const FournisseurUpdate = () => import('@/entities/fournisseur/fournisseur-update.vue');
const FournisseurDetails = () => import('@/entities/fournisseur/fournisseur-details.vue');

const LigneCmdClient = () => import('@/entities/ligne-cmd-client/ligne-cmd-client.vue');
const LigneCmdClientUpdate = () => import('@/entities/ligne-cmd-client/ligne-cmd-client-update.vue');
const LigneCmdClientDetails = () => import('@/entities/ligne-cmd-client/ligne-cmd-client-details.vue');

const LigneCmdFournisseur = () => import('@/entities/ligne-cmd-fournisseur/ligne-cmd-fournisseur.vue');
const LigneCmdFournisseurUpdate = () => import('@/entities/ligne-cmd-fournisseur/ligne-cmd-fournisseur-update.vue');
const LigneCmdFournisseurDetails = () => import('@/entities/ligne-cmd-fournisseur/ligne-cmd-fournisseur-details.vue');

const LigneVente = () => import('@/entities/ligne-vente/ligne-vente.vue');
const LigneVenteUpdate = () => import('@/entities/ligne-vente/ligne-vente-update.vue');
const LigneVenteDetails = () => import('@/entities/ligne-vente/ligne-vente-details.vue');

const Magasin = () => import('@/entities/magasin/magasin.vue');
const MagasinUpdate = () => import('@/entities/magasin/magasin-update.vue');
const MagasinDetails = () => import('@/entities/magasin/magasin-details.vue');

const MvtStck = () => import('@/entities/mvt-stck/mvt-stck.vue');
const MvtStckUpdate = () => import('@/entities/mvt-stck/mvt-stck-update.vue');
const MvtStckDetails = () => import('@/entities/mvt-stck/mvt-stck-details.vue');

const Promotion = () => import('@/entities/promotion/promotion.vue');
const PromotionUpdate = () => import('@/entities/promotion/promotion-update.vue');
const PromotionDetails = () => import('@/entities/promotion/promotion-details.vue');

const RoleEmploye = () => import('@/entities/role-employe/role-employe.vue');
const RoleEmployeUpdate = () => import('@/entities/role-employe/role-employe-update.vue');
const RoleEmployeDetails = () => import('@/entities/role-employe/role-employe-details.vue');

const Vente = () => import('@/entities/vente/vente.vue');
const VenteUpdate = () => import('@/entities/vente/vente-update.vue');
const VenteDetails = () => import('@/entities/vente/vente-details.vue');

// jhipster-needle-add-entity-to-router-import - JHipster will import entities to the router here

export default {
  path: '/',
  component: Entities,
  children: [
    {
      path: 'article',
      name: 'Article',
      component: Article,
      meta: { authorities: [Authority.USER] },
    },
    {
      path: 'article/new',
      name: 'ArticleCreate',
      component: ArticleUpdate,
      meta: { authorities: [Authority.USER] },
    },
    {
      path: 'article/:articleId/edit',
      name: 'ArticleEdit',
      component: ArticleUpdate,
      meta: { authorities: [Authority.USER] },
    },
    {
      path: 'article/:articleId/view',
      name: 'ArticleView',
      component: ArticleDetails,
      meta: { authorities: [Authority.USER] },
    },
    {
      path: 'categorie',
      name: 'Categorie',
      component: Categorie,
      meta: { authorities: [Authority.USER] },
    },
    {
      path: 'categorie/new',
      name: 'CategorieCreate',
      component: CategorieUpdate,
      meta: { authorities: [Authority.USER] },
    },
    {
      path: 'categorie/:categorieId/edit',
      name: 'CategorieEdit',
      component: CategorieUpdate,
      meta: { authorities: [Authority.USER] },
    },
    {
      path: 'categorie/:categorieId/view',
      name: 'CategorieView',
      component: CategorieDetails,
      meta: { authorities: [Authority.USER] },
    },
    {
      path: 'client',
      name: 'Client',
      component: Client,
      meta: { authorities: [Authority.USER] },
    },
    {
      path: 'client/new',
      name: 'ClientCreate',
      component: ClientUpdate,
      meta: { authorities: [Authority.USER] },
    },
    {
      path: 'client/:clientId/edit',
      name: 'ClientEdit',
      component: ClientUpdate,
      meta: { authorities: [Authority.USER] },
    },
    {
      path: 'client/:clientId/view',
      name: 'ClientView',
      component: ClientDetails,
      meta: { authorities: [Authority.USER] },
    },
    {
      path: 'cmd-client',
      name: 'CmdClient',
      component: CmdClient,
      meta: { authorities: [Authority.USER] },
    },
    {
      path: 'cmd-client/new',
      name: 'CmdClientCreate',
      component: CmdClientUpdate,
      meta: { authorities: [Authority.USER] },
    },
    {
      path: 'cmd-client/:cmdClientId/edit',
      name: 'CmdClientEdit',
      component: CmdClientUpdate,
      meta: { authorities: [Authority.USER] },
    },
    {
      path: 'cmd-client/:cmdClientId/view',
      name: 'CmdClientView',
      component: CmdClientDetails,
      meta: { authorities: [Authority.USER] },
    },
    {
      path: 'cmd-fournisseur',
      name: 'CmdFournisseur',
      component: CmdFournisseur,
      meta: { authorities: [Authority.USER] },
    },
    {
      path: 'cmd-fournisseur/new',
      name: 'CmdFournisseurCreate',
      component: CmdFournisseurUpdate,
      meta: { authorities: [Authority.USER] },
    },
    {
      path: 'cmd-fournisseur/:cmdFournisseurId/edit',
      name: 'CmdFournisseurEdit',
      component: CmdFournisseurUpdate,
      meta: { authorities: [Authority.USER] },
    },
    {
      path: 'cmd-fournisseur/:cmdFournisseurId/view',
      name: 'CmdFournisseurView',
      component: CmdFournisseurDetails,
      meta: { authorities: [Authority.USER] },
    },
    {
      path: 'discount',
      name: 'Discount',
      component: Discount,
      meta: { authorities: [Authority.USER] },
    },
    {
      path: 'discount/new',
      name: 'DiscountCreate',
      component: DiscountUpdate,
      meta: { authorities: [Authority.USER] },
    },
    {
      path: 'discount/:discountId/edit',
      name: 'DiscountEdit',
      component: DiscountUpdate,
      meta: { authorities: [Authority.USER] },
    },
    {
      path: 'discount/:discountId/view',
      name: 'DiscountView',
      component: DiscountDetails,
      meta: { authorities: [Authority.USER] },
    },
    {
      path: 'employe',
      name: 'Employe',
      component: Employe,
      meta: { authorities: [Authority.USER] },
    },
    {
      path: 'employe/new',
      name: 'EmployeCreate',
      component: EmployeUpdate,
      meta: { authorities: [Authority.USER] },
    },
    {
      path: 'employe/:employeId/edit',
      name: 'EmployeEdit',
      component: EmployeUpdate,
      meta: { authorities: [Authority.USER] },
    },
    {
      path: 'employe/:employeId/view',
      name: 'EmployeView',
      component: EmployeDetails,
      meta: { authorities: [Authority.USER] },
    },
    {
      path: 'entreprise',
      name: 'Entreprise',
      component: Entreprise,
      meta: { authorities: [Authority.USER] },
    },
    {
      path: 'entreprise/new',
      name: 'EntrepriseCreate',
      component: EntrepriseUpdate,
      meta: { authorities: [Authority.USER] },
    },
    {
      path: 'entreprise/:entrepriseId/edit',
      name: 'EntrepriseEdit',
      component: EntrepriseUpdate,
      meta: { authorities: [Authority.USER] },
    },
    {
      path: 'entreprise/:entrepriseId/view',
      name: 'EntrepriseView',
      component: EntrepriseDetails,
      meta: { authorities: [Authority.USER] },
    },
    {
      path: 'facture',
      name: 'Facture',
      component: Facture,
      meta: { authorities: [Authority.USER] },
    },
    {
      path: 'facture/new',
      name: 'FactureCreate',
      component: FactureUpdate,
      meta: { authorities: [Authority.USER] },
    },
    {
      path: 'facture/:factureId/edit',
      name: 'FactureEdit',
      component: FactureUpdate,
      meta: { authorities: [Authority.USER] },
    },
    {
      path: 'facture/:factureId/view',
      name: 'FactureView',
      component: FactureDetails,
      meta: { authorities: [Authority.USER] },
    },
    {
      path: 'fournisseur',
      name: 'Fournisseur',
      component: Fournisseur,
      meta: { authorities: [Authority.USER] },
    },
    {
      path: 'fournisseur/new',
      name: 'FournisseurCreate',
      component: FournisseurUpdate,
      meta: { authorities: [Authority.USER] },
    },
    {
      path: 'fournisseur/:fournisseurId/edit',
      name: 'FournisseurEdit',
      component: FournisseurUpdate,
      meta: { authorities: [Authority.USER] },
    },
    {
      path: 'fournisseur/:fournisseurId/view',
      name: 'FournisseurView',
      component: FournisseurDetails,
      meta: { authorities: [Authority.USER] },
    },
    {
      path: 'ligne-cmd-client',
      name: 'LigneCmdClient',
      component: LigneCmdClient,
      meta: { authorities: [Authority.USER] },
    },
    {
      path: 'ligne-cmd-client/new',
      name: 'LigneCmdClientCreate',
      component: LigneCmdClientUpdate,
      meta: { authorities: [Authority.USER] },
    },
    {
      path: 'ligne-cmd-client/:ligneCmdClientId/edit',
      name: 'LigneCmdClientEdit',
      component: LigneCmdClientUpdate,
      meta: { authorities: [Authority.USER] },
    },
    {
      path: 'ligne-cmd-client/:ligneCmdClientId/view',
      name: 'LigneCmdClientView',
      component: LigneCmdClientDetails,
      meta: { authorities: [Authority.USER] },
    },
    {
      path: 'ligne-cmd-fournisseur',
      name: 'LigneCmdFournisseur',
      component: LigneCmdFournisseur,
      meta: { authorities: [Authority.USER] },
    },
    {
      path: 'ligne-cmd-fournisseur/new',
      name: 'LigneCmdFournisseurCreate',
      component: LigneCmdFournisseurUpdate,
      meta: { authorities: [Authority.USER] },
    },
    {
      path: 'ligne-cmd-fournisseur/:ligneCmdFournisseurId/edit',
      name: 'LigneCmdFournisseurEdit',
      component: LigneCmdFournisseurUpdate,
      meta: { authorities: [Authority.USER] },
    },
    {
      path: 'ligne-cmd-fournisseur/:ligneCmdFournisseurId/view',
      name: 'LigneCmdFournisseurView',
      component: LigneCmdFournisseurDetails,
      meta: { authorities: [Authority.USER] },
    },
    {
      path: 'ligne-vente',
      name: 'LigneVente',
      component: LigneVente,
      meta: { authorities: [Authority.USER] },
    },
    {
      path: 'ligne-vente/new',
      name: 'LigneVenteCreate',
      component: LigneVenteUpdate,
      meta: { authorities: [Authority.USER] },
    },
    {
      path: 'ligne-vente/:ligneVenteId/edit',
      name: 'LigneVenteEdit',
      component: LigneVenteUpdate,
      meta: { authorities: [Authority.USER] },
    },
    {
      path: 'ligne-vente/:ligneVenteId/view',
      name: 'LigneVenteView',
      component: LigneVenteDetails,
      meta: { authorities: [Authority.USER] },
    },
    {
      path: 'magasin',
      name: 'Magasin',
      component: Magasin,
      meta: { authorities: [Authority.USER] },
    },
    {
      path: 'magasin/new',
      name: 'MagasinCreate',
      component: MagasinUpdate,
      meta: { authorities: [Authority.USER] },
    },
    {
      path: 'magasin/:magasinId/edit',
      name: 'MagasinEdit',
      component: MagasinUpdate,
      meta: { authorities: [Authority.USER] },
    },
    {
      path: 'magasin/:magasinId/view',
      name: 'MagasinView',
      component: MagasinDetails,
      meta: { authorities: [Authority.USER] },
    },
    {
      path: 'mvt-stck',
      name: 'MvtStck',
      component: MvtStck,
      meta: { authorities: [Authority.USER] },
    },
    {
      path: 'mvt-stck/new',
      name: 'MvtStckCreate',
      component: MvtStckUpdate,
      meta: { authorities: [Authority.USER] },
    },
    {
      path: 'mvt-stck/:mvtStckId/edit',
      name: 'MvtStckEdit',
      component: MvtStckUpdate,
      meta: { authorities: [Authority.USER] },
    },
    {
      path: 'mvt-stck/:mvtStckId/view',
      name: 'MvtStckView',
      component: MvtStckDetails,
      meta: { authorities: [Authority.USER] },
    },
    {
      path: 'promotion',
      name: 'Promotion',
      component: Promotion,
      meta: { authorities: [Authority.USER] },
    },
    {
      path: 'promotion/new',
      name: 'PromotionCreate',
      component: PromotionUpdate,
      meta: { authorities: [Authority.USER] },
    },
    {
      path: 'promotion/:promotionId/edit',
      name: 'PromotionEdit',
      component: PromotionUpdate,
      meta: { authorities: [Authority.USER] },
    },
    {
      path: 'promotion/:promotionId/view',
      name: 'PromotionView',
      component: PromotionDetails,
      meta: { authorities: [Authority.USER] },
    },
    {
      path: 'role-employe',
      name: 'RoleEmploye',
      component: RoleEmploye,
      meta: { authorities: [Authority.USER] },
    },
    {
      path: 'role-employe/new',
      name: 'RoleEmployeCreate',
      component: RoleEmployeUpdate,
      meta: { authorities: [Authority.USER] },
    },
    {
      path: 'role-employe/:roleEmployeId/edit',
      name: 'RoleEmployeEdit',
      component: RoleEmployeUpdate,
      meta: { authorities: [Authority.USER] },
    },
    {
      path: 'role-employe/:roleEmployeId/view',
      name: 'RoleEmployeView',
      component: RoleEmployeDetails,
      meta: { authorities: [Authority.USER] },
    },
    {
      path: 'vente',
      name: 'Vente',
      component: Vente,
      meta: { authorities: [Authority.USER] },
    },
    {
      path: 'vente/new',
      name: 'VenteCreate',
      component: VenteUpdate,
      meta: { authorities: [Authority.USER] },
    },
    {
      path: 'vente/:venteId/edit',
      name: 'VenteEdit',
      component: VenteUpdate,
      meta: { authorities: [Authority.USER] },
    },
    {
      path: 'vente/:venteId/view',
      name: 'VenteView',
      component: VenteDetails,
      meta: { authorities: [Authority.USER] },
    },
    // jhipster-needle-add-entity-to-router - JHipster will add entities to the router here
  ],
};
