
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
      { path: 'distributor',name:'Distributor', component: () => import('pages/master/Distributor.vue'),
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
      { path: 'document-claim',name:'Document Claim', component: () => import('pages/master/DocumentClaim.vue'),
        meta:{
            master:true
        }
      },
      { path: 'investment',name:'Investment', component: () => import('pages/master/InvestmentType.vue'),
        meta:{
            master:true
        }
      },
      { path: 'spend',name:'Spend Type', component: () => import('pages/master/SpendType.vue'),
        meta:{
            master:true
        }
      },
      { path: 'tax',name:'Pajak', component: () => import('pages/master/Pajak.vue'),
        meta:{
            master:true
        }
      },
      { path: 'alasan',name:'Alasan', component: () => import('pages/master/Alasan.vue'),
        meta:{
            master:true
        }
      },
      { path: 'budget-holder',name:'Budget Holder', component: () => import('pages/master/BudgetHolder.vue'),
        meta:{
            master:true
        }
      },
      { path: 'tipe-promo',name:'Type Promo', component: () => import('pages/master/TypePromo.vue'),
        meta:{
            master:true
        }
      },
      // Start Produk Hierarchy
      { path: 'divisi',name:'Divisi', component: () => import('pages/master/Divisi.vue'),
        meta:{
            master:true,
            producth:true
        }
      },
      { path: 'category',name:'Category', component: () => import('pages/master/Category.vue'),
        meta:{
            master:true,
            producth:true
        }
      },
      { path: 'sub-brand',name:'Sub Brand', component: () => import('pages/master/SubBrand.vue'),
        meta:{
            master:true,
            producth:true
        }
      },
      { path: 'brand',name:'Brand', component: () => import('pages/master/Brand.vue'),
        meta:{
            master:true,
            producth:true
        }
      },
      { path: 'product',name:'Product', component: () => import('pages/master/Produk.vue'),
        meta:{
            master:true,
            producth:true
        }
      },
      // End Produk Hierarchy
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
