import Vue from "vue";
import VueRouter from "vue-router";
import Login from "../views/Login.vue";
import List from "@/views/List.vue";
import Register from "@/views/Register.vue";
import Inspection from "@/views/Inspection.vue";
import BookAppointment from "@/views/BookAppointment.vue";
import ClientAppointments from "@/views/ClientAppointments.vue";

Vue.use(VueRouter);

const routes = [
  {
    path: "/",
    name: "Login",
    component: Login
  },

  {
    path: '/book/:id',
    name: "BookAppointment",
    component: BookAppointment
  },

  {
    path: '/list/:id',
    name: 'List',
    component: List,
    props: true/*,
    beforeEnter: (to, from, next) => {
      if(to.params.name){
        next();
      }else{
        next({name: 'Login'})
      }
    }*/

  },

  {
    path: '/register',
    name: 'Register',
    component: Register
  },

  {
    path: '/appointmentsclient/:id',
    name: 'ClientAppointments',
    component: ClientAppointments
  },

  {
    path: '/inspection/:id',
    name: 'Inspection',
    component: Inspection
  }
];

const router = new VueRouter({
  mode: "history",
  base: process.env.BASE_URL,
  routes
});

export default router;
