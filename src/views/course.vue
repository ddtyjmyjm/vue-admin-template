<template>
  <div id="app">
    <router-link to="/course/create"><el-button type="primary">添加课程</el-button></router-link>
    <el-input v-model="input" placeholder="搜索课程" class="input-with-select">
      <el-select slot="prepend" v-model="select" placeholder="请选择">
        <el-option label="id" value="id" />
        <el-option label="课程名" value="name" />
      </el-select>
      <el-button slot="append" icon="el-icon-search" @click="search" />
    </el-input>

    <el-table :data="courseList" style="width: 100%">
      <el-table-column prop="id" label="id" width="180" />
      <el-table-column prop="name" label="课程名" width="180" />
      <el-table-column prop="description" label="课程描述" />
      <el-table-column fixed="right" label="操作" width="100">
        <template slot-scope="scope">
          <el-button type="text" size="small">查看</el-button>
          <el-button type="text" size="small" @click="editCourse(scope.row)">编辑</el-button>
        </template>
      </el-table-column>
    </el-table>
  </div>
</template>

<script>
import { mapGetters } from 'vuex'

export default {
  name: 'Course',
  data: () => ({
    input: '',
    select: 'id'
  }),
  computed: {
    ...mapGetters(['courseList'])
  },
  mounted() {
    this.$store.dispatch('course/findAll')
  },
  methods: {
    search: function() {
      if (this.select === 'id') {
        this.$store.dispatch('course/findById', {
          id: this.input
        })
      } if (this.select === 'name') {
        this.$store.dispatch('course/findByName', {
          name: this.input
        })
      }
    }
  }
}
</script>

<style scoped>
 .input-with-select el-select {
  width: 150px;
}

.input-with-select .el-input-group__prepend {
  background-color: #fff;
}
</style>
