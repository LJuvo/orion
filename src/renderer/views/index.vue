<template>
  <div class="orion">
    <!-- <div class="orion-header">
      <div class="orion-header-title">STARERA LAYOUT</div>
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
    </div> -->
    <div class="orion-content">
      <flex-layout
        col
        class="orion-content-left"
        style="-webkit-app-region: drag;"
      >
        <flex-layout col>
          <Tooltip
            v-for="(item, key) in routerRes"
            :key="key"
            :content="item.name"
            placement="right"
          >
            <div class="orion-content-icon" @click="onRouterPush(item.path)">
              <!-- <span>{{item.name}}</span> -->
              <Icon :size="24" color="#979dc3" :type="item.icon" />
            </div>
          </Tooltip>
        </flex-layout>
        <flex-layout col class="flex-1 justify-end">
          <Tooltip content="关闭 / Close" placement="right">
            <div class="orion-content-icon">
              <Icon :size="20" type="md-power" @click="changeWinClose()" />
            </div>
          </Tooltip>
        </flex-layout>
      </flex-layout>
      <div class="orion-content-wrapper">
        <router-view></router-view>
      </div>
    </div>
    <!-- <div class="orion-footer">
      <span class="orion-footer-version">starera for layout @verson 1.0.0</span>
      <span class="orion-footer-copyright">
        Copyright © 2021 JuvoS All Rights Reserved.
      </span>
    </div> -->
  </div>
</template>

<script>
import { appRouter } from "../router/defines";
import { ipcRenderer } from "electron";
import FlexLayout from "@/components/layout/flex";
export default {
  data() {
    return {
      maxState: false,
    };
  },
  components: {
    "flex-layout": FlexLayout,
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
  },
};
</script>

<style>
:root {
  --white: #ffffff;
  --main-title-bg: var(--white);
}
.orion {
  width: 100%;
  height: 100vh;
  overflow: hidden;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  color: var(--body-color);
  background: var(--body-bg-color);
}
.orion-header {
  width: 100%;
  height: 30px;
  background: var(--main-title-bg);
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  border-bottom: 1px solid var(--border-color);
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
  flex: 1;
  display: flex;
  flex-direction: row;
  justify-content: space-between;
}
.orion-content-left {
  -webkit-app-region: drag;
  width: 41px;
  height: 100%;
  overflow: auto;
  /* overflow-y: auto; */
  background: var(--main-title-bg);
  border-right: 1px solid var(--border-color);
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
  color: var(--main-color);

  background: var(--main-title-bg);
  border-top: 1px solid var(--border-color);
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
