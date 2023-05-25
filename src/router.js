import { createRouter, createWebHistory } from 'vue-router'
import Transactions from './components/Transactions.vue'
import Calculator from './components/Calculator.vue';
import Login from './components/Login.vue';
import Register from './components/Register.vue';
import store from './store';

const routes = [
  {
    path: '/',
    redirect: '/login' // Redirect the root URL to the login page
  },
  {
    path: '/transactions',
    name: 'Transactions',
    component: Transactions,
    meta: { requiresAuth: true }, 
  },
  {
    path: '/calculator',
    name: 'Calculator',
    component: Calculator,
    meta: { requiresAuth: true }, 

  },
  {
    path: '/login',
    name: 'Login',
    component: Login
  },
  {
    path: '/register',
    name: 'Register',
    component: Register
  }
]

const router = createRouter({
  history: createWebHistory(),
  routes
})

// Navigation guard
router.beforeEach((to, from, next) => {
  const isLoggedIn = store.state.loggedIn;

  // Check if the route requires authentication
  if (to.meta.requiresAuth && !isLoggedIn) {
    // Redirect to login page if not authenticated
    next('/login');
  } else {
    next(); // Proceed to the next route
  }
});

export default router
