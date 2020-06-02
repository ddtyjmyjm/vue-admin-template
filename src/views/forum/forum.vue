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
      <el-button class="filter-item" type="primary" icon="el-icon-edit">
        添加
      </el-button>
    </div>

    <el-table :data="articles" style="width: 100%">
      <el-table-column prop="id" align="center" label="id" width="50px" />
      <el-table-column prop="title" label="标题" />
      <el-table-column prop="create_time" label="创建时间" />
      <el-table-column label="操作" width="200px">
        <template slot-scope="{row}">
          <el-button type="primary" size="mini">
            <router-link :to="{ name: 'article', params: { id: row.id}}">
              详情
            </router-link>
          </el-button>
        </template>
      </el-table-column>
    </el-table>
  </div>
</template>

<script>
import { findAll } from '@/api/forum'
export default {
  name: 'Forum',
  data: () => {
    return {
      input: '',
      articles: [
        {
          id: null,
          title: ''
        }
      ]
    }
  },
  created() {
    this.getList()
  },
  methods: {
    getList() {
      findAll().then(response => {
        console.log(response.data)
        this.articles = JSON.parse(response.data.articleList)
      })
    }
  }
}
</script>

<style scoped>

</style>
