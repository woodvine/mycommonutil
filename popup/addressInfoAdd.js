import Vue from 'vue'
// 引入弹出页面组件
import AddressInfoAdd from '@/components/popup/AddressInfoAdd.vue'
// 获取该组件的构造函数
const AddressInfoAddConstructor = Vue.extend(AddressInfoAdd)
// 提供一个模块方法
const popupAddressInfoAdd = function() {
  // 该方法返回一个 Promise 对象
  return new Promise((res, rej) => {
    // 使用构造函数，new 一个 AddressInfoAdd.vue 组件
    const popupPage = new AddressInfoAddConstructor({
      // AddressInfoAdd.vue 组件 挂载的元素 el 属性，是一个动态创建的 div
      el: document.createElement('div')
    })

    // 将 AddressInfoAdd.vue 组件添加到 body 元素上
    // popupPage.$el 就是 AddressInfoAdd.vue 组件的 dom 元素
    document.body.appendChild(popupPage.$el)

    // 为 AddressInfoAdd.vue 提供 ok 回调函数，执行 resolve 方法
    popupPage.ok = function(okData) {
      // confirmDom.isShow = false
      popupPage.$el.parentNode.removeChild(popupPage.$el)
      console.log('return resolve' + okData)
      res(okData)
    }

    // 为 AddressInfoAdd.vue 提供 close 回调函数，执行 reject 方法
    popupPage.close = function() {
      popupPage.$el.parentNode.removeChild(popupPage.$el)
      console.log('return reject')
      rej()
    }
  })
}
// 导出模块
export default popupAddressInfoAdd
