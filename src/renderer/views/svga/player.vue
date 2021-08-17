<template>
  <flex-layout class="flex-h-full">
    <div v-if="loading" class="flex flex-1 justify-center items-center">
      <Icon :size="40" type="ios-loading" />
    </div>
    <flex-layout v-show="!loading" col class="flex-1 flex-flow-hide">
      <flex-layout class="svga-player-title flex-w-full px-10">
        <div class="flex-1">{{ file.fileText }}</div>
        <div><a @click="clearCanvas()">清空画布</a></div>
      </flex-layout>

      <flex-layout col class="flex-1 flex-w-full flex-flow-hide">
        <div class="svga-player-draw flex-1 flex-flow-hide">
          <div
            class="svga-player-draw-pane flex-full flex justify-center items-center"
            :style="{ background: currentBack }"
          >
            <canvas class="flex-w-full" id="player"></canvas>
          </div>
        </div>
        <flex-layout class="justify-between px-10">
          <flex-layout class="items-center justify-start">
            <button @click="startPlay()">开始</button>
            <button @click="pausePlay()">暂停</button>
            <button @click="resumePlay()">恢复</button>
            <button @click="stopPlay()">停止</button>
            <button @click="setTextByKey('img_66')">FRAME</button>
          </flex-layout>
          <flex-layout class="items-center justify-end">
            <span
              class="back-color-cell"
              v-for="(item, key) in backColor"
              :key="key"
              :style="{ background: item }"
              @click="checkBackColor(item)"
            ></span>
          </flex-layout>
        </flex-layout>
      </flex-layout>
      <flex-layout
        class="svga-player-pane flex-w-full flex-flow-hide flex-flow-x"
      >
        <flex-layout
          col
          class="text-center svga-player-pane-cell justify-center items-center"
          v-for="(item, key) in playerSprites"
          :key="key"
        >
          <Poptip trigger="hover">
            <img
              :src="'data:image/png;base64,' + playerSource[item.imageKey]"
            />
            <div class="pop-pic" slot="content">
              <img
                :src="'data:image/png;base64,' + playerSource[item.imageKey]"
              />
            </div>
          </Poptip>
          <span>{{ item.imageKey }}</span>
        </flex-layout>
      </flex-layout>
    </flex-layout>
    <flex-layout
      v-show="!loading"
      col
      class="svga-player-tools flex-h-full flex-flow-hide flex-flow-y"
    >
      <flex-cell label="终止画面" class="mt-5"> </flex-cell>
      <flex-cell label="循环次数" class="mt-5"></flex-cell>
      <flex-cell label="SVG转换" class="mt-5"></flex-cell>
      <flex-cell label="图片资源" class="mt-5"></flex-cell>
    </flex-layout>
  </flex-layout>
</template>
<script>
import { Parser, Player } from "svga";
import * as SVGA from "svgaplayerweb";
import FlexLayout from "@/components/layout/flex";
import FlexCell from "@/components/layout/flexCell";
export default {
  props: ["file"],
  components: {
    "flex-layout": FlexLayout,
    "flex-cell": FlexCell,
  },
  data() {
    return {
      player: {},
      parser: {},
      playInfo: {},
      playerSource: {},
      playerSprites: [],
      loading: false,
      backColor: ["none", "#000", "#fff", "#d14439", "#64bd79", "#4f8fd6"],
      currentBack: "none",
      currentState: "playing",
    };
  },
  created() {
    this.loading = true;
  },
  mounted() {
    if (this.file && this.file.url) {
      this.initPlayer("player", this.file.url);
    }
  },
  methods: {
    initPlayer(id, url) {
      let self = this;
      this.initLitePlayer(id, url);

      this.parser = new SVGA.Parser();
      this.parser.load(url, function(videoItem) {
        const parserInfo = JSON.parse(JSON.stringify(videoItem));
        self.playInfo = parserInfo;
        self.playerSource = parserInfo.images;
        self.playerSprites = parserInfo.sprites;
        self.loading = false;
      });
    },
    startPlay() {
      this.player.start();
    },
    pausePlay() {
      this.player.pause();
    },
    resumePlay() {
      this.player.resume();
    },
    stopPlay() {
      this.player.stop();
    },
    async setTextByKey(imageKey) {
      this.player.setText(
        {
          text: "Hello, World!",
          family: "Arial",
          size: "24px",
          color: "#ffe0a4",
          offset: { x: 0.0, y: 0.0 },
        },
        imageKey
      );
    },
    clearCanvas() {
      this.$emit("on-clear");
    },
    checkBackColor(color) {
      this.currentBack = color;
    },
    async initLitePlayer(id, url) {
      const parser = new Parser();
      const svga = await parser.load(url);
      const player = new Player(document.getElementById(id));
      this.parser = parser;
      this.player = player;

      await player.mount(svga);
      player.onStart = () => {
        console.log("onStart");
        this.currentState = "playing";
      };
      player.onResume = () => {
        this.currentState = "playing";
        console.log("onResume");
      };
      player.onPause = () => {
        console.log("onPause");
        this.currentState = "pause";
      };
      player.onStop = () => {
        this.currentState = "stop";
        console.log("onStop");
      };
      player.onProcess = () => console.log("onProcess", this.player.progress);
      player.onEnd = () => console.log("onEnd");
      // 开始播放动画
      player.start();
    },
  },
};
</script>
<style scoped>
.svga-player {
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
}
.svga-player-title {
  height: 30px;
  line-height: 30px;
}
.svga-player-box {
  border: 1px solid #eeeeee;
}
.svga-player-pane {
  height: 110px;
  border-top: 1px solid rgba(217, 217, 217, 0.5);
}
.svga-player-pane-cell {
  height: 100px;
  width: 100px;
  overflow: hidden;
  flex-shrink: 0;
}
.svga-player-pane-cell img {
  height: 80px;
  width: 80px;
}
.svga-player-pane-cell span {
  height: 20px;
  width: 100%;
  text-overflow: ellipsis;
  overflow: hidden;
  white-space: nowrap;
}
.svga-player-tools {
  width: 300px;
  border-left: 1px solid rgba(217, 217, 217, 0.5);
  padding: 10px;
}
.svga-player-draw {
  width: 100%;
  padding: 10px;
}
.svga-player-draw-pane {
  border: 1px dashed rgba(217, 217, 217, 0.5);
  border-radius: 5px;
  overflow: hidden;
  width: 100%;
}
.pop-pic {
  width: 400px;
  height: 400px;
  border-radius: 5px;
  overflow: hidden;
}
.pop-pic img {
  width: 100%;
  height: auto;
}
</style>
<style scoped>
.back-color-cell {
  border: 1px solid #999999;
  width: 10px;
  height: 10px;
  border-radius: 10px;
  margin-right: 5px;
  cursor: pointer;
}
.back-color-cell:last-child {
  margin-right: 0;
}
</style>
