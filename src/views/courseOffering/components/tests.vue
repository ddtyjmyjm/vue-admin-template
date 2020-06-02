<template>
  <div class="app-container">

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
      <el-button class="filter-item" type="primary" icon="el-icon-edit" @click="handleAdd">
        添加
      </el-button>
    </div>

    <el-table :data="tests" style="width: 100%">
      <el-table-column prop="chapter" align="center" label="章节" />
      <el-table-column prop="question_description" align="center" label="测试题描述" width="100px" />
      <el-table-column label="操作" width="200px" align="center">
        <template slot-scope="{$index,row}">
          <el-button type="primary" size="mini" @click="handleEdit(row)">
            编辑
          </el-button>
          <el-button size="mini" type="danger" @click="handleDelete($index)">
            删除
          </el-button>
        </template>
      </el-table-column>
    </el-table>

    <el-dialog :title="dialog_title[dialog_select]" :visible.sync="dialog.visible">
      <el-form :model="dialog.form" label-position="left" label-width="80px">
        <el-form-item label="问题描述">
          <el-input
            v-model="dialog.form.question_description"
            type="textarea"
            :rows="2"
          />
        </el-form-item>
        <el-form-item label="A">
          <el-input v-model="dialog.form.answerA" />
        </el-form-item>
        <el-form-item label="B">
          <el-input v-model="dialog.form.answerB" />
        </el-form-item>
        <el-form-item label="C">
          <el-input v-model="dialog.form.answerC" />
        </el-form-item>
        <el-form-item label="D">
          <el-input v-model="dialog.form.answerD" />
        </el-form-item>
        <el-form-item label="答案">
          <el-input v-model="dialog.form.answer" />
        </el-form-item>
        <el-form-item label="分析">
          <el-input
            v-model="dialog.form.question_analysis"
            type="textarea"
            :rows="2"
          />
        </el-form-item>
        <el-form-item label="章节">
          <el-input v-model="dialog.form.chapter" />
        </el-form-item>

        <el-button type="primary" @click="onDialogSubmit">确定</el-button>
        <el-button>取消</el-button>

      </el-form>
    </el-dialog>
  </div>
</template>

<script>
import { getTests } from '@/api/courseOffering'

export default {
  name: 'Tests',
  props: {
    coId: Number
  },
  data: function() {
    return {
      tests: [],
      input: '',
      dialog_title: ['添加', '查看'],
      dialog_select: 0,
      dialog: {
        visible: false,
        form: {
          question_description: '',
          answerA: '',
          answerB: '',
          answerC: '',
          answerD: '',
          answer: '',
          question_analysis: '',
          chapter: ''
        }
      }

    }
  },
  created() {
    this.getList()
  },
  methods: {
    getList() {
      getTests(this.coId).then(
        response => {
          this.tests = JSON.parse(response.data.result)
        }
      )
    },
    handleAdd() {
      this.dialog_select = 0
      this.dialog.visible = true
    },
    onDialogSubmit() {
      this.dialog.visible = false
      this.tests.push(this.dialog.form)
      this.dialog.form = {
        question_description: '',
        answerA: '',
        answerB: '',
        answerC: '',
        answerD: '',
        answer: '',
        question_analysis: '',
        chapter: ''
      }
    },
    handleEdit(row) {
      this.dialog_select = 1
      this.dialog.form = row
      this.dialog.visible = true
    },
    handleDelete(index) {
      this.$notify({
        title: 'Success',
        message: 'Delete Successfully',
        type: 'success',
        duration: 2000
      })
      this.tests.splice(index, 1)
    }
  }

}

</script>

<style scoped>

</style>
