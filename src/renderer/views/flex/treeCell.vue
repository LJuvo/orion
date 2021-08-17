<template>
  <flex-layout col>
    <flex-layout col v-for="(item, index) in list" :key="index">
      <flex-layout
        class="justify-between tree-cell"
        :class="{ 'active-cell': activeId === item.id }"
      >
        <div class="flex-1" @click="checkCell(item.id, $event)">
          {{ item.option && item.option.name ? item.option.name : "节点" }}
        </div>
        <div>
          <span @click="addCell(item.id, $event)">添加</span>
          <span v-if="item.id != 'root'" @click="deleteCell(item.id, $event)"
            >删除</span
          >
          <span
            v-if="item.id != 'root'"
            :style="{
              color: index !== 0 ? '' : '#666',
            }"
            @click="index !== 0 ? sortCell(item.id, true, $event) : ''"
            >上移</span
          >
          <span
            v-if="item.id != 'root'"
            :style="{
              color: index < list.length - 1 ? '' : '#666',
            }"
            @click="
              index < list.length - 1 ? sortCell(item.id, false, $event) : ''
            "
            >下移</span
          >
        </div>
      </flex-layout>
      <tree-cell
        :list="item.children"
        :activeId="activeId"
        class="pl-10"
      ></tree-cell>
    </flex-layout>
  </flex-layout>
</template>
<script>
import FlexLayout from "@/components/layout/flex";
export default {
  name: "treeCell",
  props: {
    list: Array,
    activeId: String,
  },
  components: {
    "flex-layout": FlexLayout,
  },
  methods: {
    checkCell(id, e) {
      e.stopPropagation();
      e.preventDefault();
      this.$EventBus.$emit("tree-check", id);
    },
    addCell(id, e) {
      e.stopPropagation();
      e.preventDefault();
      this.$EventBus.$emit("tree-add", id);
    },
    deleteCell(id, e) {
      e.stopPropagation();
      e.preventDefault();
      this.$EventBus.$emit("tree-delete", id);
    },
    sortCell(id, flag, e) {
      e.stopPropagation();
      e.preventDefault();
      this.$EventBus.$emit("tree-sort", { id, flag });
    },
  },
};
</script>
<style>
.tree-cell {
  cursor: pointer;
  /* background: #252526; */
}
.active-cell {
  background: #37373d;
  color: #73c991;
}
</style>
