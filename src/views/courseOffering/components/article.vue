<template>
  <DIV class="forum">
    <h1>请问这门课什么时候考试</h1>
    <el-card class="box-card" shadow="hover">
      <div slot="header" class="clearfix">
        <span>小明</span>
        <span  style="float: right; padding: 3px 0" >2020-04-27 17:52:46</span>
      </div>
      <p>
        如题，请问这门课什么时候考试
      </p>
    </el-card>
    <el-divider />
    <el-card class="box-card" shadow="hover">
      <div slot="header" class="clearfix">
        <span>磊磊</span>
        <span  style="float: right; padding: 3px 0" >2020-04-27 17:53:53</span>
      </div>
      <p>
        大概两周以后吧
      </p>
    </el-card>
    <el-card class="box-card" shadow="hover">
      <div slot="header" class="clearfix">
        <el-tag>教师</el-tag>
        <span>孙老师</span>
        <span  style="float: right; padding: 3px 0" >2020-04-27 17:55:32</span>
      </div>
      <p>
        确认是两周后
      </p>
    </el-card>
    <el-divider />

    <div class="editor-container">
      <markdown-editor ref="markdownEditor" v-model="content4" language="zh_CN" height="300px" />
    </div>
    <el-button  type="primary" icon="el-icon-document" >
      发表
    </el-button>
  </DIV>

</template>

<script>
import MarkdownEditor from '@/components/MarkdownEditor'
export default {
  name: 'Article',
  components: { MarkdownEditor }
}
</script>

<style scoped>
.forum{
  width: 800px;
  margin: 30px;
}
  .box-card{
    margin: 30px;
  }

.editor-container{
  margin-bottom: 30px;
}
</style>
