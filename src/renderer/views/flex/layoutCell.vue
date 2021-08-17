<template>
  <flex-layout
    class="layout-box"
    :class="{ 'preview-cell-active': option && option.id === activeId }"
    :col="option && option.col"
  >
    <place-box class="flex-1" v-if="!root">{{
      option && option.name ? option.name : "节点名称"
    }}</place-box>
    <layout-cell
      v-for="(item, index) in option.children"
      :key="index"
      :option="item"
      :activeId="activeId"
    ></layout-cell>
  </flex-layout>
</template>
<script>
import FlexLayout from "@/components/layout/flex";
import PlaceBox from "@/components/place/box";
export default {
  name: "layout-cell",
  props: {
    option: Object,
    activeId: String,
  },
  components: {
    "flex-layout": FlexLayout,
    "place-box": PlaceBox,
  },
};
</script>
<style>
.layout-box {
  border-radius: 5px;
}
.preview-cell-active {
  border: 1px dashed #4a9ff4;
}
</style>
