import Vue from 'vue'

export default (ctx) => {
  Vue.filter('dateFormat', function (value, format = 'DD MMM YYYY') {
    return ctx.$moment(value).format(format)
  })
  Vue.filter('leadWord', function (name) {
    if (!name) return ''
    const lastName = name.split(' ').pop()
    return lastName[0]
  })
}
