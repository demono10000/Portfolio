import {createRouter, createWebHashHistory} from 'vue-router'
import Timeline from "@/components/Timeline.vue";
import Contact from "@/components/Contact.vue";
import About from "@/components/About.vue";

const routes = [
    { path: '/', component: Timeline },
    { path: '/contact', component: Contact },
    { path: '/aboutme', component: About },
]

const router = createRouter({
    history: createWebHashHistory(),
    routes
})

export default router