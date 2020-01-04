<template>
  <div class="popup-class">
    <div class="content-wrap">
      <div class="title-container">
        <h3 class="title">添加收获地址</h3>
      </div>
      <!--这里使用 el-form 组件，需要传递 model 数据给表单组件，所有的表单组件都引用该数据-->
      <el-form v-show="true" ref="form" :rules="rules" :model="formData" label-width="120px">
        <el-form-item label="城市" prop="city">
          <el-input v-model="formData.city" />
        </el-form-item>
        <el-form-item label="地区" prop="zone">
          <el-input v-model="formData.zone" />
        </el-form-item>
        <el-form-item label="邮编">
          <el-input v-model="formData.postCode" />
        </el-form-item>
        <!--弹框页面的操作按钮-->
        <el-form-item class="btn-center">
          <el-button type="primary" @click="onSubmit">保存</el-button>
          <el-button @click="onCancel">取消</el-button>
        </el-form-item>
      </el-form>
    </div>
  </div>
</template>

<script>
export default {
  name: 'AddressInfoAdd',
  data() {
    return {
      // 表单组件的校验规则
      rules: {
        city: [
          { required: true, message: '请输入城市', trigger: 'blur' },
          { min: 2, max: 50, message: '长度在到 2-50 个字符', trigger: 'blur' }
        ],
        zone: [
          { required: true, message: '请输入地区', trigger: 'blur' },
          { min: 2, max: 50, message: '长度在到 2-50 个字符', trigger: 'blur' }
        ]
      },
      // 表单组件 model 数据
      formData: {
        city: '',
        zone: '',
        postCode: ''
      }
    }
  },
  methods: {
    onSubmit() {
      let isOk = true
      // 校验城市表单是否有值
      this.$refs['form'].validateField('city', cityError => {
        if (cityError !== '') {
          isOk = false
        }
      })

      // 校验区域表单是否有值
      this.$refs['form'].validateField('zone', zoneError => {
        if (zoneError !== '') {
          isOk = false
        }
      })

      // 提交操作时，再次进行数据校验
      if (isOk) {
        // 如果 OK ，则收集数据，触发 ok 回调
        const okData = this.formData
        this.ok(okData)
      }
    },
    onCancel() {
      this.close()
    },
    reset() {
      // 重置数据
      this.formData.city = ''
      this.formData.zone = ''
      this.formData.postCode = ''
      // 清空表单的校验
      this.$refs['form'].resetFields()
    }
  }
}
</script>

<style scoped>
.line{
  text-align: center;
}
.el-form{
  margin-top: 20px;
  height: 250px;
}
.title{
  margin-left:10px;
}
.el-input {
  width: 300px;
}
.btn-center{
  margin-left:50px;
}
.popup-class {
  position: fixed;
  top: 10px;
  left: 0;
  right: 0;
  bottom: 0;
  background-color: rgba(0, 0, 0, 0.5);
  z-index: 998;
}

.content-wrap{
  position: absolute;
  top: 28%;
  left: 0;
  right: 0;
  width: 500px;
  margin: 0 auto;
  background-color: #fff;
  border-radius: 5px;
  z-index: 999;
  user-select: none;
}
</style>
