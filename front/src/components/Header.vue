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
      <img :src="userInfo.headImg" />
    </div>
    <div
      class="userInfo"
      v-show="show"
      @mouseenter="isShowUserInfo('show')"
      @mouseleave="isShowUserInfo('leave')"
    >
      <div>{{ userInfo.name }}</div>
      <div @click="loginOut">退出登录</div>
    </div>
  </div>
</template>

<script setup>
import { onMounted, ref, defineProps, reactive } from "vue";
import { getUserInfo } from "@/api/index";
import router from "../router";
const show = ref(false);
/**
 * 获取父组件的参数
 */
const { isCollapse, handleCollapse } = defineProps(["isCollapse", "handleCollapse"]);

//鼠标移动个人信息的展示
const isShowUserInfo = (type) => {
  type == "show" ? (show.value = true) : (show.value = false);
};

/**
 * 获取用户信息
 */
const userInfo = reactive({
  name: "",
  headImg: "",
});

//用户信息的调用
const getUserInfoData = async () => {
  const res = await getUserInfo();
  if (res?.data.name && res?.data.headimg) {
    userInfo.name = res.data.name;
    userInfo.headImg = res.data.headimg;
  }
};

onMounted(() => {
  getUserInfoData();
});

/**
 * 退出登录按钮
 */
const loginOut=()=>{
  router.push('/login')
  localStorage.removeItem('token')
}
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
