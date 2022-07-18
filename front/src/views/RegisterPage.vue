<template>
  <div class="register">
    <div class="bgp" />
    <div class="register-container">
      <h1>vuetk课程管理系统</h1>
      <el-form
        class="register-form"
        :model="userInfo"
        :rules="rules"
        @keyup.enter="onRegister"
        ref="ref_form"
      >
        <!-- 用户名区域 -->
        <el-form-item prop="userName">
          <el-input placeholder="请输入用户名" v-model.trim="userInfo.userName">
            <template #prepend>
              <el-icon>
                <avatar />
              </el-icon>
            </template>
          </el-input>
        </el-form-item>

        <!-- 密码区域 -->
        <el-form-item prop="passWord">
          <el-input
            type="password"
            placeholder="请输入密码"
            show-password
            v-model="userInfo.passWord"
          >
            <template #prepend>
              <el-icon>
                <key />
              </el-icon>
            </template>
          </el-input>
        </el-form-item>

        <!-- button区域 -->
        <el-button type="primary" class="register-submit" @click="onRegister"
          >注册</el-button
        >
        <div class="register-register" @click="toGo">已有账号去登录</div>
      </el-form>
    </div>
  </div>
</template>

<script setup>
import { reactive, ref } from "vue";
import router from "../router/index";
import { getRegister } from "../api/index";
/**
 * 初始ref
 */
const ref_form = ref(null);

/**
 * 表单的数据声明
 */
const userInfo = reactive({
  userName: "",
  passWord: "",
});

/**
 * 表单数据校验规则
 */
const rules = {
  userName: [{ required: "true", trigger: "blur", message: "用户名不能为空" }],
  passWord: [{ required: "true", trigger: "blur", message: "密码不能为空" }],
};

/**
 * 注册的方法
 */
const onRegister = () => {
  ref_form.value.validate((val) => {
    if (val) {
      getRegisterData();
    }
  });
};

/**
 * 跳转到登录页面
 */
const toGo = () => {
  router.push("/login");
};

/**
 * 注册的接口
 */
const getRegisterData = async () => {
  //接口的调用
  const res = await getRegister({
    userName: userInfo.userName,
    passWord: userInfo.passWord,
  });

  //如果注册成功
  if (res?.message) {
    localStorage.setItem("token", 1);
    ElMessage({
      message: "注册成功",
      type: "success",
    });
    router.push("/");
  }
};
</script>

<style lang="less" scoped>
@-webkit-keyframes fadenum {
  0% {
    opacity: 0;
  }

  100% {
    opacity: 1;
  }
}

.register {
  height: 100%;
  .bgp {
    height: 100%;
    background-image: url("../assets/bj.png");
    background-repeat: no-repeat;
    background-size: 100% 100%;
    background-position: 50% 50%;
  }

  .el-icon {
    height: 30px !important;
  }

  .register-container {
    animation: fadenum 1s ease;
    position: absolute;
    z-index: 1;
    width: 400px;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    transition: all 1s;
    min-height: 273px;
    text-align: center;
    background-color: #fff;
    border-radius: 10px;
    padding: 20px;

    h1 {
      font-size: 24px;
      transition: all 1s;
      font-weight: bold;
      margin-bottom: 36px;
    }

    .el-card {
      border-radius: 20px;
    }

    .register-form {
      .register-submit {
        width: 100%;
        height: 50px;
        border-radius: 20px;
        margin-bottom: 10px;
      }

      .register-register {
        width: 6.25rem;
        font-size: 0.875rem;
        margin: 0 auto;
      }

      :deep(.el-input-group__prepend) {
        padding: 0 10px;
      }
    }
  }
}
</style>
