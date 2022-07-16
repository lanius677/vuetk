<template>
  <div class="common-layout">
    <el-container>
      <el-aside width="200px">
        <Aside :isCollapse="isCollapse"></Aside>
      </el-aside>
      <el-container>
        <el-header>
          <Header :handleCollapse="handleCollapse" :isCollapse="isCollapse"></Header>
        </el-header>
        <el-main>
          <Main></Main>
        </el-main>
      </el-container>
    </el-container>
  </div>
</template>

<script setup>
import Main from "@/components/Main.vue";
import Header from "@/components/Header.vue";
import Aside from "@/components/Aside.vue";
import { ref } from "vue";
const isCollapse = ref(false);
const handleCollapse = () => {
  isCollapse.value = !isCollapse.value;
};


</script>

<style lang="less" scoped>
.el-aside {
  width: auto;
  background-color: #545c64;
  overflow: hidden;
}

.el-container {
  height: 100vh;
}

.el-main {
  display: flex;
}

.el-header {
  background-color: #fff;
}
</style>
