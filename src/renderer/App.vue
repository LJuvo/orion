<template>
  <div id="app">
    <router-view></router-view>
  </div>
</template>

<script>
export default {
  name: "starera",
};
</script>

<style>
::-webkit-scrollbar {
  width: 4px;
  height: 4px;
}
::-webkit-scrollbar-track {
  background-color: none;
}
::-webkit-scrollbar-thumb {
  border-radius: 10px;
  background-color: #555;
}
.ivu-poptip-inner {
  background: #1e1e1e !important;
}
.ivu-poptip-arrow:after {
  border-top-color: #1e1e1e !important;
}
</style>
