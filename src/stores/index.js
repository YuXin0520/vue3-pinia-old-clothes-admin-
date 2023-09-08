import { createPinia } from 'pinia'
import piniaPluginPersistedstate from 'pinia-plugin-persistedstate'

const pinia = createPinia()

pinia.use(piniaPluginPersistedstate)

export default pinia

export * from './modules/user'

export * from './modules/aside'

export * from './modules/depart'

export * from './modules/tabpan'

