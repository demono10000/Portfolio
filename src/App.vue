<template>
    <div class="min-h-screen bg-gray-100 dark:bg-gray-900 font-sans leading-normal tracking-normal">
        <Navbar />
        <div class="container mx-auto md:px-8 lg:px-16 xl:px-32 py-8">
            <router-view></router-view>
        </div>
    </div>
</template>

<script>
import Navbar from "@/components/Navbar.vue";

export default {
    components: {
        Navbar
    }
}
</script>
