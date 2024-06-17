import { createRouter, createWebHashHistory } from 'vue-router';
import Auth from './components/Auth.vue';
import Home from './components/Home.vue';
import ProductForm from './components/ProductForm.vue';
import InventsTable from './components/InventsTable.vue';
import CategoryTable from "@/components/CategoryTable.vue";
import LocationTable from "@/components/LocationTable.vue";
import SignUp from './components/SignUp.vue';

const routes = [
    { path: '/', redirect: '/login' },
    { path: '/login', component: Auth },
    { path: '/SignUp', component: SignUp },
    { path: '/home', component: Home, meta: { requiresAuth: true } },
    { path: '/ProductForm', component: ProductForm, meta: { requiresAuth: true } },
    { path: '/InventsTable', component: InventsTable, meta: { requiresAuth: true } },
    { path: '/CategoryTable', component: CategoryTable, meta: { requiresAuth: true } },
    { path: '/LocationTable', component: LocationTable, meta: { requiresAuth: true } }
];

const router = createRouter({
    history: createWebHashHistory(),
    routes
});

router.beforeEach((to, from, next) => {
    if (to.meta.requiresAuth && !localStorage.getItem('token')) {
        next('/login');
    } else {
        next();
    }
});

export default router;
