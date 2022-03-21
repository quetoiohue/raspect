import Vue from 'vue'
import Element from 'element-ui'
import locale from 'element-ui/lib/locale/lang/en'
import Icons from '~/components/icons.vue'

Vue.component('icons', Icons)
Vue.prototype.$confirm = Element.MessageBox.confirm
Vue.prototype.$message = Element.Message

Vue.use(Element, { locale })
