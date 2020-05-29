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
      <el-button class="filter-item" type="primary" icon="el-icon-edit">
        添加
      </el-button>
    </div>

    <div v-if="resources!==[]">
      <el-table :data="resources" style="width: 100%">
        <el-table-column prop="chapter" align="center" label="章节" />
        <el-table-column prop="resourceName" align="center" label="测试题描述" width="100px" />
        <el-table-column label="操作" width="200px">
          <template>
            <el-button type="primary" size="mini">
              详情
            </el-button>
          </template>
        </el-table-column>
      </el-table>
    </div>
  </div>

</template>

<script>
import { getResources } from '@/api/courseOffering'
export default {
  name: 'Tests',
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
