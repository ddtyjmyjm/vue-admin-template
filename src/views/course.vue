<template>
  <div class="app-container">

    <div class="filter-container">

      <el-select v-model="select" placeholder="请选择" class="filter-item" style="width: 100px">
        <el-option label="id" value="id" />
        <el-option label="课程名" value="name" />
      </el-select>

      <el-input
        v-model="input"
        placeholder="搜索课程"
        style="width: 200px;"
        class="filter-item"
        @keyup.enter.native="handleFilter"
      />
      <el-button class="filter-item" type="primary" icon="el-icon-search" @click="handleFilter">
        搜索
      </el-button>
      <el-button class="filter-item" type="primary" icon="el-icon-edit" @click="handleCreate">
        添加课程
      </el-button>
    </div>

    <el-table :data="courseList" style="width: 100%">
      <el-table-column prop="id" align="center" label="id" width="50px" />
      <el-table-column prop="name" align="center" label="课程名" width="100px" />
      <el-table-column prop="description" label="课程描述" />
      <el-table-column label="操作" width="300px">
        <template slot-scope="{row}">
          <el-button type="primary" size="mini" @click="handleUpdate(row)">
            编辑
          </el-button>
          <el-button size="mini" type="danger" @click="handleDelete(row)">
            删除
          </el-button>
          <el-button type="primary" size="mini" @click="handleOffer(row)">
            开课
          </el-button>
        </template>
      </el-table-column>
    </el-table>

    <el-dialog :title="dialog.textMap[dialog.dialogStatus]" :visible.sync="dialog.formVisible">
      <el-form ref="dataForm" :model="dialog.tempCourse" :rules="dialog.rules" label-position="left" label-width="80px">
        <el-form-item label="课程名称" prop="name">
          <el-input
            v-model="dialog.tempCourse.name"
            placeholder="请输入内容"
            maxlength="20"
            show-word-limit
          />
        </el-form-item>
        <el-form-item label="课程描述">
          <el-input
            v-model="dialog.tempCourse.description"
            type="textarea"
            :autosize="{ minRows: 2, maxRows: 4}"
            placeholder="请输入内容"
          />
        </el-form-item>
        <el-form-item label="课程图片">
          <el-input
            v-model="dialog.tempCourse.course_img_url"
            placeholder="请输入内容"
          />
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="dialog.formVisible = false">
          取消
        </el-button>
        <el-button type="primary" @click="dialog.dialogStatus==='create'?createData():updateData()">
          确认
        </el-button>
      </div>
    </el-dialog>

    <el-dialog :title="'开课:'+offer.course_name" :visible.sync="offer.formVisible" width="30%">
      <el-input-number v-model="offer.num" size="mini" />
      <div slot="footer" class="dialog-footer">
        <el-button @click="cancelOffer">
          取消
        </el-button>
        <el-button type="primary" @click="createOffer">
          确认
        </el-button>
      </div>
    </el-dialog>

  </div>
</template>

<script>
import { findAll, findByName, findById, createCourse, updateCourse, deleteCourseList } from '@/api/course'
import { offerCourse } from '@/api/courseOffering'

export default {
  name: 'Course',
  data: () => ({
    input: '',
    select: 'id',
    courseList: [{
      id: null,
      name: '',
      description: '',
      course_img_url: ''
    }],
    statusOptions: ['published', 'draft', 'deleted'],
    dialog: {
      formVisible: false,
      dialogStatus: '',
      textMap: {
        update: '编辑',
        create: '创建'
      },
      tempCourse: {
        id: null,
        name: '',
        description: '',
        course_img_url: ''
      },
      rules: {
        name: [{ required: true, message: '需要有名字', trigger: 'blur' }]
      }
    },
    offer: {
      formVisible: false,
      course_id: null,
      course_name: null,
      teacher_id: null,
      num: 1
    }

  }),
  created() {
    this.getList()
  },
  methods: {
    getList: function() {
      findAll().then(response => {
        this.courseList = JSON.parse(response.data.courseList)
      })
    },
    resetList: function() {
      this.courseList = [{
        id: null,
        name: '',
        description: '',
        course_img_url: ''
      }]
    },
    handleFilter: function() {
      if (this.input === '') {
        this.resetList()
        this.getList()
      } else {
        if (this.select === 'id') {
          findById(this.input).then(response => {
            this.resetList()
            this.courseList = [JSON.parse(response.data.courseList)]
          })
        }
        if (this.select === 'name') {
          findByName(this.input).then(response => {
            this.resetList()
            this.courseList = JSON.parse(response.data.courseList)
          })
        }
      }
    },
    resetTemp() {
      this.dialog.tempCourse = {
        id: null,
        name: '',
        description: '',
        course_img_url: ''
      }
    },
    handleCreate() {
      this.resetTemp()
      this.dialog.dialogStatus = 'create'
      this.dialog.formVisible = true
      this.$nextTick(() => {
        this.$refs['dataForm'].clearValidate()
      })
    },
    createData() {
      this.$refs['dataForm'].validate((valid) => {
        if (valid) {
          createCourse(this.dialog.tempCourse).then(() => {
            this.getList()
            this.dialog.formVisible = false
            this.$notify({
              title: '成功',
              message: '创建成功',
              type: 'success',
              duration: 2000
            })
          })
        }
      })
    },
    handleUpdate(row) {
      this.dialog.tempCourse = Object.assign({}, row)
      this.dialog.dialogStatus = 'update'
      this.dialog.formVisible = true
      this.$nextTick(() => {
        this.$refs['dataForm'].clearValidate()
      })
    },
    updateData() {
      this.$refs['dataForm'].validate((valid) => {
        if (valid) {
          updateCourse(this.dialog.tempCourse).then(() => {
            this.getList()
            this.dialog.formVisible = false
            this.$notify({
              title: '成功',
              message: '修改成功',
              type: 'success',
              duration: 2000
            })
          })
        }
      })
    },
    handleDelete(row) {
      deleteCourseList([row.id])
      this.getList()
      this.$notify({
        title: '成功',
        message: '删除成功',
        type: 'success',
        duration: 2000
      })
    },
    handleOffer(row) {
      this.offer.course_id = row.id
      this.offer.course_name = row.name
      this.offer.teacher_id = this.$store.getters.token
      this.offer.formVisible = true
    },
    createOffer() {
      offerCourse({
        course_id: this.offer.course_id,
        teacher_id: parseInt(this.offer.teacher_id),
        num: this.offer.num
      }).then(() => {
        this.$notify({
          title: '成功',
          message: '删除成功',
          type: 'success',
          duration: 2000
        })
        this.cancelOffer()
      }
      )
    },
    cancelOffer() {
      this.offer.formVisible = false
      this.offer.course_name = null
      this.offer.course_id = null
      this.offer.teacher_id = null
      this.offer.num = 1
    }
  }
}
</script>
