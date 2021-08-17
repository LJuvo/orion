export const appRouter = {
  path: "/",
  name: "root",
  component: () => import("../views"),
  redirect: "/ngc",
  children: [
    {
      path: "ngc",
      name: "ngc",
      icon: "ios-bonfire",
      component: () => import("../views/ngc/"),
    },
    {
      path: "layer",
      name: "多层思路呈现",
      icon: "logo-buffer",
      component: require("@/views/layer/index").default,
    },
    {
      path: "flex",
      name: "Flex布局模拟",
      icon: "logo-buffer",
      component: require("@/views/flex/index").default,
    },
    {
      path: "svga",
      name: "svga",
      icon: "ios-boat",
      component: require("@/views/svga/index").default,
    },
    {
      path: "lottie",
      name: "lottie",
      icon: "ios-bowtie",
      component: require("@/views/lottie/index").default,
    },
    {
      path: "help",
      name: "help",
      icon: "ios-help-circle",
      // name: 'landing-page',
      component: require("@/components/LandingPage").default,
    },
  ],
};

export const routers = [appRouter];
