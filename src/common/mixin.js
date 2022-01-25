export default{
    
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
                    this.load = true
                    this.btndisabled = true
                    let newData = {
                        "g-recaptcha-response" : grecaptcha.getResponse()
                    }
                    let send = {
                        ...data, ...newData
                    }
                    this.$store.dispatch(action,send)
                    .then(()=>{
                        this.load = false
                        this.btndisabled = false
                    })
                    .catch(error=>{
                        this.error = error.response.data.message
                        this.load = false
                        this.btndisabled = false
                    })
                }
            })
        },
      
    }
}