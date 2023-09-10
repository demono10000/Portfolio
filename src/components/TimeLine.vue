<template>
    <div class="bg-white dark:bg-gray-900 p-6 rounded-lg shadow-md">
        <h1 class="text-4xl font-bold mb-8 text-gray-900 dark:text-gray-100">{{ $t('timeline_title') }}</h1>
        <div v-for="year in years" :key="year.year" class="mb-8">
            <h2 class="text-3xl font-semibold mb-4 text-gray-700 dark:text-gray-200">{{ year.year }}</h2>
            <div v-for="event in year.events" :key="event.title" class="mb-4 pl-4 border-l-4 border-red-600">
                <h3 class="text-xl font-medium mb-2 text-gray-800 dark:text-gray-200">{{ event.title }}</h3>

                <div v-for="(content, index) in event.contents" :key="index">
                    <p v-if="content.type === 'text'" class="text-gray-700 dark:text-gray-300 mb-2">{{ content.value }}</p>

                    <img v-if="content.type === 'image'" :src="content.src" alt="image" class="w-full mb-2">

                    <video v-if="content.type === 'video'" controls class="w-full mb-2">
                        <source :src="content.src" type="video/mp4">
                    </video>

                    <a v-if="content.type === 'link'" :href="content.src" class="underline text-blue-600 mb-2"
                       target="_blank">{{ content.label }}</a>

                    <a v-if="content.type === 'file'" :href="content.src" download class="underline text-blue-600 mb-2">{{
                        content.label
                        }}</a>

                    <iframe v-if="content.type === 'youtube-video'"
                            :src="'https://www.youtube.com/embed/' + content.videoId"
                            class="youtube-frame mb-2"></iframe>

                    <iframe v-if="content.type === 'youtube-playlist'"
                            :src="'https://www.youtube.com/embed/videoseries?list=' + content.playlistId"
                            class="youtube-frame mb-2"></iframe>

                    <a v-if="content.type === 'github-repo'" :href="content.url" class="github-link mb-2"
                       target="_blank">
                        <i class="fab fa-github"></i> GitHub
                    </a>

                    <a v-if="content.type === 'google-play'" :href="content.url" class="google-play-link mb-2"
                       target="_blank">
                        <i class="fab fa-google-play"></i> Google Play
                    </a>

                    <iframe v-if="content.type === 'facebook-video'"
                            :src="'https://www.facebook.com/plugins/video.php?href=' + encodeURIComponent(content.url)"
                            class="facebook-frame mb-2"></iframe>

                </div>
            </div>
        </div>
    </div>
</template>

<script>
export default {
    data() {
        return {
            years: [
                {
                    year: 2023,
                    events: [
                        {
                            title: "Hello World!",
                            contents: [
                                {
                                    type: 'text',
                                    value: 'This is template'
                                }
                            ]
                        }
                    ]
                }
            ]
        }
    }
}
</script>
