const menu = [
    {
        title:'Overview',
        icon: 'overview',
        access:{
            superadmin:true,
            distributor:true,
            headoffice:true,
            depot:true
        },
    },
    // {
    //     title:'Master',
    //     icon: 'master',
    //     submenu:[
    //         {
    //             title:'Promo',
    //             access:{
    //                 superadmin:true,
    //                 distributor:true,
    //                 headoffice:true
    //             },
        
    //         },
            
    //         {
    //             title:'Sales Hierarchy',
    //             submenu:[
    //                 {title : 'Region'},
    //                 {title : 'Area'},
    //                 {title : 'Distributor Group'},
    //                 {title : 'Distributor'},
    //             ],
    //             access:{
    //                 superadmin:true,
    //                 headoffice:true
    //             }
    //         },
    //         {
    //             title:'Product Hierarchy',
    //             submenu:[
    //                 {title : 'Divisi'},
    //                 {title : 'Category'},
    //                 {title : 'Brand'},
    //                 {title : 'Sub Brand'},
    //                 {title : 'Product'},
    //             ],
    //             access:{
    //                 superadmin:true,
    //                 headoffice:true
    //             }
    //         },
    //         {
    //             title:'Document Claim',
    //             access:{
    //                 superadmin:true,
    //                 headoffice:true
    //             }
    //         },
    //         {
    //             title:'Alasan',
    //             access:{
    //                 superadmin:true,
    //                 headoffice:true
    //             }
    //         },
    //         {
    //             title:'Tax',
    //             access:{
    //                 superadmin:true,
    //                 headoffice:true
    //             }
    //         },
    //         {
    //             title:'Spend Type',
    //             access:{
    //                 superadmin:true,
    //                 headoffice:true
    //             }
    //         },
    //         {
    //             title:'Type Promo',
    //             access:{
    //                 superadmin:true,
    //                 headoffice:true
    //             }
    //         },
    //         {
    //             title:'Investment',
    //             access:{
    //                 superadmin:true,
    //                 headoffice:true
    //             }
    //         },
    //         {
    //             title:'Budget Holder',
    //             access:{
    //                 superadmin:true,
    //                 headoffice:true
    //             }
    //         },
    //     ],
    //     access:{
    //         superadmin:true,
    //         distributor:true,
    //         headoffice:true
    //     },
    // },
    {
        title:'Utility',
        icon:'utility',
        submenu:[
            // {
            //     title:'Master Data',
            //     access:{
            //         superadmin:true,
            //         headoffice:true
            //     }
            // },
            // {
            //     title:'Daftar Upload Budget',
            //     access:{
            //         superadmin:true,
            //         headoffice:true
            //     }
            // },
            // {
            //     title:'Status Data',
            //     access:{
            //         superadmin:true,
            //         headoffice:true
            //     }
            // },
            // {
            //     title:'Upload',
            //     access:{
            //         superadmin:true,
            //         headoffice:true
            //     }
            // },
            // {
            //     title:'Otorisasi Menu',
            //     access:{
            //         superadmin:true,
            //         headoffice:true
            //     }
            // },
            {
                title:'User',
                access:{
                    superadmin:true,
                    headoffice:true
                }
            },
            // {
            //     title:'Group User',
            //     access:{
            //         superadmin:true,
            //         headoffice:true
            //     }
            // },
        ],
        access:{
            superadmin:true,
            distributor:true,
            headoffice:true,
            depot:true
        },
    },
    {
        title:'Laporan',
        icon:'laporan',
        submenu:[
            // {
            //     title:'Master',
            //     access:{
            //         superadmin:true,
            //         headoffice:true
            //     }
            // },
            {
                title:'Ubah Profil',
                access:{
                    superadmin:true,
                    headoffice:true
                }
            },
            // {
            //     title:'Upload Paid Claim',
            //     access:{
            //         superadmin:true,
            //         headoffice:true
            //     }
            // },
            // {
            //     title:'Data Promosi',
            //     access:{
            //         superadmin:true,
            //         headoffice:true
            //     }
            // },
            // {
            //     title:'Alokasi',
            //     access:{
            //         superadmin:true,
            //         headoffice:true
            //     }
            // },
            // {
            //     title:'Klaim',
            //     access:{
            //         superadmin:true,
            //         headoffice:true
            //     }
            // },
            // {
            //     title:'Tpr Distributor',
            //     access:{
            //         superadmin:true,
            //         headoffice:true
            //     }
            // },
        ],
        access:{
            superadmin:true,
            distributor:true,
            headoffice:true,
            depot:true
        },
    },
    {
        title:'Transaksi',
        icon:'transaksi',
        submenu:[
            {
                title: 'Klaim Promo',
                access:{
                    superadmin:true,
                }
            },
            {
                title: 'Edit Budget',
                access:{
                    superadmin:true,
                }
            },
            {
                title: 'Verifikasi',
                access:{
                    superadmin:true,
                }
            },
            {
                title: 'Cetak Ulang BPP',
                access:{
                    superadmin:true,
                }
            },
        ],
        access:{
            superadmin:true,
            distributor:true,
            depot:true
        },
    }
]

export { menu }