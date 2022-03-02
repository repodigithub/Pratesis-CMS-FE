const menu = [
    {
        title:'Overview',
        icon: 'overview',
        access:{
            AD:true,
            DI:true,
            GA:true,
            HO:true,
            SA:true
        },
    },
    {
        title:'Master',
        icon: 'master',
        submenu:[
            // {
            //     title:'Promo',
            //     access:{
            //         superadmin:true,
            //         distributor:true,
            //         headoffice:true
            //     },
        
            // },
            
            {
                title:'Sales Hierarchy',
                submenu:[
                    {title : 'Region'},
                    {title : 'Area'},
                    {title : 'Distributor Group'},
                    {title : 'Distributor'},
                ],
                access:{
                    AD:true,
                    GA:true,
                    HO:true
                }
            },
            {
                title:'Product Hierarchy',
                submenu:[
                    {title : 'Divisi'},
                    {title : 'Category'},
                    {title : 'Brand'},
                    {title : 'Sub Brand'},
                    {title : 'Product'},
                ],
                access:{
                    AD:true,
                    GA:true,
                    HO:true
                }
            },
            {
                title:'Document Claim',
                access:{
                    AD:true,
                    GA:true,
                    HO:true
                }
            },
            {
                title:'Alasan',
                access:{
                    AD:true,
                    GA:true,
                    HO:true
                }
            },
            {
                title:'Pajak',
                access:{
                    AD:true,
                    GA:true,
                    HO:true
                }
            },
            {
                title:'Spend Type',
                access:{
                    AD:true,
                    GA:true,
                    HO:true
                }
            },
            {
                title:'Type Promo',
                access:{
                    AD:true,
                    GA:true,
                    HO:true
                }
            },
            {
                title:'Investment',
                access:{
                    AD:true,
                    GA:true,
                    HO:true
                }
            },
            {
                title:'Budget Holder',
                access:{
                    AD:true,
                    GA:true,
                    HO:true
                }
            },
        ],
        access:{
            AD:true,
            GA:true,
            HO:true,
            DI:true,
        },
    },
    {
        title:'Utility',
        icon:'utility',
        submenu:[
            // {
            //     title:'Master Data',
            //     access:{
            //         AD:true,
            //         GA:true,
            //         HO:true
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
                    AD:true,
                    GA:true,
                    HO:true
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
            AD:true,
            GA:true,
            HO:true
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
                    AD:true,
                    GA:true,
                    HO:true,
                    DI:true,
                    SA:true,
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
            AD:true,
            GA:true,
            HO:true,
            DI:true
        },
    },
    // {
    //     title:'Transaksi',
    //     icon:'transaksi',
    //     submenu:[
    //         {
    //             title: 'Klaim Promo',
    //             access:{
    //                 superadmin:true,
    //             }
    //         },
    //         {
    //             title: 'Edit Budget',
    //             access:{
    //                 superadmin:true,
    //             }
    //         },
    //         {
    //             title: 'Verifikasi',
    //             access:{
    //                 superadmin:true,
    //             }
    //         },
    //         {
    //             title: 'Cetak Ulang BPP',
    //             access:{
    //                 superadmin:true,
    //             }
    //         },
    //     ],
    //     access:{
    //         superadmin:true,
    //         distributor:true,
    //         depot:true
    //     },
    // }
]

export { menu }