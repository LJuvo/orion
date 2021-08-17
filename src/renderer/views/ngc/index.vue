<template>
  <flex-layout class="flex-full">
    <section class="flex-h-full flex-menu flex justify-center items-center">
      <div>NGC 2024</div>
    </section>
    <section class="flex-h-full flex-1 flex-flow flex-flow-y">
      <div class="ngc-pane"></div>

      <div>PNG Tools</div>
    </section>
    <flex-layout class="flex-h-full flex-menu flex-flow-y" col>
      <div>svga tools one</div>
      <div>svga tools two</div>
    </flex-layout>
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
.ngc-pane {
  width: 480px;
  height: 320px;
  background: #ffffff;
  margin: 50px auto;
}
</style>
