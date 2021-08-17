<template>
  <flex-layout class="flex-full">
    <section
      class="flex-h-full flex-menu flex justify-center items-center"
      v-if="!isTools"
    >
      <svga-info class="text-center"></svga-info>
    </section>
    <section class="flex-h-full flex-1 flex-flow-hide">
      <svga-editor
        @on-preview="fetchPreview()"
        @on-clear="clearPreview()"
      ></svga-editor>
    </section>
  </flex-layout>
</template>

<script>
import FlexLayout from "@/components/layout/flex";
import SvgaInfo from "./info";
import SvgaEditor from "./editor";
export default {
  components: {
    "flex-layout": FlexLayout,
    "svga-info": SvgaInfo,
    "svga-editor": SvgaEditor,
  },
  data() {
    return {
      isTools: false,
    };
  },
  methods: {
    fetchPreview() {
      this.isTools = true;
    },
    clearPreview() {
      this.isTools = false;
    },
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
