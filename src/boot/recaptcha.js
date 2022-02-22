import { boot } from 'quasar/wrappers'

// "async" is optional;
// more info on params: https://v2.quasar.dev/quasar-cli/boot-files
export default boot(async ({ app }) => {
    let 
      id = 'recaptcha-google',
      url = 'https://www.google.com/recaptcha/api.js'
  let promise = null
  app.config.globalProperties.recaptchasitekey = '6LcPB5QeAAAAAIZwz-rzXFU9OomQms0v8oe_Mj8s'
  app.config.globalProperties.recaptcha = () => {
    if (!promise) {
      promise = new Promise((resolve, reject) => {
        if (document.getElementById(id)) {
          console.error(`Error loading ${url} async: ${id} is not unique`)
          return
        }
        let script = document.createElement('script')
        script.src = url
        script.async = "true"
        script.id = id
        script.onload = () => {
          resolve("ok")
        }
        script.onerror = (err) => {
          reject(err)
        }
        document.body.appendChild(script)
      })
    }
    return promise
  }
})
