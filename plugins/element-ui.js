import Vue from 'vue'
import Element from 'element-ui'
import locale from 'element-ui/lib/locale/lang/en'
import Icons from '~/components/icons.vue'
import Editable from '~/components/editable.vue'

Vue.component('icons', Icons)
Vue.component('editable', Editable)
Vue.prototype.$confirm = Element.MessageBox.confirm
Vue.prototype.$message = Element.Message

const defaultOpts = { showMessage: true }
Vue.prototype.$showConfirmBox = ({ ok, cancel, final, opts = defaultOpts }) =>
  Element.MessageBox.confirm('Changes not save yet. Leave without save?', {
    confirmButtonText: 'Save',
    cancelButtonText: 'Don’t save',
    cancelButtonClass: 'cancel-btn',
    confirmButtonClass: 'confirm-btn',
    type: 'error',
    center: true,
  })
    .then(() => {
      opts?.showMessage &&
        Element.Message({
          type: 'success',
          message: 'Update completed',
        })
      ok?.()
    })
    .catch(() => {
      opts?.showMessage &&
        Element.Message({
          type: 'info',
          message: 'Update canceled',
        })
      cancel?.()
    })
    .finally(() => final?.())

Vue.use(Element, { locale })
