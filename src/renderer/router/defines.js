export const appRouter = {
    path: "/",
    name: "root",
    component: () =>
        import ("../views"),
    redirect: "/ngc",
    children: [{
            path: "ngc",
            name: "ngc",
            component: () =>
                import ("../views/ngc/")
        },
        {
            path: "help",
            name: "help",
            // name: 'landing-page',
            component: require('@/components/LandingPage').default
        }
    ]
}

export const routers = [appRouter];