<template>
  <router-view></router-view>
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
  background: #ffffff !important;
}
.ivu-poptip-arrow:after {
  border-top-color: #fff !important;
}
</style>
<style>
.anim-y {
  animation: slideUp 0.6s both;
}

.anim-y:nth-child(2) {
  animation-delay: 0.28s;
}

.anim-y:nth-child(3) {
  animation-delay: 0.42s;
}

.anim-y:nth-child(4) {
  animation-delay: 0.56s;
}

.anim-y:nth-child(5) {
  animation-delay: 0.7s;
}

.anim-y:nth-child(6) {
  animation-delay: 0.84s;
}

.anim-y:nth-child(7) {
  animation-delay: 0.98s;
}

.anim-y:nth-child(8) {
  animation-delay: 1.12s;
}

.anim-y:nth-child(9) {
  animation-delay: 1.26s;
}

.anim-y:nth-child(10) {
  animation-delay: 1.4s;
}

@keyframes slideUp {
  0% {
    transform: translateY(76px) scale(0.92);
    opacity: 0;
  }
}
</style>
