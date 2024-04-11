import Buefy from 'buefy'
import 'buefy/dist/buefy.css'


export default defineNuxtPlugin({
    name: 'buefy-plugin',
    hooks: {
      'app:created'(vueApp) {
        vueApp.use(Buefy)
      }
    }
  })
  