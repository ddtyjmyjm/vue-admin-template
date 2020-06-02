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
      <el-button class="filter-item" type="primary" icon="el-icon-edit" @click="dialog.visible=true">
        添加
      </el-button>
    </div>

    <div v-if="resources!==[]">
      <el-table :data="resources" style="width: 100%">
        <el-table-column prop="chapter" align="center" label="章节" />
        <el-table-column prop="resourceName" align="center" label="文件名" width="100px" />
        <el-table-column prop="resourceType" align="center" label="文件类型" />
        <el-table-column prop="url" label="资源地址" />
        <el-table-column label="操作" width="200px">
          <template slot-scope="{$index}">
            <el-button type="primary" size="mini">
              详情
            </el-button>
            <el-button size="mini" type="danger" @click="handleDelete($index)">
              删除
            </el-button>
          </template>
        </el-table-column>
      </el-table>
    </div>

    <el-dialog title="添加资源" :visible.sync="dialog.visible">
      <el-form :model="dialog.form" label-position="left" label-width="80px">
        <el-form-item label="章节">
          <el-input v-model="dialog.chaptor" />
        </el-form-item>
        <el-form-item label="类型">
          <el-input v-model="dialog.type" label="类型" />
        </el-form-item>
        <el-form-item label="类型">
          <el-input v-model="dialog.name" label="命名" />
        </el-form-item>
        <el-form-item label="文件">
          <el-upload
            ref="upload"
            class="upload-demo"
            action="https://jsonplaceholder.typicode.com/posts/"
            :on-change="onUploadChange"
            :on-preview="handlePreview"
            :on-remove="handleRemove"
            :before-remove="beforeRemove"
            :file-list="dialog.fileList"
            :auto-upload="false"
          >
            <el-button size="small" type="primary">点击上传</el-button>
            <div slot="tip" class="el-upload__tip">只能上传jpg/png文件，且不超过500kb</div>
          </el-upload>
        </el-form-item>
        <el-button type="primary" @click="onDialogSubmit">确定</el-button>
        <el-button>取消</el-button>

      </el-form>
    </el-dialog>

  </div>

</template>

<script>
import { getResources } from '@/api/courseOffering'

export default {
  name: 'Resources',
  props: {
    coId: Number
  },
  data: function() {
    return {
      resources: [],
      input: '',

      dialog: {
        visible: false,
        chaptor: '',
        type: '',
        name: '',
        fileList: [],
        temp: null
      }
    }
  },
  created() {
    this.getList()
  },
  methods: {
    getList() {
      getResources(this.coId).then(
        response => {
          this.resources = JSON.parse(response.data.resources)
        }
      )
    },
    handleRemove(file, fileList) {
      console.log(file, fileList)
    },
    handlePreview(file) {
      console.log(file)
    },
    handleExceed(files, fileList) {
      this.$message.warning(`当前限制选择 3 个文件，本次选择了 ${files.length} 个文件，共选择了 ${files.length + fileList.length} 个文件`)
    },
    beforeRemove(file, fileList) {
      return this.$confirm(`确定移除 ${file.name}？`)
    },
    onUploadChange(file) {
      this.dialog.temp = file
    },

    onDialogSubmit() {
      // console.log(this.dialog.fileList
      this.dialog.fileList = []
      const resource = {
        chapter: this.dialog.chaptor,
        resourceName: this.dialog.name,
        url: this.dialog.temp.name,
        resourceType: this.dialog.type
      }
      this.resources.push(resource)
      this.dialog.visible = false
    },
    handleDelete(index) {
      this.$notify({
        title: 'Success',
        message: 'Delete Successfully',
        type: 'success',
        duration: 2000
      })
      this.resources.splice(index, 1)
    }
  }

}
</script>

<style scoped>

</style>
