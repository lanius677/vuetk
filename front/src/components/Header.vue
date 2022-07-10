<template>
  <div class="header">
    <div class="homeIcon">
      <el-icon
        size="30px"
        @click="handleCollapse"
        :style="{ transform: isCollapse ? '' : 'rotate(180deg)' }"
        ><Expand
      /></el-icon>
    </div>
    <div
      class="user"
      @mouseenter="isShowUserInfo('show')"
      @mouseleave="isShowUserInfo('leave')"
    >
      <img
        src="https://xd-video-pc-img.oss-cn-beijing.aliyuncs.com/xdclass_pro/default/head_img/18.jpeg"
      />
    </div>
    <div
      class="userInfo"
      v-show="show"
      @mouseenter="isShowUserInfo('show')"
      @mouseleave="isShowUserInfo('leave')"
    >
      <div>test</div>
      <div>退出登录</div>
    </div>
  </div>
</template>

<script setup>
import { ref } from "vue";
import { defineProps } from "vue";
const show = ref(false);
/**
 * 获取父组件的参数
 */
const { isCollapse, handleCollapse } = defineProps(["isCollapse", "handleCollapse"]);

//鼠标移动个人信息的展示
const isShowUserInfo = (type) => {
  type == "show" ? (show.value = true) : (show.value = false);
};
</script>

<style lang="less" scoped>
.userInfo {
  z-index: 22;
  display: flex;
  flex-direction: column;
  position: absolute;
  right: 0;
  bottom: -70px;
  background-color: #fff;
  border: 5px;
  box-shadow: 0 4px 8px 0 rgb(7 17 27 / 10%);
  text-align: center;

  div:hover {
    color: #409eff;
  }

  div {
    padding: 10px;
  }
}

.header {
  position: relative;
  height: 100%;
  align-items: center;
  display: flex;
  justify-content: space-between;

  .homeIcon {
    display: flex;
    align-items: center;

    span {
      margin-left: 10px;
    }
  }

  .user {
    display: flex;
    justify-content: center;
    width: 80px;

    img {
      width: 45px;
      height: 45px;
      border-radius: 50%;
    }
  }
}
</style>
