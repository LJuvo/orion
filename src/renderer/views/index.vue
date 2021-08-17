<template>
  <div class="orion">
    <div class="orion-header">
      <div class="orion-header-title">STARERA</div>
      <div class="orion-header-btngroup">
        <Icon
          class="orion-header-btngroup-handle"
          :size="22"
          type="ios-remove"
          @click="changeWinMin()"
        />
        <Icon
          class="orion-header-btngroup-handle"
          :size="16"
          type="ios-browsers-outline"
          v-if="maxState"
          @click="changeWinMax(false)"
        />

        <Icon
          class="orion-header-btngroup-handle"
          :size="16"
          type="ios-square-outline"
          v-else
          @click="changeWinMax(true)"
        />
        <Icon
          class="orion-header-btngroup-handle"
          :size="24"
          type="ios-close"
          @click="changeWinClose()"
        />
      </div>
    </div>
    <div class="orion-content">
      <div class="orion-content-left">
        <Tooltip
          v-for="(item, key) in routerRes"
          :key="key"
          :content="item.name"
          placement="right"
        >
          <div class="orion-content-icon" @click="onRouterPush(item.path)">
            <!-- <span>{{item.name}}</span> -->
            <Icon :size="26" color="#999" :type="item.icon" />
          </div>
        </Tooltip>
      </div>
      <div class="orion-content-wrapper">
        <router-view></router-view>
      </div>
    </div>
    <div class="orion-footer">
      <span class="orion-footer-version">orion to svga @verson 0.0.1</span>
      <span class="orion-footer-copyright">
        <!-- Copyright © 2019 - 2119 JuvoS. All Rights Reserved.JuvoS / License MIT -->
        Copyright © 2019 JuvoS All Rights Reserved.
      </span>
    </div>
  </div>
</template>

<script>
import { appRouter } from "../router/defines";
// import WindowUtil from "../common/WindowUtil";
import { ipcRenderer } from "electron";
import { fail } from "assert";
export default {
  data() {
    return {
      maxState: false,
    };
  },
  computed: {
    routerRes() {
      return appRouter.children;
    },
  },
  mounted() {},
  methods: {
    onRouterPush(v) {
      this.$router.push("/" + v);
    },
    changeWinMin() {
      ipcRenderer.send("min");
    },

    changeWinMax(v) {
      this.maxState = v;
      if (v) return ipcRenderer.send("max");
      return ipcRenderer.send("unmax");
    },
    changeWinClose() {
      ipcRenderer.send("close");
    },
    // changeWinHide(v) {
    //   if (v) return ipcRenderer.send("show");
    //   return ipcRenderer.send("hide");
    // }
  },
};
</script>

<style>
.orion {
  width: 100%;
  height: 100vh;
  overflow: hidden;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  color: rgb(234, 234, 234);
  background: rgb(40, 40, 40);
}
.orion-header {
  width: 100%;
  height: 30px;
  background: rgb(30, 30, 30);
  display: flex;
  flex-direction: row;
  justify-content: space-between;
}
.orion-header-title {
  flex: 1;
  height: 30px;
  line-height: 30px;
  padding-left: 10px;
  -webkit-app-region: drag;
}
.orion-header-btngroup {
  display: flex;
  color: #ffffff;
  display: flex;
  align-items: center;
}
.orion-header-btngroup-handle {
  cursor: hand;
  cursor: pointer;
  margin: 0 2px;
}
.orion-content {
  width: 100%;
  height: calc(100vh - 55px);
  display: flex;
  flex-direction: row;
  justify-content: space-between;
}
.orion-content-left {
  width: 40px;
  height: 100%;
  overflow: auto;
  /* overflow-y: auto; */
  background: rgb(38, 38, 38);
}
.orion-content-icon {
  width: 40px;
  height: 40px;
  text-align: center;
  display: flex;
  justify-content: center;
  align-items: center;
}
.orion-content-wrapper {
  flex: 1;
  height: 100%;
  overflow: hidden;
  overflow-y: auto;
  /* background: rgb(30, 30, 30); */
}
.orion-content-right {
  width: 300px;
  height: 100%;
  overflow: hidden;
  overflow-y: auto;
}
.orion-footer {
  width: 100%;
  height: 25px;
  overflow: hidden;

  background: rgb(74, 74, 74);
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  font-size: 12px;
}
.orion-footer-version {
  line-height: 25px;
  padding-left: 10px;
}
.orion-footer-copyright {
  line-height: 25px;
  padding-right: 20px;
}
</style>
<style>
.text-center {
  text-align: center;
}
.p-10 {
  padding: 10px;
}
.px-10 {
  padding: 0 10px;
}
.py-10 {
  padding: 10px 0;
}
.pl-10 {
  padding-left: 10px;
}
.pr-10 {
  padding-right: 10px;
}
.m-5 {
  margin: 5px;
}
.mx-5 {
  margin: 0 5px;
}
.my-5 {
  margin: 5px 0;
}
.mt-5 {
  margin-bottom: 5px;
}
.m-10 {
  margin: 10px;
}
.mx-10 {
  margin: 0 10px;
}
.my-10 {
  margin: 10px 0;
}
.mt-10 {
  margin-bottom: 10px;
}
</style>
