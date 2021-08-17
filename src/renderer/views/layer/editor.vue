<template>
  <section class="svga-editor editor-full">
    <section class="transform-perspective">
      <section class="box-3d" v-for="(item, key) in layers" :key="key">
        <div
          class="box-3d-pane"
          :class="{
            active: checkCellIndex === key,
          }"
          :style="{
            width: defaultWidth,
            height: defaultHeight,
            background: defaultBack,
          }"
          @click="checkCell(key)"
        >
          <h1>{{ item.title }}</h1>
        </div>
        <div class="box-3d-box">{{ item.tips }}</div>
      </section>
    </section>
  </section>
</template>
<script>
export default {
  props: {
    layers: {
      type: Array,
      default: () => [],
    },
  },
  data() {
    return {
      defaultWidth: "300px",
      defaultHeight: "300px",
      defaultBack: "rgba(105, 217, 217, 0.5)",
      checkCellIndex: undefined,
    };
  },
  methods: {
    checkCell(index) {
      this.checkCellIndex = index;
    },
  },
};
</script>

<style>
.transform-perspective {
  width: 0;
  height: 0;
  transform-style: preserve-3d;
}

.box-3d {
  height: 30px;
  transform-style: preserve-3d;
  /* transform: translate(0px, 0px) rotateX(-19.95deg) rotateY(-44.96deg) scale3d(0.9995, 0.9995, 0.9995); */
  transform: translate(300px, 0px) rotateX(340deg) rotateY(45deg)
    scale3d(0.9995, 0.9995, 0.9995);
  position: relative;
}

.box-3d-pane {
  opacity: 0.7;
  transform: rotateX(90deg);
  display: flex;
  justify-content: center;
  align-items: center;
  border: 2px dashed #00bcd4;
}
.box-3d-pane:hover {
  border-color: rgb(255, 214, 127);
}

.active {
  border-color: #d47800;
  opacity: 1;
}

.box-3d-box {
  position: absolute;
  right: 30px;
  color: #fff;
  width: 150px;
  top: 100px;
  border-bottom: 1px dashed #00bcd4;
}
</style>
