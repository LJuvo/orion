<template>
  <flex-layout :col="col">
    <div class="flex-cell-title">
      <slot name="title">{{ label }}</slot>
    </div>
    <div class="flex-1">
      <slot></slot>
    </div>
  </flex-layout>
</template>
<script>
import FlexLayout from "./flex";
export default {
  props: {
    col: {
      type: Boolean,
      default: false,
    },
    label: {
      type: String,
      default: "",
    },
  },
  components: {
    "flex-layout": FlexLayout,
  },
};
</script>

<style scoped>
.flex {
  display: flex;
}
.flex-row {
  flex-direction: row;
}
.flex-col {
  flex-direction: column;
}
.flex-1 {
  flex: 1;
}
.flex-menu {
  width: 320px;
}
.flex-full {
  width: 100%;
  height: 100%;
}
.flex-w-full {
  width: 100%;
}
.flex-h-full {
  height: 100%;
}
.flex-flow-hide {
  overflow: hidden;
}
.flex-flow-x {
  overflow-x: auto;
}
.flex-flow-y {
  overflow-y: auto;
}
.justify-center {
  justify-content: center;
}
.justify-between {
  justify-content: space-between;
}
.justify-start {
  justify-content: flex-start;
}
.justify-end {
  justify-content: flex-end;
}
.items-center {
  align-items: center;
}
.flex-cell-title {
  font-weight: 400;
  padding-right: 10px;
}
</style>
