<template>
  <div
    class="flex"
    :class="{
      'flex-row': !col,
      'flex-col': col,
    }"
  >
    <slot></slot>
    <slot v-if="place" name="place">
      <place-box class="flex-1"></place-box>
    </slot>
  </div>
</template>
<script>
import PlaceBox from "../place/box";
export default {
  props: {
    col: {
      type: Boolean,
      default: false,
    },
    place: {
      type: Boolean,
      default: false,
    },
  },
  components: {
    "place-box": PlaceBox,
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
.flex-w-menu {
  width: 320px;
}
.flex-h-full {
  height: 100%;
}
.flex-h-tools {
  height: 60px;
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
</style>
