<template>
  <div>
    <p>首页</p>
  </div>
  <el-button type="primary" @click="toGo('/login')">跳转去登录</el-button>
  <el-button type="primary" @click="toGo('/register')">跳转去注册</el-button>
</template>

<script setup lang="ts">
import router from "../router/index";
const toGo = (val: string) => {
  return router.push(val);
};
</script>

<style lang="scss" scoped></style>
