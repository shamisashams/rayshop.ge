import React from 'react'
import { render } from 'react-dom'
import { createInertiaApp } from '@inertiajs/inertia-react'
import { InertiaProgress } from '@inertiajs/progress'
import NProgress from 'nprogress'
import { Inertia } from '@inertiajs/inertia'
// import Translates from "./Mixins/Translates";

InertiaProgress.init({color: '#d54f57'})

createInertiaApp({
    resolve: name => require(`./Pages/${name}`),
    setup({ el, App, props }) {
        render(<App {...props}/>, el)
    }
});


