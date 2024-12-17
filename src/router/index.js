import { createRouter, createWebHashHistory } from "vue-router";

import NProgress from "nprogress/nprogress.js";

// Main layout variations
import LayoutSimple from "@/layouts/variations/Simple.vue";
import AdminLayout from "@/layouts/variations/Backend.vue";
import AdminLayoutBoxed from "@/layouts/variations/BackendBoxed.vue";
import AdminLayoutMegaMenu from "@/layouts/variations/BackendMegaMenu.vue";
import AdminLayoutSidebarMiniNav from "@/layouts/variations/BackendSidebarMiniNav.vue";
import PartnerLayout from "@/layouts/variations/PartnerLayout.vue";
import ModeratorLayout from "@/layouts/variations/ModeratorLayout.vue";
import SupportLayout from "@/layouts/variations/SupportLayout.vue";
import AgentLayout from "@/layouts/variations/AgentLayout.vue";
import ClientLayout from "@/layouts/variations/ClientLayout.vue";
const BackendBoxedDashboard = () =>
  import("@/views/backend-boxed/DashboardView.vue");
const BackendBoxedSimple1 = () =>
  import("@/views/backend-boxed/Simple1View.vue");
const BackendBoxedSimple2 = () =>
  import("@/views/backend-boxed/Simple2View.vue");
const BackendBoxedImage1 = () => import("@/views/backend-boxed/Image1View.vue");
const BackendBoxedImage2 = () => import("@/views/backend-boxed/Image2View.vue");
const BackendBoxedSearch = () => import("@/views/backend-boxed/SearchView.vue");

// Backend: Dashboard
const BackendDashboard = () => import("@/views/backend/DashboardView.vue");

const BackendElementsMegaMenu = () =>
  import("@/views/backend/elements/MegaMenuView.vue");

const BackendPagesGenericSidebarMiniNav = () =>
  import("@/views/backend/pages/generic/SidebarMiniNavView.vue");

// Specials
const SpecialsMaintenance = () =>
  import("@/views/specials/MaintenanceView.vue");
const SpecialsStatus = () => import("@/views/specials/StatusView.vue");
const SpecialsInstallation = () =>
  import("@/views/specials/InstallationView.vue");
const SpecialsCheckout = () => import("@/views/specials/CheckoutView.vue");
const SpecialsComingSoon = () => import("@/views/specials/ComingSoonView.vue");

// Auth
const AuthSignIn = () => import("@/views/auth/SignInView.vue");
const AuthSignIn2 = () => import("@/views/auth/SignIn2View.vue");
const AuthSignIn3 = () => import("@/views/auth/SignIn3View.vue");
const AuthSignUp = () => import("@/views/auth/SignUpView.vue");
const AuthSignUp2 = () => import("@/views/auth/SignUp2View.vue");
const AuthSignUp3 = () => import("@/views/auth/SignUp3View.vue");
const AuthLock = () => import("@/views/auth/LockView.vue");
const AuthLock2 = () => import("@/views/auth/Lock2View.vue");
const AuthLock3 = () => import("@/views/auth/Lock3View.vue");
const AuthReminder = () => import("@/views/auth/ReminderView.vue");
const AuthReminder2 = () => import("@/views/auth/Reminder2View.vue");
const AuthReminder3 = () => import("@/views/auth/Reminder3View.vue");
const AuthTwoFactor = () => import("@/views/auth/TwoFactorView.vue");
const AuthTwoFactor2 = () => import("@/views/auth/TwoFactor2View.vue");
const AuthTwoFactor3 = () => import("@/views/auth/TwoFactor3View.vue");

// Errors
const Error400 = () => import("@/views/errors/400View.vue");
const Error401 = () => import("@/views/errors/401View.vue");
const Error403 = () => import("@/views/errors/403View.vue");
const Error404 = () => import("@/views/errors/404View.vue");
const Error500 = () => import("@/views/errors/500View.vue");
const Error503 = () => import("@/views/errors/503View.vue");

//admin views
const AdsView = () => import("@/views/admin/VideoView.vue");
const AdminCarsView = () => import("@/views/admin/CarsView.vue")
const EqView = () => import("@/views/admin/EqView.vue");
const SettingsView = () => import("@/views/admin/SettingsView.vue");
const ClientsView = () => import("@/views/admin/ClientsView.vue");
const AgentsView = () => import("@/views/admin/AgentsView.vue");
const PartnersView = () => import("@/views/admin/PartnersView.vue");
const ErrorsView = () => import("@/views/admin/ErrorsView.vue");
const ControlView = () => import("@/views/admin/ControlView.vue");
const FinancesView = () => import("@/views/admin/FinancesView.vue");
const DocumentsView = () => import("@/views/admin/DocumentsView.vue");
const TemplatesView = () => import("@/views/admin/TemplatesView.vue");
const AdminSupportView = () => import("@/views/admin/SupportView.vue");
const LocationView = () => import("@/views/admin/LocationView.vue");
const TariffView = () => import("@/views/admin/TariffView.vue");
const ModeratorsView = () => import("@/views/admin/ModeratorsView.vue")

//moderator views
const ModeratorDashboardView = () =>
  import("@/views/moderator/DashboardView.vue");
const VideoModeratorView = () => import("@/views/moderator/VideoView.vue");
const ResultsView = () => import("@/views/moderator/ResultsView.vue");
const CheckVideoView = () => import("@/views/moderator/CheckVideoView.vue");

const SupportDashboardView = () =>
  import("@/views/support/DashboardView.vue");

const SupportSupportView = () => import("@/views/support/SupportView.vue");
const ResultsSupportView = () => import("@/views/support/ResultsView.vue");

//agent views
const AgentDashboardView = () => import("@/views/agent/DashboardView.vue");
const AdvertisersView = () => import("@/views/agent/AdvertisersView.vue");
const AddAdvertisersView = () => import("@/views/agent/AddAdvertisersView.vue");
const AgentSupportView = () => import("@/views/agent/SupportView.vue");
//client views
const ClientDashboardView = () => import("@/views/client/DashboardView.vue");
const ClientView = () => import("@/views/client/ClientView.vue");
const AddVideoView = () => import("@/views/client/AddVideoView.vue");
const AddAdcView = () => import("@/views/client/AddAdcView.vue");
const ClientSupportView = () => import("@/views/client/SupportView.vue");
const ClientAnalyticsView = () => import("@/views/client/AnalyticsView.vue");
const ClientFinanceView = () => import("@/views/client/FinanceView.vue");
const ClientCompanyView = () => import("@/views/client/ClientCompanyView.vue");
//

//partner views
const PartnerDashboardView = () => import("@/views/partner/DashboardView.vue");
const CarsView = () => import("@/views/partner/CarsView.vue");
const UserView = () => import("@/views/partner/UserView.vue");
const PartnerSupportView = () => import("@/views/partner/SupportView.vue");
const FinanceView = () => import("@/views/partner/FinanceView.vue");

//

// Set all routes
const routes = [
  /*
  |
  |--------------------------------------------------------------------------
  | Landing Routes
  |--------------------------------------------------------------------------
  |
  */
  {
    path: "/",
    component: AdminLayout,
    children: [
      {
        path: "Adashboard",
        name: "landing",
        component: BackendDashboard,
      },
      {
        path: "allvideo",
        component: AdsView,
      },
      {
        path: 'allvideo/:id',
        name: 'AdminEditAd',
        component: () => import('@/views/admin/EditAdView.vue'),
      },
      {
        path: "eq",
        component: EqView,
      },
      {
        path: "eq/:id",
        name: 'AdminEditEq',
        component: () => import('@/views/admin/EditEqView.vue'),
      },
      {
        path: "clients",
        component: ClientsView,
      },
      {
        path: 'clients/:id',
        name: 'AdminEditClient',
        component: () => import('@/views/admin/EditClientView.vue'),
      },
      {
        path: "agents",
        component: AgentsView,
      },
      {
        path: 'agents/:id',
        name: 'AdminEditAgent',
        component: () => import('@/views/admin/EditAgentView.vue'),
      },      
      {
        path: 'partners/:id',
        name: 'AdminEditPartner',
        component: () => import('@/views/admin/EditPartnerView.vue'),
      },
      {
        path: "moderators",
        component: ModeratorsView,
      },
      {
        path: "moderators/:id/:status",
        name: 'AdminEditModerator',
        component: () => import('@/views/admin/EditModeratorView.vue'),
      },
      { path: "partners", component: PartnersView },
      {
        path: "cars", component: AdminCarsView
      },
      {
        path: 'cars/:id',
        name: 'AdminEditCar',
        component: () => import('@/views/admin/EditCarView.vue'),
      },
      {
        path: "error",
        component: ErrorsView,
      },
      {
        path: "settings",
        component: SettingsView,
      },
      {
        path: "control",
        component: ControlView,
      },
      {
        path: 'control/:id',
        name: 'EditUserView',
        component: () => import('@/views/admin/EditUserView.vue'),
      },
      {
        path: "finances",
        component: FinancesView,
      },
      {
        path: "finances/:id",
        name: 'AdminEditFinance',
        component: () => import('@/views/admin/EditFinanceView.vue'),
      },
      {
        path: "documents",
        component: DocumentsView,
      },
      {
        path: "docs/:id",
        name: 'AdminEditDocument',
        component: () => import('@/views/admin/EditDocumentView.vue'),
      },
      {
        path: "templates",
        component: TemplatesView,
      },
      {
        path: "tiketsupport",
        component: AdminSupportView,
      },
      {
        path: "messages/:id",
        name: 'AdminEditSupport',
        component: () => import('@/views/admin/EditSupportView.vue'),
      },
      {
        path: "locations",
        component: LocationView,
      },
      {
        path: "locations/:id",
        name: 'AdminEditLocation',
        component: () => import('@/views/admin/EditLocationView.vue'),
      },
      {
        path: "tariffs",
        component: TariffView,
      },
      {
        path: "tariffs/:id",
        name: 'AdminEditTariff',
        component: () => import('@/views/admin/EditTariffView.vue'),
      },
    ],
  },

  {
    path: "/",
    component: ModeratorLayout,

    children: [
      {
        path: "Mdashboard",
        component: ModeratorDashboardView,
      },
      {
        path: 'checkVideos/:id',
        name: "checkVideos",
        component: CheckVideoView,
      },
      {
        path: "videos",
        component: VideoModeratorView,
      },
      {
        path: "results",
        component: ResultsView,
      },

    ],
  },
  {
    path: "/",
    component: SupportLayout,
    children: [
      {
        path: "Sdashboard",
        component: SupportDashboardView,
      },
      {
        path: "tikets",
        component: SupportSupportView,
      },
      {
        path: 'tikect/:id',
        name: 'ResponseSupport',
        component: () => import('@/views/support/ResponseMessageView.vue'),
      },
      {
        path: "total",
        component: ResultsSupportView,
      },

    ],
  },

  {
    path: "/",
    component: ClientLayout,
    children: [

      {
        path: "Cdashboard",
        component: ClientDashboardView,
      },
      {
        path: "myvideo",
        component: AddAdcView,
      },
      {
        path: 'myvideo/:id',
        name: 'ClientEditAd',
        component: () => import('@/views/client/ClientEditAdView.vue'),
      },
      {
        path: "addVideo",
        component: AddVideoView,
      },
      {
        path: "myfinance",
        component: ClientFinanceView,
      },
      {
        path: "profile",
        component: ClientView,
      },
      {
        path: "supportme",
        component: ClientSupportView,
      },

    ],
  },
  
  {
    path: "/",
    component: AgentLayout,
    children: [

      {
        path: "Agdashboard",
        component: AgentDashboardView,
      },
      {
        path: "advertisers",
        component: AdvertisersView,
      },
      {
        path: 'advertisers/:id',
        name: 'ClientEditAd',
        component: AddAdvertisersView,
      },
      {
        path: "ask",
        component: AgentSupportView,
      },

    ],
  },
  {
    path: "/",
    component: PartnerLayout,
    children: [

      {
        path: "Pdashboard",
        component: PartnerDashboardView,
      },

      {
        path: "mycars",
        component: CarsView,
      },
      {
        path: 'mycars/:id',
        name: 'PartnerEditCar',
        component: () => import('@/views/partner/EditCarView.vue'),
      },

      {
        path: "cash",
        component: FinanceView,
      },

      {
        path: "about",
        component: UserView,
      },

      {
        path: "help",
        component: PartnerSupportView,
      },

    ],
  },

  /*
  |
  |--------------------------------------------------------------------------
  | Backend Boxed Routes
  |--------------------------------------------------------------------------
  |
  */
  {
    path: "/backend-boxed",
    component: AdminLayoutBoxed,
    children: [
      {
        path: "",
        name: "backend-boxed-dashboard",
        component: BackendBoxedDashboard,
      },
      {
        path: "simple1",
        name: "backend-boxed-simple1",
        component: BackendBoxedSimple1,
      },
      {
        path: "simple2",
        name: "backend-boxed-simple2",
        component: BackendBoxedSimple2,
      },
      {
        path: "image1",
        name: "backend-boxed-image1",
        component: BackendBoxedImage1,
      },
      {
        path: "image2",
        name: "backend-boxed-image2",
        component: BackendBoxedImage2,
      },
      {
        path: "search",
        name: "backend-boxed-search",
        component: BackendBoxedSearch,
      },
    ],
  },

  /*
  |--------------------------------------------------------------------------
  | Backend Mega Menu Route
  |--------------------------------------------------------------------------
  */

  {
    path: "/backend/elements",
    component: AdminLayoutMegaMenu,
    children: [
      {
        path: "mega-menu",
        name: "backend-elements-mega-menu",
        component: BackendElementsMegaMenu,
      },
    ],
  },

  /*
  |--------------------------------------------------------------------------
  | Backend Sidebar Mini Nav Route
  |--------------------------------------------------------------------------
  */

  {
    path: "/backend/pages/generic",
    component: AdminLayoutSidebarMiniNav,
    children: [
      {
        path: "sidebar-mini-nav",
        name: "backend-pages-generic-sidebar-mini-nav",
        component: BackendPagesGenericSidebarMiniNav,
      },
    ],
  },

  /*
  |
  |--------------------------------------------------------------------------
  | Backend Routes
  |--------------------------------------------------------------------------
  |
  */
  {
    path: "/backend",
    redirect: "/backend/dashboard",
    component: AdminLayout,
    children: [
      {
        path: "dashboard",
        name: "backend-dashboard",
        component: BackendDashboard,
      },
    ],
  },

  /*
  |
  |--------------------------------------------------------------------------
  | Special Routes
  |--------------------------------------------------------------------------
  |
  */
  {
    path: "/specials",
    component: LayoutSimple,
    children: [
      {
        path: "maintenance",
        name: "specials-maintenance",
        component: SpecialsMaintenance,
      },
      {
        path: "status",
        name: "specials-status",
        component: SpecialsStatus,
      },
      {
        path: "installation",
        name: "specials-installation",
        component: SpecialsInstallation,
      },
      {
        path: "checkout",
        name: "specials-checkout",
        component: SpecialsCheckout,
      },
      {
        path: "coming-soon",
        name: "specials-coming-soon",
        component: SpecialsComingSoon,
      },
    ],
  },

  /*
  |
  |--------------------------------------------------------------------------
  | Auth Routes
  |--------------------------------------------------------------------------
  |
  */
  {
    path: "/auth",
    component: LayoutSimple,
    children: [
      {
        path: "signin",
        name: "auth-signin",
        component: AuthSignIn,
      },
      {
        path: "signin2",
        name: "auth-signin2",
        component: AuthSignIn2,
      },
      {
        path: "signin3",
        name: "auth-signin3",
        component: AuthSignIn3,
      },
      {
        path: "partner",
        name: "partner-signup",
        component: AuthSignUp,
      },
      {
        path: "client",
        name: "client-signup",
        component: AuthSignUp,
      },
      {
        path: "signup2",
        name: "auth-signup2",
        component: AuthSignUp2,
      },
      {
        path: "signup3",
        name: "auth-signup3",
        component: AuthSignUp3,
      },
      {
        path: "lock",
        name: "auth-lock",
        component: AuthLock,
      },
      {
        path: "lock2",
        name: "auth-lock2",
        component: AuthLock2,
      },
      {
        path: "lock3",
        name: "auth-lock3",
        component: AuthLock3,
      },
      {
        path: "reminder",
        name: "auth-reminder",
        component: AuthReminder,
      },
      {
        path: "reminder2",
        name: "auth-reminder2",
        component: AuthReminder2,
      },
      {
        path: "reminder3",
        name: "auth-reminder3",
        component: AuthReminder3,
      },
      {
        path: "two-factor",
        name: "auth-two-factor",
        component: AuthTwoFactor,
      },
      {
        path: "two-factor2",
        name: "auth-two-factor2",
        component: AuthTwoFactor2,
      },
      {
        path: "two-factor3",
        name: "auth-two-factor3",
        component: AuthTwoFactor3,
      },
    ],
  },

  /*
  |
  |--------------------------------------------------------------------------
  | Error Routes
  |--------------------------------------------------------------------------
  |
  */
  {
    path: "/errors",
    component: LayoutSimple,
    children: [
      {
        path: "400",
        name: "error-400",
        component: Error400,
      },
      {
        path: "401",
        name: "error-401",
        component: Error401,
      },
      {
        path: "403",
        name: "error-403",
        component: Error403,
      },
      {
        path: "404",
        name: "error-404",
        component: Error404,
      },
      {
        path: "500",
        name: "error-500",
        component: Error500,
      },
      {
        path: "503",
        name: "error-503",
        component: Error503,
      },
    ],
  },
];

// Create Router
const router = createRouter({
  history: createWebHashHistory(),
  linkActiveClass: "active",
  linkExactActiveClass: "",
  scrollBehavior() {
    return { left: 0, top: 0 };
  },
  routes,
});

// NProgress
/*eslint-disable no-unused-vars*/
NProgress.configure({ showSpinner: false });

router.beforeResolve((to, from, next) => {
  if (to.name) {
    NProgress.start();
  }

  next();
});

router.afterEach(() => {
  NProgress.done();
});
/*eslint-enable no-unused-vars*/

export default router;
