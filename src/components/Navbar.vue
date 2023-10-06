<template>
    <nav class="border-b pb-4 mb-4 bg-white dark:bg-gray-900 px-4 sm:px-8 md:px-0 py-2 sm:py-4">
        <div class="container mx-auto md:px-8 lg:px-16 xl:px-32 flex justify-between items-center">
            <div class="space-x-4">
                <router-link v-slot="{ isActive, navigate }" to="/">
                    <button
                            @click="navigate"
                            class="px-3 py-2 rounded-lg transition hover:bg-red-100 dark:hover:bg-red-900"
                            :class="isActive ? 'bg-red-200 dark:bg-red-800 text-red-700 dark:text-red-100' : 'text-gray-700 dark:text-gray-300 hover:text-red-700 dark:hover:text-red-200'">
                        {{ $t('portfolio') }}
                    </button>
                </router-link>
                <router-link v-slot="{ isActive, navigate }" to="/contact">
                    <button
                            @click="navigate"
                            class="px-3 py-2 rounded-lg transition hover:bg-red-100 dark:hover:bg-red-900"
                            :class="isActive ? 'bg-red-200 dark:bg-red-800 text-red-700 dark:text-red-100' : 'text-gray-700 dark:text-gray-300 hover:text-red-700 dark:hover:text-red-200'">
                        {{ $t('contact') }}
                    </button>
                </router-link>
                <router-link v-slot="{ isActive, navigate }" to="/aboutme">
                    <button
                        @click="navigate"
                        class="px-3 py-2 rounded-lg transition hover:bg-red-100 dark:hover:bg-red-900"
                        :class="isActive ? 'bg-red-200 dark:bg-red-800 text-red-700 dark:text-red-100' : 'text-gray-700 dark:text-gray-300 hover:text-red-700 dark:hover:text-red-200'">
                        {{ $t('about_me_title') }}
                    </button>
                </router-link>
            </div>

            <div class="flex space-x-4 items-center">
                <div class="relative w-24 p-1 border rounded hover:border-red-500">
                    <div @click="showDropdown = !showDropdown"
                         class="flex items-center justify-center cursor-pointer dark:text-gray-200">
                        <span :class="`flag-icon flag-icon-${currentFlag} mr-2`"></span>
                        {{ $i18n.locale.toUpperCase() }}
                    </div>
                    <ul :class="{'scale-y-100 opacity-100': showDropdown}"
                        class="absolute z-10 list-none m-0 p-0 top-full left-0 w-full transform origin-top scale-y-0 transition-transform ease-in duration-200 bg-white dark:bg-gray-800 border border-gray-300 rounded dark:text-gray-200">
                        <li v-for="lang in languages" :key="lang.code" @click="changeLanguage(lang.code)"
                            class="flex items-center justify-center px-4 py-2 cursor-pointer hover:bg-gray-200 dark:hover:bg-gray-700">
                            <span :class="`flag-icon flag-icon-${lang.flag} mr-2 flag-size`"></span>
                            {{ lang.code.toUpperCase() }}
                        </li>
                    </ul>
                </div>
                <button @click="toggleDarkMode" class="text-red-600 dark:text-red-200">
                    <i v-if="!isDarkMode" class="fas fa-sun"></i>
                    <i v-else class="fas fa-moon"></i>
                </button>
            </div>
        </div>
    </nav>
</template>

<script>
import {supportedLanguages} from '@/i18n';

export default {
    data() {
        return {
            languages: supportedLanguages,
            showDropdown: false,
            isDarkMode: false,
            isLoggedIn: localStorage.getItem('isLoggedIn') === 'true',
        };
    },
    methods: {
        changeLanguage(code) {
            this.$i18n.locale = code;
            this.showDropdown = false;
            localStorage.setItem('language', code);
        },
        toggleDarkMode() {
            this.isDarkMode = !this.isDarkMode;
            if (this.isDarkMode) {
                document.documentElement.classList.add('dark');
                localStorage.setItem('darkMode', 'true');
            } else {
                document.documentElement.classList.remove('dark');
                localStorage.removeItem('darkMode');
            }
        },
    },
    computed: {
        currentFlag() {
            const language = this.languages.find(lang => lang.code === this.$i18n.locale);
            return language ? language.flag : 'default';
        },
    },
    created() {
        if (localStorage.getItem('darkMode')) {
            this.isDarkMode = true;
            document.documentElement.classList.add('dark');
        }
        const savedLanguage = localStorage.getItem('language');
        if (savedLanguage) {
            this.$i18n.locale = savedLanguage;
        }
    }
}
</script>