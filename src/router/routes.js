
const routes = [
  {
    path: '/',
    component: () => import('layouts/MainLayout.vue'),
    children: [
      { path: '',name:'Overview', component: () => import('pages/Index.vue')},
      { path: 'promo',name:'Promo', component: () => import('pages/master/Promo.vue'),
        meta:{
          master:true
        }
      },
      { path: 'documentclaim',name:'Document Claim', component: () => import('pages/master/DocumentClaim.vue') },
      { path: 'region',name:'Region', component: () => import('pages/master/Region.vue') },
      { path: 'user',name:'User', component: () => import('pages/utility/User.vue') },
      { path: 'ubahprofil',name:'Ubah Profil', component: () => import('pages/laporan/UbahProfil.vue') },
    ]
  },
  {
    path:'/auth',
    redirect: '/login',
    component: () => import('layouts/AuthLayout.vue'),
    children: [
      { path:'/login',name:'login',component:()=> import('pages/auth/Login.vue') },
      { path:'/register',component:()=>import('pages/auth/Register.vue') },
      { path:'/registersuccess',component:()=>import('pages/auth/Rsuccess.vue') },
    ]
  },

  // Always leave this as last one,
  // but you can also remove it
  {
    path: '/:catchAll(.*)*',
    component: () => import('pages/Error404.vue')
  }
]

export default routes
