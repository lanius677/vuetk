<template>
  <div class="common-layout">
    <el-container>
      <el-aside width="200px"><Aside></Aside></el-aside>
      <el-container>
        <el-header><Header></Header></el-header>
        <el-main><Main></Main></el-main>
      </el-container>
    </el-container>
  </div>
</template>

<script setup>
import Main from "@/components/Main.vue";
import Header from "@/components/Header.vue";
import Aside from "@/components/Aside.vue";
</script>

<style lang="less" scoped>
.el-aside {
  width: auto;
}
</style>
