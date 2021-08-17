<template>
  <div class="place-box">
    <div
      class="place-box-cell"
      :class="{
        'place-box-night': black,
      }"
    >
      <slot><h1>占位符</h1></slot>
    </div>
  </div>
</template>
<script>
export default {
  name: "place-box",
  props: {
    black: {
      type: Boolean,
      default: false,
    },
  },
};
</script>
<style scoped>
.place-box {
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;
  padding: 10px;
}

.place-box-cell {
  width: 100%;
  height: 100%;
  border-radius: 5px;
  background: #444;
  /* box-shadow: 2px 4px 4px rgba(196, 196, 196, 0.2); */

  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;
}
.place-box-night {
  background: none;
  box-shadow: 2px 4px 4px rgba(13, 150, 214, 0.2);
  border: 1px solid rgba(13, 167, 214, 0.8);
  color: rgba(13, 214, 204, 0.8);
}
</style>
