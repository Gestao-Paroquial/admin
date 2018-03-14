import DashboardLayout from '@/components/Dashboard/Layout/DashboardLayout';
// GeneralViews
import NotFound from '@/components/GeneralViews/NotFoundPage';
import Login from '@/components/GeneralViews/Login';

// Admin pages
import Overview from '@/components/Dashboard/Views/Overview';
import UserProfile from '@/components/Dashboard/Views/UserProfile';
import Notifications from '@/components/Dashboard/Views/Notifications';
import Icons from '@/components/Dashboard/Views/Icons';
import Maps from '@/components/Dashboard/Views/Maps';
import Typography from '@/components/Dashboard/Views/Typography';
import TableList from '@/components/Dashboard/Views/TableList';

import Visitantes from '@/components/Dashboard/Views/Visitantes';
import VisitanteProfile from '@/components/Dashboard/Views/Visitantes/Profile';
import AddVisitantes from '@/components/Dashboard/Views/Visitantes/Add';

import Pastorais from '@/components/Dashboard/Views/Pastorais';
import PastoralProfile from '@/components/Dashboard/Views/Pastorais/Profile';
import AddPastoral from '@/components/Dashboard/Views/Pastorais/Add';

import Comunidades from '@/components/Dashboard/Views/Comunidades';
import ComunidadeProfile from '@/components/Dashboard/Views/Comunidades/Profile';
import AddComunidade from '@/components/Dashboard/Views/Comunidades/Add';

import MembrosPastorais from '@/components/Dashboard/Views/MembrosPastorais';
import MembroPastoralProfile from '@/components/Dashboard/Views/MembrosPastorais/Profile';
import AddMembroPastoral from '@/components/Dashboard/Views/MembrosPastorais/Add';

import MensagensParoco from '@/components/Dashboard/Views/MensagensParoco';
import MensagensParocoProfile from '@/components/Dashboard/Views/MensagensParoco/Profile';
import AddMensagensParoco from '@/components/Dashboard/Views/MensagensParoco/Add';

import EventosHome from '@/components/Dashboard/Views/EventosHome';
import EventosHomeProfile from '@/components/Dashboard/Views/EventosHome/Profile';
import AddEventosHome from '@/components/Dashboard/Views/EventosHome/Add';

import ControleFinanceiro from '@/components/Dashboard/Views/ControleFinanceiro';

import Eventos from '@/components/Dashboard/Views/Eventos';
import AddEventos from '@/components/Dashboard/Views/Eventos/Add';
import ProfileEventos from '@/components/Dashboard/Views/Eventos/Profile';


const routes = [
  {
    path: '/',
    component: DashboardLayout,
    redirect: '/admin/overview',
    meta: { requiresAuth: true },

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
        component: Overview,
      },
      {
        path: 'financeiro',
        name: 'controle Financeiro',
        component: ControleFinanceiro,
      },
      {
        path: 'eventos',
        name: 'Eventos',
        component: Eventos,
      },
      {
        path: 'eventos/add',
        name: 'Eventos',
        component: AddEventos,
      },
      {
        path: 'eventos/:id',
        name: 'Eventos',
        component: ProfileEventos,
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
        component: MembrosPastorais,
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
        component: Pastorais,
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
        component: Comunidades,
      },
      {
        path: 'stats',
        name: 'stats',
        component: UserProfile,
      },
      {
        path: 'notifications',
        name: 'notifications',
        component: Notifications,
      },
      {
        path: 'icons',
        name: 'icons',
        component: Icons,
      },
      {
        path: 'maps',
        name: 'maps',
        component: Maps,
      },
      {
        path: 'typography',
        name: 'typography',
        component: Typography,
      },
      {
        path: 'table-list',
        name: 'table-list',
        component: TableList,
      },
    ],
  },
  { path: '*', component: NotFound },
];

/**
 * Asynchronously load view (Webpack Lazy loading compatible)
 * The specified component must be inside the Views folder
 * @param  {string} name  the filename (basename) of the view to load.
function view(name) {
   var res= require('@/components/Dashboard/Views/' + name + '');
   return res;
};* */

export default routes;
