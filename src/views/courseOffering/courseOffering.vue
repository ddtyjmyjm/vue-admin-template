<template>
  <div class="app-container">
    <el-button type="primary">添加开课课程</el-button>
    <div v-if="courseOfferings.length">
      <el-row :gutter="20">

        <div v-for="courseOffering in courseOfferings" :key="courseOffering.id">

          <el-col :span="8">

            <el-card class="box-card" shadow="hover">
              <div slot="header" class="clearfix">
                <span>{{ courseOffering.course.name }}</span>
                <router-link :to="{ name: 'courseOfferingDetail', params: { id: courseOffering.course.id}}">
                  详情
                </router-link>
              </div>
              <img :src="courseOffering.course.course_img_url" class="image">

              <div style="padding: 14px;">描述: {{ courseOffering.course.description }}</div>
            </el-card>

          </el-col>
        </div>
      </el-row>
    </div>
  </div>
</template>

<script>
import { getList } from '@/api/courseOffering'

export default {
  name: 'CourseOffering',
  data: () => ({
    message: 'dashboard',
    courseOfferings: []
  }),
  mounted() {
    getList(this.$store.getters.token).then(
      response => {
        this.courseOfferings = JSON.parse(response.data.courseOfferingList)
      }
    )
  }
}
</script>

<style scoped>
  #app {
    padding: 20px;
  }

  .text {
    font-size: 14px;
  }

  .item {
    margin-bottom: 18px;
  }

  .clearfix:before,
  .clearfix:after {
    display: table;
    content: "";
  }

  .clearfix:after {
    clear: both;
  }

  .box-card {
    width: 480px;
  }
</style>
