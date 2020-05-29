<template>
  <div class="app-container">
    <el-link type="primary">
      <router-link :to="{name:'courseOffering'}">返回列表</router-link>
    </el-link>

    <el-tabs :value="chosenTab">
      <el-tab-pane label="开课详情" name="detail">
        <div v-if="!loading"> <showDetail :co="courseOffering" /></div>

      </el-tab-pane>
      <el-tab-pane label="学生管理" name="second">
        <div v-if="!loading"><students :co-id="courseOffering.id" /></div>
      </el-tab-pane>
      <el-tab-pane label="资源管理" name="third">
        <div v-if="!loading"> <resources :co-id="courseOffering.id" /></div>
      </el-tab-pane>
      <el-tab-pane label="试题管理" name="fourth">
        <div v-if="!loading"> <tests :co-id="courseOffering.id" /></div>
      </el-tab-pane>
      <el-tab-pane label="讨论区" name="fifth">
        <div v-if="!loading"><forum /></div>
      </el-tab-pane>
    </el-tabs>
  </div>
</template>

<script>
import { getDetail } from '@/api/courseOffering'
import showDetail from '@/views/courseOffering/components/detail'
import resources from '@/views/courseOffering/components/resources'
import students from '@/views/courseOffering/components/students'
import forum from '@/views/courseOffering/components/forum'
import tests from '@/views/courseOffering/components/tests'

export default {
  name: 'CourseOfferingDetail',
  components: {
    showDetail: showDetail,
    resources: resources,
    students: students,
    forum: forum,
    tests: tests
  },
  data: function() {
    return {
      loading: true,
      chosenTab: 'detail',
      courseOffering: {
        course: [],
        id: null,
        teacher: null
      }
    }
  },
  created() {
    getDetail(this.$route.params.id).then(response => {
      this.courseOffering = JSON.parse(response.data.courseOffering)
      this.loading = false
    })
  }
}
</script>

<style scoped/>

