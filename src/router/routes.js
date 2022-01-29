
const routes = [
  {
    path: '/',
    component: () => import('layouts/MainLayout.vue'),
    children: [
      { path: '',name:'Overview', component: () => import('pages/Index.vue')},
      // Master - Sales Hierarchy
      { path: 'area',name:'Area', component: () => import('pages/master/Area.vue'),
        meta:{
            master:true,
            salesh:true
        }
      },
      { path: 'region',name:'Region', component: () => import('pages/master/Region.vue'),
        meta:{
            master:true,
            salesh:true
        }
      },
      { path: 'distributor-group',name:'Distributor Group', component: () => import('pages/master/DistributorGroup.vue'),
        meta:{
            master:true,
            salesh:true
        }
      },
      // Master - Sales Hierarchy-end
      { path: 'promo',name:'Promo', component: () => import('pages/master/Promo.vue'),
        meta:{
          master:true
        }
      },
      { path: 'documentclaim',name:'Document Claim', component: () => import('pages/master/DocumentClaim.vue') },
      
      { path: 'user',name:'User', component: () => import('pages/utility/User.vue'),
        meta:{
            utility:true
          }
      },
      { path: 'ubahprofil',name:'Ubah Profil', component: () => import('pages/laporan/UbahProfil.vue'),
        meta:{
          laporan:true
        } 
      },
    ],
    meta:{
      requireAuth:true,
    }
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
