<template>
  <!--这里使用 el-form 组件，需要传递 model 数据给表单组件，所有的表单组件都引用该数据-->
  <el-form v-show="true" ref="form" :rules="rules" :model="formData" label-width="120px">
    <el-form-item label="帐号" prop="userId">
      <el-input v-model="formData.userId" />
    </el-form-item>
    <el-form-item label="昵称" prop="userName">
      <el-input v-model="formData.userName" />
    </el-form-item>
    <el-form-item label="电话" prop="telephone">
      <el-input v-model="formData.telephone" />
    </el-form-item>
    <el-form-item>
      <!--这个按钮用来弹出添加页面-->
      <el-button @click="popupAddressAddPage">添加收获地址</el-button>
      <!--el-tag 用于回显每次添加的数据-->
      <el-tag
        v-for="tag in formData.addressInfos"
        :key="tag.city"
        closable
        size="medium"
        :type="tag.zone"
        @close="removeAddress(tag)"
      >
        {{ tag.city+'-'+tag.zone }}
      </el-tag>
    </el-form-item>
    <!--这里引用弹框子组件，默认隐藏 v-show 为 false -->
    <Address-Info-Add v-show="isPopup" ref="popupChild" @addAddressEvent="addAddress" @closeAddressEvent="closeAddressAddPage" />

    <!--主页面的操作按钮-->
    <el-form-item>
      <el-button type="primary" @click="onSubmit">保存</el-button>
      <el-button @click="onCancel">取消</el-button>
    </el-form-item>
  </el-form>
</template>

<script>
import AddressInfoAdd from './AddressInfoAdd.vue'
export default {
  name: 'UserInfoAdd',
  components: { AddressInfoAdd },
  data() {
    return {
      // 表单组件的校验规则
      rules: {
        userId: [
          { required: true, message: '请输入帐号', trigger: 'blur' },
          { min: 5, max: 10, message: '长度在到 10 个字符', trigger: 'blur' }
        ],
        userName: [
          { required: true, message: '请输入昵称', trigger: 'blur' },
          { min: 2, max: 10, message: '长度在 2 到 10 个字符', trigger: 'blur' }
        ],
        telephone: [
          { required: true, message: '请输入电话', trigger: 'blur', pattern: /^((\+?86)|(\(\+86\)))?(13[012356789][0-9]{8}|15[012356789][0-9]{8}|17[012356789][0-9]{8}|18[02356789][0-9]{8}|147[0-9]{8}|1349[0-9]{7})$/ },
          { min: 11, max: 11, message: '长度在 11 个字符', trigger: 'blur' }
        ]
      },
      // 弹框子组件的显隐控制属性
      isPopup: false,
      // 弹框组件的 model 参数
      formData: {
        userId: '',
        userName: '',
        telephone: '',
        addressInfos: [
          { city: '北京', zone: '朝阳区', postCode: '10000' },
          { city: '天津', zone: '滨海区', postCode: '10000' }
        ]
      }
    }
  },
  methods: {
    onSubmit() {
      // 提交按钮，需要再次校验表单输入
      let isOk = true
      this.$refs['form'].validateField('userId', userIdError => {
        if (userIdError !== '') { // 不满足条件，全局标识为 false
          isOk = false
        }
      })
      this.$refs['form'].validateField('userName', userNameError => {
        if (userNameError !== '') { // 不满足条件，全局标识为 false
          isOk = false
        }
      })
      this.$refs['form'].validateField('telephone', telephoneError => {
        if (telephoneError !== '') { // 不满足条件，全局标识为 false
          isOk = false
        }
      })

      // 校验成功
      if (isOk) {
        console.log('Data is ok,do submit')
      }
    },
    onCancel() {
      this.$refs['form'].resetFields()
    },
    popupAddressAddPage() {
      //  弹出子页面，设置显示标识
      this.isPopup = true
    },
    closeAddressAddPage() {
      //  关闭子页面，设置隐藏标识
      this.isPopup = false
    },
    // 校验添加的地址是否合法
    checkAddressInfo: function(addInfo) {
      for (let i = 0; i < this.formData.addressInfos.length; i++) {
        const temp = this.formData.addressInfos[i].city + this.formData.addressInfos[i].zone
        const cur = addInfo.city + addInfo.zone
        if (temp === cur) { // 存在，则不允许添加
          return false
        }
      }
      return true
    },
    addAddress() {
      //  获取弹框子组件的数据
      const addInfo = {
        city: this.$refs['popupChild'].formData.city,
        zone: this.$refs['popupChild'].formData.zone,
        postCode: this.$refs['popupChild'].formData.postCode
      }
      //  添加到当前组件的数据中
      this.formData.addressInfos.push(addInfo)
      //  清空弹框数据
      this.$refs['popupChild'].reset()
      if (this.checkAddressInfo(addInfo)) {
        this.formData.addressInfos.push(addInfo)
        //  关闭弹框组件
        this.isPopup = false
      }
    },
    removeAddress(tag) {
      //  删除一个地址标签
      this.formData.addressInfos.splice(this.formData.addressInfos.indexOf(tag), 1)
    }
  }
}
</script>

<style scoped>
.line{
  text-align: center;
}
.el-tag{
  margin-left: 10px;
  height: 30px;
}

.el-input {
  width: 300px;
}
</style>
