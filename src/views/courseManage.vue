<template>
  <div id="app-container">
    <el-form ref="form" label-width="80px">
      <el-form-item label="课程名称">
        <el-input
          v-model="$store.state.course.courseCreated.name"
          placeholder="请输入内容"
          maxlength="20"
          show-word-limit
        />
      </el-form-item>
      <el-form-item label="课程描述">
        <el-input
          v-model="$store.state.course.courseCreated.description"
          type="textarea"
          :autosize="{ minRows: 2, maxRows: 4}"
          placeholder="请输入内容"
        />
      </el-form-item>
      <el-form-item label="课程图片">
        <el-input
          v-model="$store.state.course.courseCreated.course_img_url"
          placeholder="请输入内容"
        />
      </el-form-item>
      <el-form-item>
        <el-button type="primary" @click="onSubmit">立即创建</el-button>
        <el-button>取消</el-button>
      </el-form-item>
    </el-form>
    result
    {{ result }}
  </div>
</template>

<script>
import { createCourse } from '@/api/course'

export default {
  name: 'CourseManage',
  data: function() {
    return {
      result: ''
    }
  },
  methods: {
    onSubmit: function() {
      createCourse(this.$store.state.course.courseCreated)
        .then(response => {
          if (response.data.code) {
            this.$message({
              message: response.data.msg,
              type: 'success',
              duration: 1000
            })
          } else {
            this.$message.error({
              message: response.data.msg,
              duration: 1000
            })
          }
        })
    }
  }
}
</script>

<style scoped>

</style>
