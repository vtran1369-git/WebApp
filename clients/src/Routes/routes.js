import { lazy } from 'react';

const routes = [
    {
        path: '/register',
        component: lazy(() => import('../components/Register_Admin')),
    },
    {
        path: '/',
        component: lazy(() => import('../components/SecuredLoginNew')),
        exact: true
    },
    {
        path: 'home',
        component: lazy(() => import('../components/SecuredLoginNew')),
        exact: true
    },
    {
        path: 'truflow/config',
        component: lazy(() => import('../components/TruFlowConfig')),
        exact: true
    },
    {
        path: 'mfccal/all',
        component: lazy(() => import('../components/CDMList')),
        exact: true
    },
    {
        path: 'workorder/all',
        component: lazy(() => import('../components/ListWO_Limit')),
        exact: true
    },
    {
        path: 'cert/equipment/all',
        component: lazy(() => import('../components/EquipList')),
        exact: true
    },
    {
        path: 'traveler/truflow/limitall',
        component: lazy(() => import('../components/TFList')),
        exact: true
    },
    {
        path: 'mfccal/detail',
        component: lazy(() => import('../components/DetailMFC')),
        exact: true
    },
    {
        path: 'mfccal/cert',
        component: lazy(() => import('../components/CertReport')),
        exact: true
    },
    {
        path: 'customer/new',
        component: lazy(() => import('../components/AddCustomer')),
        exact: true
    },
    {
        path: 'mfccal/new',
        component: lazy(() => import('../components/NewMFC_Cal')),
        exact: true
    },
    {
        path: 'cert/new',
        component: lazy(() => import('../components/Cert_Form')),
        exact: true
    },
    {
        path: 'traveler/truflow/mfclist',
        component: lazy(() => import('../components/TravelerMFCs')),
        exact: true
    },
    {
        path: 'traveler/agitator/new',
        component: lazy(() => import('../components/NewAgitator')),
        exact: true
    },
    {
        path: 'traveler/agitator/all',
        component: lazy(() => import('../components/AgitatorList')),
        exact: true
    },
    {
        path: 'traveler/agitator/editview',
        component: lazy(() => import('../components/Agitator')),
        exact: true
    },
    {
        path: 'workorder/detail',
        component: lazy(() => import('../components/WorkOrder')),
        exact: true
    }

];

export default routes;

