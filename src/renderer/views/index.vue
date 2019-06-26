<template>
  <div class="orion">
    <div class="orion-header">
      <div class="orion-header-title">Drag</div>
      <div class="orion-header-btngroup">
        <Button @click="changeWinMin()">最小化</Button>
        <Button v-if="maxState" @click="changeWinMax(false)">恢复</Button>
        <Button v-else @click="changeWinMax(true)">最大化</Button>

        <!-- <Button @click="changeWinHide(true)">显示</Button>
        <Button @click="changeWinHide(false)">隐藏</Button>-->
        <Button @click="changeWinClose()">关闭</Button>
      </div>
    </div>
    <div class="orion-content">
      <div class="orion-content-left">
        <div v-for="(it,ke) in routerRes" :key="ke" @click="onRouterPush(it.path)">
          <span>{{it.name}}</span>
        </div>
      </div>
      <div class="orion-content-wrapper">
        <h1>Views</h1>
        <router-view></router-view>
      </div>
      <!-- <div class="orion-content-right"></div> -->
    </div>
    <div class="orion-footer">
      <span class="orion-footer-version">orion @verson 0.0.1</span>
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
      maxState: false
    };
  },
  computed: {
    routerRes() {
      return appRouter.children;
    }
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
    }
    // changeWinHide(v) {
    //   if (v) return ipcRenderer.send("show");
    //   return ipcRenderer.send("hide");
    // }
  }
};
</script>

<style>
.orion {
  width: 100%;
  height: 100vh;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  color: rgb(234, 234, 234);
  background: rgb(40, 40, 40);
}
.orion-header {
  width: 100%;
  height: 50px;
  background: rgb(30, 30, 30);
  display: flex;
  flex-direction: row;
  justify-content: space-between;
}
.orion-header-title {
  flex: 1;
  -webkit-app-region: drag;
}
.orion-header-btngroup {
  display: flex;
}
.orion-content {
  width: 100%;
  height: calc(100vh - 80px);
  display: flex;
  flex-direction: row;
  justify-content: space-between;
}
.orion-content-left {
  width: 240px;
  height: 100%;
  overflow: hidden;
  overflow-y: auto;
  background: rgb(38, 38, 38);
}
.orion-content-wrapper {
  flex: 1;
  height: 100%;
  overflow: hidden;
  overflow-y: auto;
  background: rgb(30, 30, 30);
}
.orion-content-right {
  width: 300px;
  height: 100%;
  overflow: hidden;
  overflow-y: auto;
}
.orion-footer {
  width: 100%;
  height: 30px;

  background: rgb(74, 74, 74);
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  font-size: 12px;
}
.orion-footer-version {
  line-height: 30px;
  padding-left: 10px;
}
.orion-footer-copyright {
  line-height: 30px;
  padding-right: 20px;
}
</style>
