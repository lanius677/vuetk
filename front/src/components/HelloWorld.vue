<template>
  <div>
    <p>tk课程</p>
    <el-button type="primary">Primary</el-button>
    <el-icon><Check /></el-icon>
  </div>
</template>

<script>
export default {
  name: "HelloWorld",
  props: {
    msg: String,
  },
};
</script>

<style scoped lang="less">
p {
  color: skyblue;
}
</style>
