<template>
  <section class="editor-full">
    <div class="svga-editor editor-full" v-if="!fileInfo">
      <!-- 请将文件拖拽至此区域，预览SVGA动画 -->
      <svga-file @on-preview="fetchPreview($event)"></svga-file>
    </div>
    <flex-layout col class="editor-full" v-if="fileInfo">
      <!-- SVGA Player -->
      <svga-player
        class="flex-1"
        :file="fileInfo"
        @on-clear="clearCanvas()"
      ></svga-player>
    </flex-layout>
  </section>
</template>
<script>
import FlexLayout from "@/components/layout/flex";
import SvgaPlayer from "./player";
import SvgaFile from "./uploadFile";
export default {
  props: {},
  components: {
    "flex-layout": FlexLayout,
    "svga-player": SvgaPlayer,
    "svga-file": SvgaFile,
  },
  data() {
    return {
      fileInfo: undefined,
    };
  },
  methods: {
    fetchPreview(file) {
      this.fileInfo = file;
      this.$emit("on-preview");
    },
    clearCanvas() {
      this.fileInfo = undefined;
      this.$emit("on-clear");
    },
  },
};
</script>

<style>
.svga-editor {
  padding: 10px;
}

.editor-full {
  width: 100%;
  height: 100%;
}
.editor-flex {
  display: flex;
  justify-content: center;
  align-items: center;
  text-align: center;
}
</style>
