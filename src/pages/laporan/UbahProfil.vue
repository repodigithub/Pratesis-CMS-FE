<template>
<q-page class="q-pb-lg">
    <div class="row ">
        <q-card flat class="col-12">
            <q-card-section class="q-py-sm">
                <div class="row justify-between">
                    <q-breadcrumbs>
                        <!-- <q-breadcrumbs-el icon="home" to="/" />
                        <q-breadcrumbs-el label="Docs" icon="widgets"  />
                        <q-breadcrumbs-el label="Breadcrumbs" icon="navigation" /> -->
                        <q-breadcrumbs-el label="Ubah Profil" style="color:#00000073;"  />
                    </q-breadcrumbs>
                </div>
            </q-card-section>
        </q-card>
    </div>
    <div class="row justify-center">
        <div class="col-12">
            <q-img
                src="~assets/dashboard/gradient.svg"
                spinner-color="primary"
                spinner-size="50px"
            />
        </div>
            <q-card flat class="col-4 " style="margin-top:-70px;">
                <q-card-section >
                    <div class="row justify-center">
                        <div class="bg-primary own-card text-white text-center" style="width:140px;height:140px;margin-top:-70px;border:8px solid white;border-radius:40px; font-size:60px;line-height:140px;">
                            J
                        </div>
                    </div>
                    <div class="row justify-between q-mt-md">
                        <div class="col-4">
                            <label for="userid" class="font-normal">User ID</label>
                            <q-input v-model="user.userid" dense outlined id="userid" class="q-mb-md" 
                            hide-bottom-space
                            placeholder="User ID"
                            >
                                <template v-slot:append>
                                <q-icon
                                    name="person"
                                />
                                </template>
                            </q-input>
                        </div>
                        <div class="col-7">
                            <label for="fullname" class="font-normal">Full Name</label>
                            <q-input v-model="user.fullname" dense outlined id="fullname" class="q-mb-md" 
                            hide-bottom-space
                            placeholder="Full Name"
                            lazy-rules
                            :rules="[
                            (val) => (val && val.length > 0) || 'Full Name tidak boleh kosong'
                            ]"
                            >
                                <template v-slot:append>
                                <q-icon
                                    name="person"
                                />
                                </template>
                            </q-input>
                        </div>
                        <div class="col-12">
                            <label for="email" class="font-normal">Email Address</label>
                            <q-input v-model="user.email" dense outlined id="email" class="q-mb-md" type="email"
                            lazy-rules
                            hide-bottom-space
                            placeholder="your.name@gmail.com"
                            :rules="[
                            (val) => (val && val.length > 0) || 'Email tidak boleh kosong',val => validemail(val)
                            ]"
                            >
                                <template v-slot:append>
                                <q-icon
                                    name="email"
                                />
                                </template>
                            </q-input>
                        </div>
                        <div class="col-12">
                            <label for="username" class="font-normal">Username</label>
                            <q-input v-model="user.username" dense outlined id="username" class="q-mb-md" 
                            lazy-rules
                            placeholder="username"
                            hide-bottom-space
                            :rules="[
                            (val) => (val && val.length > 0) || 'Username tidak boleh kosong'
                            ]"
                            >
                                <template v-slot:append>
                                <q-icon
                                    name="person"
                                />
                                </template>
                            </q-input>
                        </div>
                        <div class="col-12">
                            <label for="password" class="font-normal">Password</label>
                            <q-input v-model="user.password"  dense outlined id="password" :type="visibility ? 'password' : 'text'" class="q-mb-md"
                            lazy-rules
                            placeholder="password"
                            hide-bottom-space
                            :rules="[
                                (val) => (val && val.length > 0) || 'password tidak boleh kosong'
                            ]"
                            >
                                <template v-slot:append>
                                <q-icon
                                    :name="visibility ? 'visibility' : 'visibility_off'"
                                    @click="visibility = !visibility"
                                    class="cursor-pointer"
                                />
                                </template>
                            </q-input>
                        </div>
                        <div class="col-12">
                            <label for="email" class="font-normal">User Level</label>
                            <q-select  outlined dense v-model="user.role" :options="optrole" placeholder="user level"  lazy-rules hide-bottom-space class="q-mb-md"
                                :rules="[
                                    val => val !== null && val !== '' || 'User Level tidak boleh kosong',
                                ]"/>
                        </div>
                        <div class="col-6">
                            <label for="kode_depo" class="font-normal">Kode Depo</label>
                            <q-select  outlined dense v-model="user.depo" :options="optdepo"  lazy-rules hide-bottom-space class="q-mb-md" id="kode_depo"
                                :rules="[
                                    val => val !== null && val !== '' || 'Kode Depo tidak boleh kosong',
                                ]">
                            </q-select>
                        </div>
                        <div class="col-5">
                            <label for="nama_depo" class="font-normal">Nama Depo</label>
                            <q-input v-model="user.nama_depo"  dense outlined id="nama_depo" class="q-mb-md"
                            lazy-rules
                            hide-bottom-space
                            :rules="[
                                (val) => (val && val.length > 0) || 'Nama Depo tidak boleh kosong'
                            ]"
                            >
                            <template v-slot:append>
                                <q-icon
                                    name="person"
                                />
                                </template>
                            </q-input>
                        </div>
                        <div class="col-6">
                            <label for="kode_distributor" class="font-normal">Kode Distributor</label>
                            <q-select  outlined dense v-model="user.distributor" :options="optdistributor"  lazy-rules hide-bottom-space class="q-mb-md" id="kode_distributor"
                                :rules="[
                                    val => val !== null && val !== '' || 'Kode Depo tidak boleh kosong',
                                ]">
                            </q-select>
                        </div>
                        <div class="col-5">
                            <label for="nama_distributor" class="font-normal">Nama Distributor</label>
                            <q-input v-model="user.nama_distributor"  dense outlined id="nama_distributor" class="q-mb-md"
                            lazy-rules
                            hide-bottom-space
                            :rules="[
                                (val) => (val && val.length > 0) || 'Nama Distributor tidak boleh kosong'
                            ]"
                            >
                                <template v-slot:append>
                                <q-icon
                                    name="person"
                                />
                                </template>
                            </q-input>
                        </div>
                    </div>
                </q-card-section>
                <q-card-actions align="right" class="q-px-lg q-pb-lg">
                    <q-btn label="Save" no-caps color="secondary" unelevated padding="9px 16px"/>
                </q-card-actions>
            </q-card>
    </div>
</q-page>
</template>

<script>
export default {
    data(){
        return{
            user:{
                userid:'00435',
                fullname:'John Doe',
                email:'johndoe@gmail.com',
                username:'johndoe',
                role:'Head Office',
                optrole:['Head Office','Depot','Distributor','Super Admin'],
                depo:'0234',
                optdepo:['0234','2342','5435'],
                nama_depo:'PT.lorem ipsum doreum',
                distributor:'j5345',
                optdistributor:['j5345','r343','3g456'],
                nama_distributor:'PT.llorwmdsdf',
                password:'password',
            },
            visibility:true
        }
    }
}
</script>

<style>

</style>