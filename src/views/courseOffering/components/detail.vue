<template>
  <div v-if="co!==null">

    <el-card class="box-card" shadow="hover">
      <div slot="header" class="clearfix">
        <span>{{ co.course.name }}</span>
      </div>
      <p>{{ co.course.description }}</p>
    </el-card>

    <el-row :gutter="32">

      <el-col :xs="24" :sm="24" :lg="12">
        <el-divider content-position="left">公告</el-divider>
        <el-card class="box-card" shadow="hover">
          <div slot="header" class="clearfix">
            <span>考试前咨询</span>
          </div>
          <p>考试前咨询，12月4日星期三上午10:30至11:15在K17楼403室。</p>
        </el-card>
        <el-card class="box-card" shadow="hover">
          <div slot="header" class="clearfix">
            <span>考试安排</span>
          </div>
          <p>
            期末考试的席位分配现在可用：期末考试座位安排。 请检查一下，以便知道您要去哪里以及什么时候应该在那里。 您将在当天需要此信息，因此您不妨将该页面添加为书签。
          </p>
        </el-card>
      </el-col>

      <el-col :xs="24" :sm="24" :lg="12">
        <el-divider content-position="left">计划</el-divider>
        <el-card class="box-card" shadow="hover">
          <div slot="header" class="clearfix">
            <span>暂时没有计划</span>
          </div>
        </el-card>
      </el-col>
    </el-row>
  </div>
</template>

<script>
export default {
  name: 'Detail',
  props: ['co']
}
</script>
<style>
  .box-card{
    margin: 15px;
  }

</style>

