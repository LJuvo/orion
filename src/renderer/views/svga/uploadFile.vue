<template>
  <div
    class="file-editor-border file-full file-flex"
    id="drop_area"
    :style="{ 'border-color': borderhover ? hoverBorder : defaultBorder }"
  >
    <h3>请将文件拖拽至此区域，预览SVGA动画</h3>
    <div>
      <input
        type="file"
        accept="image/png,image/jpeg,image/gif"
        multiple
        class="input-upload  cur-hand"
        @change="getUpload($event)"
      />
    </div>
  </div>
</template>
<script>
export default {
  props: {
    type: {
      type: Array,
      default: () => ["svga"],
    },
  },
  data() {
    return {
      defaultBorder: "#eeeeee",
      hoverBorder: "#3d8cff",
      borderhover: false, //文件拖拖动到区域的hover效果
      imgArr: [],
      fileData: [],
    };
  },
  mounted: function() {
    this.initDropBox();
  },
  methods: {
    initDropBox() {
      let _this = this;
      var dropbox = document.getElementById("drop_area");
      dropbox.addEventListener("drop", this.enentDrop, false);
      dropbox.addEventListener("dragleave", function(e) {
        e.stopPropagation();
        e.preventDefault();
        _this.borderhover = false;
      });
      dropbox.addEventListener("dragenter", function(e) {
        e.stopPropagation();
        e.preventDefault();
        _this.borderhover = true;
      });
      dropbox.addEventListener("dragover", function(e) {
        e.stopPropagation();
        e.preventDefault();
        _this.borderhover = true;
      });
    },
    enentDrop: function(e) {
      this.borderhover = false;
      e.stopPropagation();
      e.preventDefault(); //必填字段
      let fileData = e.dataTransfer.files;
      console.log(fileData);
      this.uploadFile(fileData);
    },
    uploadFile: function(file) {
      //渲染上传文件
      for (let i = 0; i !== file.length; i++) {
        let fileJson = {
          url: "",
          progressStatl: 0,
          fileText: "",
        };
        let video_type =
          file[i].type == "video/mp4" || file[i].type == "video/ogg";
        // if (file[i].type.indexOf("image") === 0) {
        //如果是图片
        let fileurl = window.URL.createObjectURL(file[i]); //创建一个url连接,供src属性引用
        fileJson.url = fileurl;
        // } else if (video_type) {
        //   let fileurl = window.URL.createObjectURL(file[i]); //创建一个url连接,供src属性引用
        // } else {
        //   alert("不支持此类型文件");
        // }
        fileJson.fileText = file[i].name;
        // this.fileData.push(fileJson);
        this.$emit("on-preview", JSON.parse(JSON.stringify(fileJson)));
      }
    },
    deleteFile: function(index) {
      //删除已选文件
      this.fileData.splice(index, 1);
    },
  },
};
</script>
<style>
.file-editor-border {
  border: 1px dashed #eeeeee;
  border-radius: 5px;
  cursor: pointer;
}
.file-full {
  width: 100%;
  height: 100%;
}
.file-flex {
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  text-align: center;
}
</style>
