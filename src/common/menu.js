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
            {
                title:'Promo',
                access:{
                    AD:true,
                    GA:true,
                    HO:true,
                    DI:true,
                },
        
            },
            {
                title:'Approval',
                access:{
                    AD:true,
                    GA:true,
                    HO:true,
                },
            },
            // {
            //     title:'Verifikasi',
            //     access:{
            //         GA:true,
            //     },
            // },
            // {
            //     title:'Laporan Claim',
            //     access:{
            //         GA:true,
            //     },
            // },
            {
                title:'Customer Hierarchy',
                submenu:[
                    {title : 'Region'},
                    {title : 'Area'},
                    {title : 'Distributor Group'},
                    {title : 'Distributor'},
                ],
                access:{
                    AD:true,
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
                    HO:true
                }
            },
            {
                title:'Document Claim',
                access:{
                    AD:true,
                    HO:true
                }
            },
            {
                title:'Alasan',
                access:{
                    AD:true,
                    HO:true
                }
            },
            {
                title:'Pajak',
                access:{
                    AD:true,
                    HO:true
                }
            },
            {
                title:'Spend Type',
                access:{
                    AD:true,
                    HO:true
                }
            },
            {
                title:'Promo Type',
                access:{
                    AD:true,
                    HO:true
                }
            },
            {
                title:'Investment Type',
                access:{
                    AD:true,
                    HO:true
                }
            },
            {
                title:'Budget Holder',
                access:{
                    AD:true,
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
        title:'Transaksi',
        icon:'transaksi',
        submenu:[
            {
                title: 'Klaim Promo',
                access:{
                    DI: true,
                }
            },
            // {
            //     title: 'Edit Budget',
            //     access:{
            //         GA: true,
            //         superadmin:true,
            //     }
            // },
            {
                title: 'Verifikasi',
                access:{
                    GA: true,
                }
            },
            // {
            //     title: 'Cetak Ulang BPP',
            //     access:{
            //         GA: true,
            //         superadmin:true,
            //     }
            // },
        ],
        access:{
            GA: true,
            DI: true
        },
    },
    {
        title:'Utility',
        icon:'utility',
        submenu:[
            {
                title:'Master Data',
                access:{
                    AD:true,
                    HO:true
                }
            },
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
                    HO:true
                }
            },
            // {
            //     title:'User Group',
            //     access:{
            //         AD:true,
            //         HO:true
            //     }
            // },
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
            HO:true
        },
    },
    {
        title:'Laporan',
        icon:'laporan',
        submenu:[
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
            {
                title:'Setup Invoice',
                access:{
                    AD:true,
                    GA:true,
                    HO:true,
                }
            },
            // {
            //     title:'Master',
            //     access:{
            //         GA:true,
            //     }
            // },
            // {
            //     title:'Laporan Promo',
            //     access:{
            //         GA:true,
            //     }
            // },
            // {
            //     title:'Alokasi',
            //     access:{
            //         GA:true,
            //     }
            // },
            {
                title:'Laporan Klaim',
                access:{
                    GA:true,
                    DI:true
                },
            },
            // {
            //     title:'Tpr Distributor',
            //     access:{
            //         GA:true,
            //     }
            // },
            // {
            //     title:'Verifikasi Claim',
            //     access:{
            //         GA:true,
            //     }
            // },
        ],
        access:{
            AD:true,
            GA:true,
            HO:true,
            DI:true
        },
    }
]

export { menu }