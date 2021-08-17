<template>
  <flex-layout class="flex-1">
    <flex-layout col class="flex-1" v-if="option">
      <flex-cell label="文字内容">
        <span v-if="option.id == 'root'">{{ option.name }}</span>
        <input v-else v-model="option.name" />
      </flex-cell>
      <flex-cell label="布局方向">
        <i-switch v-model="option.col" size="small" />
      </flex-cell>
      <flex-cell label="布局方式"></flex-cell>
      <flex-cell label="内边距"></flex-cell>
    </flex-layout>
    <flex-layout class="flex-1" v-else>
      未选中
    </flex-layout>
  </flex-layout>
</template>
<script>
import FlexLayout from "@/components/layout/flex";
import FlexCell from "@/components/layout/flexCell";
export default {
  model: {
    prop: "option",
    event: "change",
  },
  props: {
    option: Object,
  },
  components: {
    "flex-layout": FlexLayout,
    "flex-cell": FlexCell,
  },
};
</script>
