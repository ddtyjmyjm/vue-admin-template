<template>
  <div class="app-container">
    <!--添加开课button和dialog-->
    <el-button id="add_button" type="primary" style="margin-bottom: 20px">
      <router-link to="/course">
        添加开课课程
      </router-link>
    </el-button>

    <!--列表-->
    <div v-if="courseOfferings.length">
      <el-row :gutter="20">
        <div v-for="courseOffering in courseOfferings" :key="courseOffering.id">
          <el-col :xs="24" :sm="12" :md="8" :lg="8">
            <el-card class="box-card" shadow="hover">
              <div slot="header" class="clearfix">
                <span>{{ courseOffering.course.name }}</span>
                <span type="primary" style="float: right; padding: 3px 0">
                  <el-link type="primary">
                    <router-link
                      :to="{ name: 'courseOfferingDetail', params: { id: courseOffering.id}}"
                    >
                      详情
                    </router-link>
                  </el-link>
                </span>
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

  #add_button {
    padding: 10px
  }
  .image{
    max-width: 100%;
  }
  .box-card{
    margin-bottom: 20px;
  }

  .clearfix:before,
  .clearfix:after {
    display: table;
    content: "";
  }

  .clearfix:after {
    clear: both;
  }

</style>
