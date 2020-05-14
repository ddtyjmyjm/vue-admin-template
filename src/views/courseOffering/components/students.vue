<template>
  <div v-if="students!==[]">
    <el-table :data="students" style="width: 100%">
      <el-table-column prop="id" align="center" label="id" width="50px" />
      <el-table-column prop="nickname" align="center" label="学生名" width="100px" />
      <el-table-column prop="nickname" align="center" label="学习进度">
        <el-progress :percentage="100" status="success" />
      </el-table-column>
      <el-table-column label="操作" width="200px">
        <template>
          <el-button type="primary" size="mini">
            详情
          </el-button>
        </template>
      </el-table-column>
    </el-table>

  </div>

</template>

<script>
import { getStudents } from '@/api/courseOffering'

export default {
  name: 'Students',
  props: {
    coId: Number
  },
  data: function() {
    return {
      students: []
    }
  },
  created() {
    getStudents(this.coId).then(
      response => {
        this.students = JSON.parse(response.data.students)
      }
    )
  }
}
</script>

<style scoped>

</style>
