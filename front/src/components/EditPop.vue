<template>
  <el-dialog title="编辑" v-model="popShow" center :show-close="false">
    <el-form :model="editData" ref="ruleFromRef">
      <el-form-item label="课程标题" prop="title" required>
        <el-input v-model="editData.title"></el-input>
      </el-form-item>

      <el-form-item label="课程价格" prop="price" required>
        <el-input v-model="editData.price"></el-input>
      </el-form-item>

      <el-form-item>
        <el-button type="default" @click="confirmClick('cancel')">取消</el-button>
        <el-button type="primary" @click="submitForm(ruleFromRef)">确定</el-button>
      </el-form-item>
    </el-form>
  </el-dialog>
</template>

<script setup>
import { defineProps, ref, reactive } from "vue";
const { popShow, message, confirmClick } = defineProps([
  "popShow",
  "message",
  "confirmClick",
]);

/**
 * 编辑组件维护的数据
 */
const editData = reactive({
  id: message.id,
  title: message.title,
  price: message.price,
});

/**
 * 表单校验
 */
const ruleFromRef = ref();
const submitForm = async (formEl) => {
  if (!formEl) return;
  await formEl.validate((vaild, fields) => {
    if (vaild) {
      confirmClick({
        id: editData.id,
        title: editData.title,
        price: editData.price,
      });
    }else{
      console.log('error submit',fields);
    }
  });
};
</script>

<style lang="scss" scoped></style>
