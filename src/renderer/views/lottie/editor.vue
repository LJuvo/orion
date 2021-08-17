<template>
  <section class="svga-editor editor-full">
    <div class="svga-editor-border editor-full editor-flex">
      请将文件拖拽至此区域，预览Lottie动画
    </div>
  </section>
</template>
<style>
.lottie-editor {
  padding: 10px;
}
.lottie-editor-border {
  border: 1px dashed #eeeeee;
  border-radius: 5px;
  cursor: pointer;
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
