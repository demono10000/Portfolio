import {createRouter, createWebHashHistory} from 'vue-router'
import Timeline from "@/components/Timeline.vue";
import Contact from "@/components/Contact.vue";

const routes = [
    { path: '/', component: Timeline },
    { path: '/contact', component: Contact },
]

const router = createRouter({
    history: createWebHashHistory(),
    routes
})

export default router