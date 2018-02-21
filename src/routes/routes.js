import DashboardLayout from '../components/Dashboard/Layout/DashboardLayout.vue';
// GeneralViews
import NotFound from '../components/GeneralViews/NotFoundPage.vue';
import Login from '../components/GeneralViews/Login.vue'

// Admin pages
import Overview from 'src/components/Dashboard/Views/Overview.vue';
import UserProfile from 'src/components/Dashboard/Views/UserProfile.vue';
import Notifications from 'src/components/Dashboard/Views/Notifications.vue';
import Icons from 'src/components/Dashboard/Views/Icons.vue';
import Maps from 'src/components/Dashboard/Views/Maps.vue';
import Typography from 'src/components/Dashboard/Views/Typography.vue';
import TableList from 'src/components/Dashboard/Views/TableList.vue';
import Participantes from 'src/components/Dashboard/Views/Participantes.vue';
import Dizimistas from 'src/components/Dashboard/Views/Dizimistas.vue';

import Visitantes from 'src/components/Dashboard/Views/Visitantes';
import VisitanteProfile from 'src/components/Dashboard/Views/Visitantes/Profile.vue';
import AddVisitantes from 'src/components/Dashboard/Views/Visitantes/Add.vue';

import Pastorais from 'src/components/Dashboard/Views/Pastorais';
import PastoralProfile from 'src/components/Dashboard/Views/Pastorais/Profile.vue';
import AddPastoral from 'src/components/Dashboard/Views/Pastorais/Add.vue';

import Comunidades from 'src/components/Dashboard/Views/Comunidades';
import ComunidadeProfile from 'src/components/Dashboard/Views/Comunidades/Profile.vue';
import AddComunidade from 'src/components/Dashboard/Views/Comunidades/Add.vue';

import MembrosPastorais from 'src/components/Dashboard/Views/MembrosPastorais';
import MembroPastoralProfile from 'src/components/Dashboard/Views/MembrosPastorais/Profile.vue';
import AddMembroPastoral from 'src/components/Dashboard/Views/MembrosPastorais/Add.vue';

import MensagensParoco from 'src/components/Dashboard/Views/MensagensParoco';
import MensagensParocoProfile from 'src/components/Dashboard/Views/MensagensParoco/Profile.vue';
import AddMensagensParoco from 'src/components/Dashboard/Views/MensagensParoco/Add.vue';

import EventosHome from 'src/components/Dashboard/Views/EventosHome';
import EventosHomeProfile from 'src/components/Dashboard/Views/EventosHome/Profile.vue';
import AddEventosHome from 'src/components/Dashboard/Views/EventosHome/Add.vue';

import ControleFinanceiro from 'src/components/Dashboard/Views/ControleFinanceiro';

const routes = [
  {
    path: '/',
    component: DashboardLayout,
    redirect: '/admin/overview',
    meta: { requiresAuth: true }

  },
  {
    path: '/login',
    component: Login,
  },
  {
    path: '/logout',
    component: Login,
  },
  {
    path: '/admin',
    component: DashboardLayout,
    redirect: '/admin/stats',
    meta: { requiresAuth: true },
    children: [
      {
        path: 'overview',
        name: 'Visão Geral',
        component: Overview
      },
      {
        path: 'financeiro',
        name: 'controle Financeiro',
        component: ControleFinanceiro
      },
      {
        path: 'eventos-home/add',
        name: 'Eventos Home',
        component: AddEventosHome,
      },
      {
        path: 'eventos-home/:id',
        name: 'Eventos Home',
        component: EventosHomeProfile,
      },
      {
        path: 'eventos-home',
        name: 'Eventos Home',
        component: EventosHome,
      },
      {
        path: 'mensagens-paroco/add',
        name: 'mensagens Paroco',
        component: AddMensagensParoco,
      },
      {
        path: 'mensagens-paroco/:id',
        name: 'mensagens Paroco',
        component: MensagensParocoProfile,
      },
      {
        path: 'mensagens-paroco',
        name: 'mensagens Paroco',
        component: MensagensParoco,
      },
      {
        path: 'visitantes/add',
        name: 'novo Visitante',
        component: AddVisitantes,
      },
      {
        path: 'visitantes/:id',
        name: 'Visitante',
        component: VisitanteProfile,
      },
      {
        path: 'visitantes',
        name: 'visitantes',
        component: Visitantes,
      },
      {
        path: 'participantes',
        name: 'participantes',
        component: Participantes
      },
      {
        path: 'membros-pastorais/add',
        name: 'novo Membro Pastoral',
        component: AddMembroPastoral,
      },
      {
        path: 'membros-pastorais/:id',
        name: 'membro Pastoral',
        component: MembroPastoralProfile,
      },
      {
        path: 'membros-pastorais',
        name: 'membros Pastorais',
        component: MembrosPastorais
      },
      {
        path: 'dizimistas',
        name: 'dizimistas',
        component: Dizimistas
      },
      {
        path: 'pastorais/add',
        name: 'nova Pastoral',
        component: AddPastoral,
      },
      {
        path: 'pastorais/:id',
        name: 'Pastoral',
        component: PastoralProfile,
      },
      {
        path: 'pastorais',
        name: 'pastorais',
        component: Pastorais
      },
      {
        path: 'comunidades/add',
        name: 'nova Comunidade',
        component: AddComunidade,
      },
      {
        path: 'comunidades/:id',
        name: 'Comunidade',
        component: ComunidadeProfile,
      },
      {
        path: 'comunidades',
        name: 'comunidades',
        component: Comunidades
      },
      {
        path: 'stats',
        name: 'stats',
        component: UserProfile
      },
      {
        path: 'notifications',
        name: 'notifications',
        component: Notifications
      },
      {
        path: 'icons',
        name: 'icons',
        component: Icons
      },
      {
        path: 'maps',
        name: 'maps',
        component: Maps
      },
      {
        path: 'typography',
        name: 'typography',
        component: Typography
      },
      {
        path: 'table-list',
        name: 'table-list',
        component: TableList
      }
    ]
  },
  { path: '*', component: NotFound }
];

/**
 * Asynchronously load view (Webpack Lazy loading compatible)
 * The specified component must be inside the Views folder
 * @param  {string} name  the filename (basename) of the view to load.
function view(name) {
   var res= require('../components/Dashboard/Views/' + name + '.vue');
   return res;
};**/

export default routes;
