<template>
  <div v-if="resources!==[]">
    <el-table :data="resources" style="width: 100%">
      <el-table-column prop="chapter" align="center" label="章节" />
      <el-table-column prop="resourceName" align="center" label="文件名" width="100px" />
      <el-table-column prop="resourceType" align="center" label="文件类型" />
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
import { getResources } from '@/api/courseOffering'
export default {
  name: 'Resources',
  props: {
    coId: Number
  },
  data: function() {
    return {
      resources: []
    }
  },
  created() {
    getResources(this.coId).then(
      response => {
        this.resources = JSON.parse(response.data.resources)
      }
    )
  }
}
</script>

<style scoped>

</style>
