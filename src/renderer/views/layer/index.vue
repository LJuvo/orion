<template>
  <flex-layout class="flex-full">
    <section class="flex-h-full flex-1 flex-flow flex-flow-y">
      <layer-editor :layers="layerList"></layer-editor>
    </section>
    <flex-layout class="flex-h-full flex-menu flex-flow-y" col>
      <button @click="addLayer()">添加面板</button>
      <flex-layout v-for="(item, index) in layerList" :key="index">
        <span>{{ index + 1 }}</span>
        <input v-model="item.title" />
        <span
          :style="{
            cursor: index > 0 ? 'pointer' : '',
            color: index > 0 ? '#fff' : '#999',
          }"
          @click="index > 0 ? changeLayerIndex(index, true) : ''"
          >上移</span
        >
        <span
          :style="{
            cursor: index < layerList.length - 1 ? 'pointer' : '',
            color: index < layerList.length - 1 ? '#fff' : '#999',
          }"
          @click="
            index < layerList.length - 1 ? changeLayerIndex(index, false) : ''
          "
          >下移</span
        >
      </flex-layout>
    </flex-layout>
  </flex-layout>
</template>

<script>
import FlexLayout from "@/components/layout/flex";
import LayerEditor from "./editor";
export default {
  components: {
    "flex-layout": FlexLayout,
    "layer-editor": LayerEditor,
  },
  data() {
    return {
      isTools: false,
      defaultWidth: "300px",
      defaultHeight: "300px",
      defaultBack: "rgba(105, 217, 217, 0.5)",
      layerList: [
        { title: "入场动画层", tips: "入场动画层Tips" },
        { title: "图形图表层", tips: "图形图表层Tips" },
        { title: "图形外框层", tips: "图形外框层Tips" },
        { title: "地理地图层", tips: "地理地图层Tips" },
        { title: "背景层", tips: "背景层Tips" },
      ],
    };
  },
  methods: {
    addLayer() {
      this.layerList.push({
        title: "示例层",
        tips: "示例Tips",
      });
    },
    changeLayerIndex(index, state) {
      let newLayers = JSON.parse(JSON.stringify(this.layerList));
      const temp = newLayers[index];
      const tempIndex = state ? index - 1 : index + 1;

      newLayers[index] = newLayers[tempIndex];
      newLayers[tempIndex] = temp;

      this.layerList = newLayers;

      this.$forceUpdate();
    },
  },
};
</script>

<style></style>
