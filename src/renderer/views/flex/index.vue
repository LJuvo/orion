<template>
  <flex-layout class="flex-full" style="background: #EFF2F6;">
    <flex-layout class="flex-1 p-10">
      <preview-cell
        class="flex-1"
        :list="list"
        :activeId="currentCellId"
        root
      ></preview-cell>
    </flex-layout>
    <flex-layout col class="flex-w-menu" style="background: #f8f8f9">
      <place-box class="flex-h-tools">
        <button type="text">导出</button>
        <button type="text">导入</button>
      </place-box>
      <place-box class="flex-1">
        <menu-tree :list="list" :activeId="currentCellId"></menu-tree>
      </place-box>
      <place-box class="flex-1">
        <flex-layout col>
          <attribute-cell
            :option="currentCell ? currentCell.option : undefined"
          ></attribute-cell>
        </flex-layout>
      </place-box>
    </flex-layout>
  </flex-layout>
</template>

<script>
import FlexLayout from "@/components/layout/flex";
import PlaceBox from "@/components/place/box";
import MenuTree from "./treeCell";
import PreviewCell from "./previewCell";
import AttributeCell from "./attribute";
export default {
  components: {
    "flex-layout": FlexLayout,
    "place-box": PlaceBox,
    "menu-tree": MenuTree,
    "preview-cell": PreviewCell,
    "attribute-cell": AttributeCell,
  },
  data() {
    return {
      baseList: [
        {
          id: "root",
          parentId: null,
          option: {
            name: "根节点",
            level: 0,
          },
        },
        {
          id: "0001",
          parentId: "root",
          option: {
            name: "一级节点",
            col: true,
            level: 0,
          },
        },
        {
          id: "0101",
          parentId: "0001",
          option: { name: "二级节点0101", col: true, level: 0 },
        },
        {
          id: "0102",
          parentId: "0001",
          option: { name: "二级节点0102", level: 1 },
        },
        {
          id: "010201",
          parentId: "0102",
          option: { name: "三级节点010201", level: 0 },
        },
        {
          id: "01020101",
          parentId: "010201",
          option: { name: "四级节点01020101", level: 0 },
        },
        {
          id: "0002",
          parentId: "root",
          option: { name: "一级节点02", level: 1 },
        },
        {
          id: "0003",

          parentId: "root",
          option: { name: "一级节点03", col: true, level: 2 },
        },
        {
          id: "0004",
          parentId: "root",
          option: { name: "一级节点04", col: true, level: 3 },
        },
        {
          id: "0301",
          parentId: "0003",
          option: { name: "二级节点0301", level: 0 },
        },
        {
          id: "0302",
          parentId: "0003",
          option: { name: "二级节点0302", level: 1 },
        },
        {
          id: "0303",
          parentId: "0003",
          option: { name: "二级节点0303", level: 2 },
        },
      ],
      currentCellId: "",
      currentCell: undefined,
    };
  },
  computed: {
    list() {
      let fn = (data, pid) => {
        let arr = data.filter((o) => o.parentId == pid);
        if (arr.length > 0) {
          arr.forEach((ele) => {
            let child = fn(data, ele.id);
            ele.children = child.sort((a, b) => {
              return a.option.level - b.option.level;
            });
            ele.option.id = ele.id;
          });
        }
        return arr;
      };

      const temp = fn(this.baseList, null);
      return temp;
    },
  },
  mounted() {
    this.$EventBus.$on("tree-check", (cellId) => {
      this.checkCell(cellId);
    });
    this.$EventBus.$on("tree-add", (cellId) => {
      this.addCellChild(cellId);
    });
    this.$EventBus.$on("tree-delete", (cellId) => {
      if (cellId === "root") return alert("根节点不可删除");
      this.deleteCellChild(cellId);
    });
    this.$EventBus.$on("tree-sort", (sortOption) => {
      this.sortCell(sortOption);
    });
  },
  methods: {
    checkCell(cellId) {
      this.currentCellId = this.currentCellId === cellId ? "" : cellId;
      this.currentCell = this.currentCellId
        ? this.baseList.find((o) => o.id === this.currentCellId)
        : undefined;
    },
    addCellChild(cellId) {
      this.baseList.push({
        id: this.getUuid(),
        parentId: cellId,
        option: {
          name: "新建层",
          col: false,
          level: this.baseList.length + 1,
        },
      });
    },
    deleteCellChild(cellId) {
      // 递归删除子元素
      const baseArr = JSON.parse(JSON.stringify(this.baseList));
      let delArr = [];
      let fn = (pid) => {
        let arr = baseArr.filter((o) => o.parentId == pid);
        if (arr.length > 0) {
          arr.forEach((ele) => {
            delArr.push(ele);
            fn(ele.id);
          });
        }
      };

      fn(cellId);
      delArr.push(baseArr.find((o) => o.id === cellId));
      const temp = baseArr.filter(
        (o) => !delArr.find((ele) => ele.id === o.id)
      );
      this.baseList = temp;
    },
    sortCell({ id, flag }) {
      const parentId = this.baseList.find((o) => o.id === id).parentId;
      let parentChild = this.baseList.filter((o) => o.parentId === parentId);
      parentChild = parentChild.sort((a, b) => {
        return a.option.level - b.option.level;
      });
      const cellIndex = parentChild.findIndex((o) => o.id === id);
      const currentCell = parentChild[cellIndex];
      const tempCell = parentChild[flag ? cellIndex - 1 : cellIndex + 1];
      const level = currentCell.option.level;
      currentCell.option.level = flag ? level - 1 : level + 1;
      tempCell.option.level = level;
      this.baseList.forEach((ele) => {
        if (ele.id === currentCell.id) {
          ele = currentCell;
        }
        if (ele.id === tempCell.id) {
          ele = tempCell;
        }
      });
    },
    getUuid() {
      let s = [];
      let hexDigits = "0123456789abcdef";
      for (let i = 0; i < 36; i++) {
        s[i] = hexDigits.substr(Math.floor(Math.random() * 0x10), 1);
      }
      s[14] = "4";
      s[19] = hexDigits.substr((s[19] & 0x3) | 0x8, 1);
      s[8] = s[13] = s[18] = s[23] = "-";

      const uuid = s.join("");
      return uuid;
    },
  },
};
</script>

<style>
.place-box-cell {
  background: #ffffff !important;
  color: #333 !important;
}
</style>
