export default{
    data(){
        return {
            error:false,
            load:false,
            btndisabled:false,
        }
    },
    methods:{
        validemail(email){
            return email.match(/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/) ? true : 'Email tidak valid';
        },
        onSubmit(action,data){
            this.$refs.form.validate()
            .then(valid=>{
                this.error = ''
                if(valid){
                    this.load = true
                    this.btndisabled = true
                    setTimeout(() => {
                        this.load = false
                        this.btndisabled = false
                        console.log("action",action)
                        console.log("data",data)
                        this.$router.push('/')
                    }, 5000);
                    // this.$store.dispatch(action,data)
                    // .then(()=>{
                    //     this.load = false
                    //     this.btndisabled = false
                    // })
                    // .catch(error=>{
                    //     this.error = error.response.data.message
                    //     this.load = false
                    //     this.btndisabled = false
                    // })
                }
            })
        },
        onAuth(action,data){
            this.$refs.form.validate()
            .then(valid=>{
                this.error = ''
                if(valid){
                    // this.load = true
                    // this.btndisabled = true
                    data.recaptcha = grecaptcha.getResponse()
                    console.log(data.recaptcha)
                    // this.$store.dispatch(action,data)
                    // .then(()=>{
                    //     this.load = false
                    //     this.btndisabled = false
                    // })
                    // .catch(error=>{
                    //     this.error = error.response.data.message
                    //     this.load = false
                    //     this.btndisabled = false
                    // })
                }
            })
        },
        // onLoad(){
        //     grecaptcha.render('recaptcha', {
        //         'sitekey' : '6Le8yDIeAAAAAAFpJytitjjkUbolleNNvvXef4qc'
        //     });
        // }
    }
}