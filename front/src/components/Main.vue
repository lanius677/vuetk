<template>
  <div class="main">
    <el-form>
      <el-form-item>
        <el-input v-model.trim="inputValue" placeholder="请输入内容"></el-input>
        <el-button type="primary" @click="handleClick">查询</el-button>
      </el-form-item>
    </el-form>
    <Table :list="courseList" :editClick="editClick" :deleteHandle="deleteHandle">
    </Table>
    <Pagination :currentChange="currentChange"></Pagination>
  </div>
  <EditPop
    :popShow="popShow"
    v-if="popShow"
    :message="courseItemState.message"
    :confirmClick="confirmClick"
  ></EditPop>
</template>

<script setup>
import Table from "@/components/Table.vue";
import { reactive, ref, computed, onMounted } from "vue";
import EditPop from "@/components/EditPop.vue";
import Pagination from "@/components/Pagination.vue";
import { getCourse, changeCourse, deleteCourse } from "@/api/index.js";
import emitter from "@/utils/eventBus.js";

const data = reactive({
  list: [],
  page: 1, //默认展示页面数1
  total: 15, //默认课程总数
  sideCategory: "front", //默认课程分类
});

/**
 * 分页的逻辑
 */
const currentChange = (val) => {
  //当点击上一页
  if (val === "pre") {
    if (data.page > 1) {
      data.page--;
    } else {
      ElMessage({
        message: "已经是第一页了",
        type: "warning",
        showClose: true,
      });
    }
  }

  //当点击下一页
  if (val === "next") {
    if (data.page < Math.ceil(data.total / 5)) {
      data.page++;
    } else {
      ElMessage({
        message: "已经是最后一页了",
        type: "warning",
        showClose: true,
      });
    }
  }

  getCourseData({ category: data.sideCategory, page: data.page });
};

/**
 * 编辑相关的逻辑
 */
//编辑的数据
const courseItemState = reactive({
  message: {},
});

//控制编辑器弹窗的展示变量
const popShow = ref(false);
//控制编辑器弹窗的展示方法
const isShowPop = (show) => {
  popShow.value = show;
};

//编辑的按钮
const editClick = (val) => {
  isShowPop(true);
  courseItemState.message = val;
};

//取消和确认按钮的逻辑
const confirmClick = (val) => {
  if (val === "cancel") {
    isShowPop(false);
  } else if (
    //更改对应的课程的title和price
    val.title !== courseItemState.message.title ||
    val.price !== courseItemState.message.price
  ) {
    data.list.map((item) => {
      if (item.id === val.id) {
        item.title = val.title;
        item.price = val.price;
      }
    });
    //关闭弹窗
    isShowPop(false);

    //修改接口的调用
    changeCourseData({ title: val.title, price: val.price, id: val.id });
  } else {
    ElMessage({
      showClose: true,
      message: "没有发现更改的内容",
      type: "warning",
    });
  }
};

/**
 * 课程删除的逻辑
 */
const deleteHandle = (val) => {
  if (val) {
    data.list = data.list.filter((item) => {
      return item.id !== val;
    });
    console.log("val", val);
    //删除接口的调用
    deleteCourseData(val);
  }
};

/**
 * 搜索框的逻辑
 */
const inputValue = ref("");
const courseList = computed(() => {
  return data.list?.filter((item) => {
    return item.title.indexOf(inputValue.value) >= 0;
  });
});

//搜索的按钮
const handleClick = () => {
  if (inputValue.value) {
    ElMessage({
      message: "查询成功",
      type: "success",
    });
  } else {
    ElMessage({
      message: "请输入搜索内容",
      type: "error",
    });
  }
};

/**
 * 课程列表数据获取和课程类自动切换逻辑
 */
const getCourseData = async (query) => {
  //1. 先给接口查询参数赋值||赋默认值
  const category = query?.category || data.sideCategory;
  const page = query?.page || 1;
  const size = query?.size || 5;

  //2. 把参数传递给接口
  const res = await getCourse({
    category,
    page,
    size,
  });

  //筛选符合分类的课程
  //3. 把返回的数组结果进行filter过滤和category对比，然后将过滤结果返回给data.list
  data.list = res?.data.list.filter((item) => {
    return item.category === category;
  });

  //4. 将返回的总数赋值给data
  return (data.total = res?.data.total[0].total);
};

/**
 * 课程编辑的方法
 */
const changeCourseData = async (query) => {
  // 1.从参数中先解析赋值。
  const { title, price, id } = query;
  // 2.调用接口传入参数
  const res = await changeCourse({ title, price, id });
  // 3.判断返回值，是否成功
  if (res?.message) {
    ElMessage({
      message: res.message,
      type: "success",
    });
  }
};

/**
 * 课程列表删除的方法
 */
const deleteCourseData = async (query) => {
  console.log("query", query);
  // 1.从参数中先解析赋值。
  const id  = query;
  // 2.调用接口传入参数
  const res = await deleteCourse({ id });
  // 3.判断返回值，是否成功
  if (res?.message) {
    ElMessage({
      message: res.message,
      type: "success",
    });
  }

  //当前的页面list清空时，重置跳转到第一页
  if(data.list.length===0 && data.page>1){
    getCourseData({category:data.sideCategory,page:1})
  }
};

onMounted(() => {
  getCourseData();

  //监听课程类目tab切换
  emitter.on("course", (val) => {
    data.sideCategory = val;
    data.page = 1;
    getCourseData({ category: val, page: 1 });
  });
});
</script>

<style lang="less" scoped>
.el-form {
  display: flex;
}

.main {
  background-color: #fff;
  padding: 20px;
  flex: 1;
  display: flex;
  flex-direction: column;

  .input-with-select {
    width: 400px;
    margin-bottom: 40px;
  }
}

:deep(.el-table__header-wrapper) {
  position: fixed;
  z-index: 20;
}

:deep(.el-table__inner-wrapper) {
  overflow: hidden;
}

:deep(.el-table__body-wrapper) {
  margin-top: 40px;
}

:deep(.el-input__inner) {
  width: 300px;
  margin-right: 10px;
}

:deep(.warning-row) {
  --el-table-tr-bg-color: var(--el-color-warning-light-9) !important;
  height: 140px !important;
}

.table {
  height: 80vh;
  width: 85vw;
  overflow: hidden;
  overflow-y: scroll;
}

.table::-webkit-scrollbar {
  display: none;
}
</style>
