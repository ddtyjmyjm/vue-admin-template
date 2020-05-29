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

    <el-table :data="article" style="width: 100%">
      <el-table-column prop="id" align="center" label="id" width="50px" />
      <el-table-column prop="nickname" align="center" label="发帖者" width="100px" />
      <el-table-column prop="tittle" label="标题" />
      <el-table-column label="操作" width="200px">
        <template>
          <el-button type="primary" size="mini">
            <router-link to="/courseOffering/article/1">
              详情
            </router-link>
          </el-button>
        </template>
      </el-table-column>
    </el-table>
  </div>
</template>

<script>
import article from '@/views/courseOffering/components/article'
export default {
  name: 'Forum',
  data: () => {
    return {
      article: [
        {
          id: 1,
          nickname: '小明',
          tittle: '我有一个问题'
        },
        {
          id: 2,
          nickname: '磊磊',
          tittle: '请问考试是什么时候'
        }
      ]
    }
  }
}
</script>

<style scoped>

</style>
