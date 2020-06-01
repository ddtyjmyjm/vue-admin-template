<template>
  <div>

    <div class="filter-container">
      <el-input
        v-model="input"
        placeholder="搜索"
        style="width: 200px;"
        class="filter-item"
      />
      <el-button class="filter-item" type="primary" icon="el-icon-search">
        搜索
      </el-button>
      <el-button class="filter-item" type="primary" icon="el-icon-edit" @click="onAdd">
        添加
      </el-button>
    </div>

    <div v-if="students!==[]">
      <el-table :data="students" style="width: 100%">
        <el-table-column prop="student.id" align="center" label="id" width="50px" />
        <el-table-column prop="student.nickname" align="center" label="学生名" width="100px" />
        <el-table-column prop="process" align="center" label="学习进度">
          <template slot-scope="{row}">
            <el-progress :percentage="row.process" />
          </template>
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

    <el-dialog title="添加学生" :visible.sync="dialog.visible">
      <el-form :model="dialog.form">
        <el-form-item label="学号">
          <el-input v-model="dialog.form.student_id" />
        </el-form-item>
        <el-form-item>
          <el-button type="primary" @click="onDialogSubmit">立即创建</el-button>
          <el-button>取消</el-button>
        </el-form-item>
      </el-form>
    </el-dialog>

  </div>

</template>

<script>
import { getStudentsAndProcess, addStudents } from '@/api/courseOffering'

export default {
  name: 'Students',
  props: {
    coId: Number
  },
  data: function() {
    return {
      students: [],
      input: '',
      dialog: {
        visible: false,
        form: {
          student_id: null
        }
      }
    }
  },
  created() {
    this.getList()
  },
  methods: {
    getList() {
      getStudentsAndProcess(this.coId).then(
        response => {
          this.students = []
          const students = JSON.parse(response.data.result)
          for (const st of students) {

            this.students.push(
              {
                student: JSON.parse(st.student),
                process: JSON.parse(st.process)
              }
            )
          }
        }
      )
    },
    onAdd() {
      this.dialog.visible = true
    },
    onDialogSubmit() {
      addStudents({
        courseOfferingId: this.coId,
        studentId: parseInt(this.dialog.form.student_id)
      }).then(() => {
        this.dialog.visible = false
        this.$notify({
          title: '成功',
          message: '删除成功',
          type: 'success',
          duration: 2000
        })
        this.getList()
      })
    }
  }
}
</script>

<style scoped>

</style>
