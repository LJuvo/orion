<template>
  <flex-layout col>
    <h1 class="info-title">LOTTIE TOOLS</h1>
    <div class="info-content">转换lottie为png序列或svg动画</div>
    <div class="info-content">下载图片资产或拷贝imageKey</div>
  </flex-layout>
</template>

<script>
import FlexLayout from "../../components/layout/flex";
export default {
  components: {
    "flex-layout": FlexLayout,
  },
};
</script>

<style>
.info-title {
  font-size: 36px;
  margin-bottom: 30px;
}
.info-content {
  font-size: 16px;
  margin-bottom: 10px;
}
</style>
