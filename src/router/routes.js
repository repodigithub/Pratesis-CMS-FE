
const routes = [
  {
    path: '/',
    redirect:{name:'Overview'},
    component: () => import('layouts/MainLayout.vue'),
    children: [
      { path: 'overview',name:'Overview', component: () => import('pages/Overview.vue')},

      /////FITUR LAPORAN ////////////////////////////////////////////////////
      { path: 'ubahprofil',name:'Ubah Profil', component: () => import('pages/laporan/UbahProfil.vue'),
        meta:{
          laporan:true
        } 
      },
      { path: 'laporan-claim', name:'Laporan Klaim', component: () => import('pages/laporan/LaporanKlaim.vue'),
        meta:{
          laporan:true
        }
      },
      /////END FITUR LAPORAN ////////////////////////////////////////////////////

      //////FITUR MASTER//////////////////////////////////////////////////
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
      { path: 'promo',name:'promo', component: () => import('pages/master/Promo.vue'),
        redirect:{name : 'Promo'},
        children:[
          { path:'',name:'Promo',component:()=> import('components/Promo/ListPromo.vue')},
          { path:'detail-promo/:id',name:'Detail Promo',component:()=> import('components/Promo/DetailPromo.vue')},
          { path:'detail-promo/:id/produk',name:'Add budget Produk',component:()=> import('components/Promo/produk/AddProduk.vue')},
          { path:'detail-promo/:id/produk/:produk',name:'Edit budget Produk',component:()=> import('components/Promo/produk/EditProduk.vue')},
          { path:'detail-promo/:id/detail-produk/:produk',name:'Detail Produk',component:()=> import('components/Promo/produk/DetailProduk.vue')},
        ],
        meta:{
          master:true
        }
      },
      { path: 'approval',name:'approval', component: () => import('pages/master/Approval.vue'),
        redirect: {name : 'Approval'},
        children:[
          { path:'',name:'Approval',component:()=> import('components/Approval/ListApproval.vue')},
          { path:'detail-promo/:id',name:'Detail Approval Promo',component:()=> import('components/Approval/DetailApproval.vue')},
        ],
        meta:{
          master:true
        }
      },
      // { path: 'verifikasi', name:'Verifikasi', component: () => import('pages/master/Verifikasi.vue')},
      
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
      //////END FITUR MASTER//////////////////////////////////////////////////

       /////FITUR TRANSAKSI ////////////////////////////////////////////////////
      { path: 'klaim-promo',name:'Klaim Promo', component: () => import('pages/transaksi/KlaimPromo.vue'),
        meta:{
          transaksi:true
        } 
      },
      { path: 'verifikasi', name:'Verifikasi', component: () => import('pages/transaksi/Verifikasi.vue'),
        meta:{
          transaksi:true
        } 
      },
      /////END FITUR TRANSAKSI ////////////////////////////////////////////////////

      /////FITUR UTILITY ////////////////////////////////////////////////////
      { path: 'user',name:'User', component: () => import('pages/utility/User.vue'),
        meta:{
            utility:true
          }
      },
      { path: 'master-data',name:'masterdata', component: () => import('pages/utility/MasterData.vue'),
        redirect:{name : 'Master Data'},
        children:[
          { path:'',name:'Master Data',component:()=> import('components/MasterData/Utama.vue')},
          { path:':folder',name:'Detail Master Data',component:()=> import('components/MasterData/Detail.vue')},
        ],
        meta:{
            utility:true
          }
      },
      { path: 'setupinvoice',name:'Setup Invoice', component: () => import('pages/laporan/SetupInvoice.vue'),
        meta:{
          laporan:true
        } 
      },
      { path: 'laporan/master',name:'Master', component: () => import('pages/laporan/Master.vue'),
        meta:{
          laporan:true
        }
      },
      { path: 'laporan/promo',name:'Laporan Promo', component: () => import('pages/laporan/PromoReport.vue'),
        meta:{
          laporan:true
        }
      },
      { path: 'laporan/alokasi',name:'Alokasi', component: () => import('pages/laporan/Alokasi.vue'),
        meta:{
          laporan:true
        }
      },
      { path: 'laporan/alokasi',name:'Tpr Distributor', component: () => import('pages/laporan/Tpr.vue'),
        meta:{
          laporan:true
        }
      },
      { path: 'laporan/klaim',name:'Verifikasi Claim', component: () => import('pages/laporan/Verify.vue'),
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
