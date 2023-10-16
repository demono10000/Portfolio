<template>
    <div class="bg-white dark:bg-gray-900 p-6 rounded-lg shadow-md">
        <h1 class="text-4xl font-bold mb-8 text-gray-900 dark:text-gray-100">{{ $t('timeline_title') }}</h1>
        <div v-for="year in years" :key="year.year" class="mb-8">
            <h2 class="text-3xl font-semibold mb-4 text-gray-700 dark:text-gray-200 cursor-pointer"
                @click="toggleYearContent(year.year)">{{ year.year }}
                <span v-if="isYearExpanded(year.year)">▽</span>
                <span v-else>▷</span>
            </h2>
            <div v-for="event in year.events" :key="event.title" class="mb-4 pl-4 border-l-4 border-red-600">
                <h3 class="text-xl font-medium mb-2 text-gray-800 dark:text-gray-200">{{ event.title }}</h3>
                <div v-if="isYearExpanded(year.year)">
                    <div v-for="(content, index) in event.contents" :key="index">
                        <p v-if="content.type === 'text'" class="text-gray-700 dark:text-gray-300 mb-2">{{
                            content.value
                            }}</p>

                        <img v-if="content.type === 'image'" :src="content.src" alt="image" class="w-full mb-2">

                        <video v-if="content.type === 'video'" controls class="w-full mb-2">
                            <source :src="content.src" type="video/mp4">
                        </video>

                        <a v-if="content.type === 'link'" :href="content.src"
                           class="underline text-blue-600 dark:text-blue-400 mb-2"
                           target="_blank">{{ content.label }}</a>

                        <a v-if="content.type === 'file'" :href="content.src" download
                           class="underline text-blue-600 dark:text-blue-400 mb-2">
                            {{ content.label }}</a>

                        <iframe v-if="content.type === 'youtube-video'"
                                :src="'https://www.youtube.com/embed/' + content.videoId"
                                class="youtube-frame mb-2 w-full" height="500"></iframe>

                        <iframe v-if="content.type === 'youtube-playlist'"
                                :src="'https://www.youtube.com/embed/videoseries?list=' + content.playlistId"
                                class="youtube-frame mb-2 w-full" height="500"></iframe>

                        <a v-if="content.type === 'github-repo'" :href="content.url"
                           class="github-link mb-2 text-gray-900 dark:text-gray-100"
                           target="_blank">
                            <i class="fab fa-github"></i> GitHub
                        </a>

                        <a v-if="content.type === 'google-play'" :href="content.url"
                           class="google-play-link mb-2 text-gray-900 dark:text-gray-100" target="_blank">
                            <i class="fab fa-google-play"></i> Google Play
                        </a>

                        <iframe v-if="content.type === 'facebook-video'"
                                :src="'https://www.facebook.com/plugins/video.php?href=' + encodeURIComponent(content.url)"
                                class="facebook-frame mb-2 w-full" height="500"></iframe>

                        <pre v-if="content.type === 'code'"><code>{{ content.value }}</code></pre>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
import appInventorImage from '/images/appinvertor.png';
import skriptsImage from '/images/skripts.png';
import cpp1Image from '/images/suma.png';
import cpp2Image from '/images/srednia.png';
import cpp3Image from '/images/trojkat.png';

import hljs from 'highlight.js';
import 'highlight.js/styles/default.css';

export default {
    data() {
        return {
            years: [],
            expandedYears: [],
        };
    },
    created() {
        this.years = this.getTimelineData();
        this.expandedYears = this.years.map(y => y.year);
    },
    mounted() {
        this.$nextTick(() => {
            this.highlightCode();
        });
    },
    watch: {
        years() {
            this.highlightCode();
        }
    },
    methods: {
        highlightCode() {
            this.$el.querySelectorAll('pre code').forEach((block) => {
                hljs.highlightBlock(block);
            });
        },
        toggleYearContent(year) {
            if (this.isYearExpanded(year)) {
                this.expandedYears = this.expandedYears.filter(y => y !== year);
            } else {
                this.expandedYears.push(year);
            }
            this.$nextTick(() => {
                this.highlightCode();
            });
        },
        isYearExpanded(year) {
            return this.expandedYears.includes(year);
        },
        getTimelineData() {
            return [
                {
                    year: 2013,
                    events: [
                        {
                            title: this.$t('timeline_2013_1'),
                            contents: [
                                {
                                    type: 'text',
                                    value: this.$t('timeline_2013_1_1')
                                },
                                {
                                    type: 'link',
                                    src: 'https://appinventor.mit.edu/',
                                    label: this.$t('timeline_2013_1_2')
                                },
                                {
                                    type: 'image',
                                    src: appInventorImage,
                                    label: this.$t('timeline_2013_1_3')
                                }
                            ]
                        }
                    ]
                },
                {
                    year: 2014,
                    events: [
                        {
                            title: this.$t('timeline_2014_1'),
                            contents: [
                                {
                                    type: 'text',
                                    value: this.$t('timeline_2014_1_1')
                                },
                                {
                                    type: 'code',
                                    value: 'on rightclick with tnt:\n' +
                                        '    player has tnt\n' +
                                        '    remove 1 tnt from player\n' +
                                        '\tcancel event\n' +
                                        '    shoot tnt from player with speed 0.4\n' +
                                        '\n' +
                                        'on place of tnt:\n' +
                                        '    set block to air',
                                },
                                {
                                    type: 'file',
                                    src: '/files/DC_TNT_BY_T10.sk',
                                    label: this.$t('timeline_2014_1_2')
                                },
                                {
                                    type: 'text',
                                    value: this.$t('timeline_2014_1_3')
                                },
                                {
                                    type: 'file',
                                    src: '/files/gold nugget.sk',
                                    label: this.$t('timeline_2014_1_4')
                                },
                                {
                                    type: 'file',
                                    src: '/files/pomoc.sk',
                                    label: this.$t('timeline_2014_1_5')
                                },
                                {
                                    type: 'image',
                                    src: skriptsImage,
                                    label: this.$t('timeline_2013_1_6')
                                },
                                {
                                    type: 'text',
                                    value: this.$t('timeline_2014_1_7')
                                },
                                {
                                    type: 'youtube-playlist',
                                    playlistId: 'PL2bINJOuXUsiweFwXwHBjr6UHjvhuUbkn',
                                },
                                {
                                    type: 'text',
                                    value: this.$t('timeline_2014_1_8')
                                },
                                {
                                    type: 'youtube-video',
                                    videoId: 'OwjlJDu6V6c',
                                },
                            ]
                        }
                    ]
                },
                {
                    year: 2016,
                    events: [
                        {
                            title: this.$t('timeline_2016_1'),
                            contents: [
                                {
                                    type: 'text',
                                    value: this.$t('timeline_2016_1_1')
                                },
                                {
                                    type: 'youtube-playlist',
                                    playlistId: 'PLOYHgt8dIdoxx0Y5wzs7CFpmBzb40PaDo',
                                },
                                {
                                    type: 'text',
                                    value: this.$t('timeline_2016_1_2')
                                },
                                {
                                    type: 'code',
                                    value: '#include <iostream>\n' +
                                        '\n' +
                                        'using namespace std;\n' +
                                        '\n' +
                                        'int main()\n' +
                                        '{\n' +
                                        '    int a,b,sum;\n' +
                                        '    cout << "napisz liczbe\\n";\n' +
                                        '    cin >> a;\n' +
                                        '    cout << "napisz liczbe\\n";\n' +
                                        '    cin >> b;\n' +
                                        '    sum = a+b;\n' +
                                        '    cout << "suma: "<<sum<<"\\n";\n' +
                                        '    return 0;\n' +
                                        '}'
                                },
                                {
                                    type: 'file',
                                    src: '/files/SoloLearn/main.cpp',
                                    label: this.$t('timeline_2016_1_3')
                                },
                                {
                                    type: 'image',
                                    src: cpp1Image,
                                    label: this.$t('timeline_2016_1_4')
                                },
                                {
                                    type: 'code',
                                    value: '#include <iostream>\n' +
                                        '\n' +
                                        'using namespace std;\n' +
                                        '\n' +
                                        'float a,b,c,d,e,sr,nbsr,bl;\n' +
                                        '\n' +
                                        'int main()\n' +
                                        '{\n' +
                                        '    cout << "Podaj 5 liczb: ";\n' +
                                        '    cin>>a>>b>>c>>d>>e;\n' +
                                        '    sr=(a+b+c+d+e)/5;\n' +
                                        '    nbsr=a;\n' +
                                        '    bl=sr-b;\n' +
                                        '    if(bl<0) bl=bl*-1;\n' +
                                        '    if(bl<(sr-nbsr)) nbsr=b;\n' +
                                        '    bl=sr-c;\n' +
                                        '    if(bl<0) bl=bl*-1;\n' +
                                        '    if(bl<(sr-nbsr)) nbsr=c;\n' +
                                        '    bl=sr-d;\n' +
                                        '    if(bl<0) bl=bl*-1;\n' +
                                        '    if(bl<(sr-nbsr)) nbsr=d;\n' +
                                        '    bl=sr-e;\n' +
                                        '    if(bl<0) bl=bl*-1;\n' +
                                        '    if(bl<(sr-nbsr)) nbsr=e;\n' +
                                        '    cout<<"srednia: "<<sr;\n' +
                                        '    cout<<"\\nnajblizej: "<<nbsr;\n' +
                                        '    return 0;\n' +
                                        '}'
                                },
                                {
                                    type: 'file',
                                    src: '/files/srednia/main.cpp',
                                    label: this.$t('timeline_2016_1_3')
                                },
                                {
                                    type: 'image',
                                    src: cpp2Image,
                                    label: this.$t('timeline_2016_1_4')
                                },
                                {
                                    type: 'code',
                                    value: '#include <iostream>\n' +
                                        '\n' +
                                        'using namespace std;\n' +
                                        '\n' +
                                        'int main()\n' +
                                        '{\n' +
                                        '    int a,b,c;\n' +
                                        '    cout << "Podaj pierwszy bok: " << endl;\n' +
                                        '    cin >> a;\n' +
                                        '    cout << "Podaj drugi bok: " << endl;\n' +
                                        '    cin >> b;\n' +
                                        '    cout << "Podaj trzeci bok: " << endl;\n' +
                                        '    cin >> b;\n' +
                                        '    if(a + b > c){\n' +
                                        '        if(a + c > b){\n' +
                                        '            if(c + b > a){\n' +
                                        '                cout << "Ten trojkat jest poprawny";\n' +
                                        '            } else {\n' +
                                        '                cout << "Ten trojkat nie jest poprawny";\n' +
                                        '            }\n' +
                                        '        } else {\n' +
                                        '                cout << "Ten trojkat nie jest poprawny";\n' +
                                        '            }\n' +
                                        '    } else {\n' +
                                        '                cout << "Ten trojkat nie jest poprawny";\n' +
                                        '            }\n' +
                                        '    return 0;\n' +
                                        '}'
                                },
                                {
                                    type: 'file',
                                    src: '/files/trojkat/main.cpp',
                                    label: this.$t('timeline_2016_1_3')
                                },
                                {
                                    type: 'image',
                                    src: cpp3Image,
                                    label: this.$t('timeline_2016_1_4')
                                },
                            ]
                        }
                    ]
                },
                {
                    year: 2017,
                    events: [
                        {
                            title: this.$t('timeline_2017_1'),
                            contents: [
                                {
                                    type: 'file',
                                    src: '/files/strona 2017.zip',
                                    label: this.$t('timeline_2017_1_1')
                                },
                            ]
                        },
                        {
                            title: this.$t('timeline_2017_2'),
                            contents: [
                                {
                                    type: 'text',
                                    value: this.$t('timeline_2017_2_1')
                                },
                                {
                                    type: 'youtube-playlist',
                                    playlistId: 'PL2bINJOuXUshVvN29a-GpdLytHXPYru1F',
                                },
                                {
                                    type: 'text',
                                    value: this.$t('timeline_2017_2_2')
                                },
                                {
                                    type: 'youtube-playlist',
                                    playlistId: 'PL2bINJOuXUsgudRg5VHIofC_zodwR-kIa',
                                },
                            ]
                        },
                        {
                            title: this.$t('timeline_2017_3'),
                            contents: [
                                {
                                    type: 'text',
                                    value: this.$t('timeline_2017_3_1')
                                },
                                {
                                    type: 'google-play',
                                    url: "https://play.google.com/store/apps/details?id=com.demono10000.pawel.kolkoikrzyzyk"
                                },
                                {
                                    type: 'text',
                                    value: this.$t('timeline_2017_3_2')
                                },
                                {
                                    type: 'google-play',
                                    url: "https://play.google.com/store/apps/details?id=com.demono10000.pawel.pomocnikoptyka"
                                },
                            ]
                        }
                    ]
                },
                {
                    year: 2018,
                    events: [
                        {
                            title: this.$t('timeline_2018_1'),
                            contents: [
                                {
                                    type: 'text',
                                    value: this.$t('timeline_2018_1_1')
                                },
                                {
                                    type: 'google-play',
                                    url: "https://play.google.com/store/apps/details?id=pl.demono10000.Color_track"
                                },
                            ]
                        },
                    ]
                },
                {
                    year: 2019,
                    events: [
                        {
                            title: this.$t('timeline_2019_1'),
                            contents: [
                                {
                                    type: 'text',
                                    value: this.$t('timeline_2019_1_1')
                                },
                                {
                                    type: 'text',
                                    value: this.$t('timeline_2019_1_2')
                                },
                                {
                                    type: 'github-repo',
                                    url: 'https://github.com/demono10000/CobotZWindami',
                                },
                                {
                                    type: 'text',
                                    value: this.$t('timeline_2019_1_3')
                                },
                                {
                                    type: 'github-repo',
                                    url: 'https://github.com/demono10000/Projekt-sklep',
                                },
                            ]
                        },
                        {
                            title: this.$t('timeline_2019_2'),
                            contents: [
                                {
                                    type: 'text',
                                    value: this.$t('timeline_2019_2_1')
                                },
                                {
                                    type: 'youtube-video',
                                    videoId: 'z9iDypC3OcE',
                                },
                                {
                                    type: 'text',
                                    value: this.$t('timeline_2019_2_2')
                                },
                                {
                                    type: 'youtube-video',
                                    videoId: 'XuAw4IDy_0A',
                                },
                            ]
                        },
                        {
                            title: this.$t('timeline_2019_3'),
                            contents: [
                                {
                                    type: 'link',
                                    src: 'https://drive.google.com/file/d/1A1OjFYrp-KQBp5oEkT3xTwU6dyqipn5m/view',
                                    label: this.$t('timeline_2019_3_1')
                                }
                            ]
                        },
                        {
                            title: this.$t('timeline_2019_4'),
                            contents: [
                                {
                                    type: 'link',
                                    src: 'https://drive.google.com/file/d/1LHoJEO2DGMmOL126WEnvH1KfajeFU127/view',
                                    label: this.$t('timeline_2019_4_1')
                                }
                            ]
                        },
                        {
                            title: this.$t('timeline_2019_5'),
                            contents: [
                                {
                                    type: 'link',
                                    src: 'https://demono10000.pl/certificates/gamejam2019',
                                    label: this.$t('timeline_2019_4_1')
                                }
                            ]
                        },
                    ]
                },
                {
                    year: 2020,
                    events: [
                        {
                            title: this.$t('timeline_2020_1'),
                            contents: [
                            ]
                        },
                        {
                            title: this.$t('timeline_2020_2'),
                            contents: [
                                {
                                    type: 'link',
                                    src: 'https://photos.google.com/share/AF1QipNM21dbNLkxlkB3fHeoE7RdrndSTloLx33ey2Vb557aeAXLyj0vkZYcyo2Gj95vBg/photo/AF1QipP_Oe3BU3R5J6S7IkOkfyVmp1gn4rhvXSxH4J_Z?key=cmwzNUl2LXZIV1NZMkZtbV9sUXFjaWpZaDZoYTRR',
                                    label: this.$t('timeline_2020_2_1')
                                },
                                {
                                    type: 'link',
                                    src: 'https://fb.watch/mRF_KzhroQ/',
                                    label: this.$t('timeline_2020_2_2')
                                },
                                {
                                    type: 'facebook-video',
                                    url: 'https://fb.watch/mRF_KzhroQ/',
                                },
                                {
                                    type: 'link',
                                    src: 'https://fb.watch/mRG1VdI2gw/',
                                    label: this.$t('timeline_2020_2_3')
                                },
                                {
                                    type: 'facebook-video',
                                    url: 'https://fb.watch/mRG1VdI2gw/',
                                },
                                {
                                    type: 'link',
                                    src: 'https://fb.watch/mRG3BklfH6/',
                                    label: this.$t('timeline_2020_2_4')
                                },
                                {
                                    type: 'link',
                                    src: 'https://fb.watch/mRGwSBJ0Jq/',
                                    label: this.$t('timeline_2020_2_5')
                                },
                            ]
                        },
                        {
                            title: this.$t('timeline_2020_3'),
                            contents: [
                                {
                                    type: 'link',
                                    src: 'https://demono10000.itch.io/zego-diabli-nie-bior',
                                    label: this.$t('timeline_2020_3_1')
                                },
                            ]
                        },
                    ]
                },
                {
                    year: 2021,
                    events: [
                        {
                            title: this.$t('timeline_2021_1'),
                            contents: [
                                {
                                    type: 'text',
                                    value: this.$t('timeline_2021_1_1')
                                },
                            ]
                        },
                        {
                            title: this.$t('timeline_2021_2'),
                            contents: [
                                {
                                    type: 'text',
                                    value: this.$t('timeline_2021_2_1')
                                },
                            ]
                        },
                        {
                            title: this.$t('timeline_2021_3'),
                            contents: [
                                {
                                    type: 'link',
                                    label: this.$t('timeline_2021_3_1'),
                                    src: 'https://www.facebook.com/bmoptik/posts/4822818431070150',
                                },
                                {
                                    type: 'link',
                                    src: 'https://fb.watch/mRGi_nhUrM/',
                                    label: this.$t('timeline_2021_3_2')
                                },
                                {
                                    type: 'youtube-video',
                                    videoId: 'pvqVaazWfAw',
                                },
                                {
                                    type: 'link',
                                    src: 'https://photos.google.com/share/AF1QipPWn16E7LpfUc5bcNauX_f55bUtOCnPHfgEhSR_ffK-g2lIu580avOapQgmzRkhdw/photo/AF1QipORjXYpY3Ejs-rUDCiWyYV_PmZ8F3ascwzhYGF_?key=Wjh0RG8wMTRpYm9uWlowbzVSN2s3WEpMTGhKR3Nn',
                                    label: this.$t('timeline_2021_3_3')
                                },
                            ]
                        },
                        {
                            title: this.$t('timeline_2021_4'),
                            contents: [
                                {
                                    type: 'youtube-video',
                                    videoId: 'jVaea1pQkd4',
                                },
                            ]
                        },
                    ]
                },
                {
                    year: 2022,
                    events: [
                        {
                            title: this.$t('timeline_2022_1'),
                            contents: [
                            ]
                        },
                        {
                            title: this.$t('timeline_2022_2'),
                            contents: [
                                {
                                    type: 'text',
                                    value: this.$t('timeline_2022_2_1')
                                },
                                {
                                    type: 'github-repo',
                                    url: 'https://github.com/demono10000/Projekt-sklep',
                                }
                            ]
                        },
                        {
                            title: this.$t('timeline_2022_3'),
                            contents: [
                                {
                                    type: 'link',
                                    src: 'https://user17359.itch.io/stargazing',
                                    label: this.$t('timeline_2022_3_1')
                                },
                                {
                                    type: 'link',
                                    src: 'https://drive.google.com/file/d/1wgpsoW3bGQhUsUTVoRFrpOxH4hC44CMO/view',
                                    label: this.$t('timeline_2022_3_2')
                                },
                            ]
                        },
                        {
                            title: this.$t('timeline_2022_4'),
                            contents: [
                                {
                                    type: 'link',
                                    src: 'https://drive.google.com/file/d/1NgWIeLHFIk9aswd9TuPN4xLqbBMYoVGT/view',
                                    label: this.$t('timeline_2022_4_1')
                                },
                            ]
                        },
                    ]
                },
                {
                    year: 2023,
                    events: [
                        {
                            title: this.$t('timeline_2023_1'),
                            contents: [
                                {
                                    type: 'text',
                                    value: this.$t('timeline_2023_1_1')
                                },
                                {
                                    type: 'github-repo',
                                    url: 'https://github.com/demono10000/KolokwiumZero',
                                }
                            ]
                        },
                        {
                            title: this.$t('timeline_2023_2'),
                            contents: [
                                {
                                    type: 'text',
                                    value: this.$t('timeline_2023_2_1')
                                },
                                {
                                    type: 'github-repo',
                                    url: 'https://github.com/demono10000/WhenCanWeMeet-Backend',
                                }
                            ]
                        },
                        {
                            title: this.$t('timeline_2023_3'),
                            contents: [
                                {
                                    type: 'text',
                                    value: this.$t('timeline_2023_3_1')
                                },
                                {
                                    type: 'github-repo',
                                    url: 'https://github.com/demono10000/whencanwemeet-frontend',
                                },
                                {
                                    type: 'text',
                                    value: this.$t('timeline_2023_3_2')
                                },
                                {
                                    type: 'github-repo',
                                    url: 'https://github.com/demono10000/odczyt-danych-BD-electron',
                                },
                                {
                                    type: 'text',
                                    value: this.$t('timeline_2023_3_3')
                                },
                                {
                                    type: 'github-repo',
                                    url: 'https://github.com/demono10000/Portfolio',
                                }
                            ]
                        },
                        {
                            title: this.$t('timeline_2023_4'),
                            contents: [
                                {
                                    type: 'text',
                                    value: this.$t('timeline_2023_4_1')
                                },
                                {
                                    type: 'github-repo',
                                    url: 'https://github.com/demono10000/odczyt-danych-BD-electron',
                                }
                            ]
                        },
                        {
                            title: this.$t('timeline_2023_5'),
                            contents: [
                                {
                                    type: 'text',
                                    value: this.$t('timeline_2023_5_1')
                                },
                                {
                                    type: 'github-repo',
                                    url: 'https://github.com/demono10000/odczyt-danych-BD-electron',
                                }
                            ]
                        },
                        {
                            title: this.$t('timeline_2023_6'),
                            contents: [
                                {
                                    type: 'text',
                                    value: this.$t('timeline_2023_6_1')
                                },
                                {
                                    type: 'github-repo',
                                    url: 'https://github.com/demono10000/braki_soczewek',
                                },
                                {
                                    type: 'text',
                                    value: this.$t('timeline_2023_6_2')
                                },
                                {
                                    type: 'github-repo',
                                    url: 'https://github.com/MonkeyEurobusiness/NoktoNokto',
                                },
                                {
                                    type: 'text',
                                    value: this.$t('timeline_2023_6_3')
                                },
                                {
                                    type: 'github-repo',
                                    url: 'https://github.com/demono10000/vr_camera_viewer',
                                }
                            ]
                        },
                        {
                            title: this.$t('timeline_2023_7'),
                            contents: [
                                {
                                    type: 'link',
                                    src: 'https://demono10000.pl/certificates/photos/hackyeah2023.pdf',
                                    label: this.$t('timeline_2023_7_1')
                                },
                                {
                                    type: 'github-repo',
                                    url: 'https://github.com/MonkeyEurobusiness',
                                },
                                {
                                    type: 'link',
                                    src: 'https://challengerocket.com/hackyeah-2023/works/noktowizor-769c68#go-pagecontent',
                                    label: this.$t('timeline_2023_7_2')
                                },
                                {
                                    type: 'youtube-video',
                                    videoId: 'at7yDR7tKWk',
                                },
                            ]
                        },
                        {
                            title: this.$t('timeline_2023_8'),
                            contents: [
                                {
                                    type: 'link',
                                    src: '/files/nasa2023.pdf',
                                    label: this.$t('timeline_2023_8_1')
                                },
                                {
                                    type: 'github-repo',
                                    url: 'https://github.com/orgs/Cosmic-Capybaras/repositories',
                                },
                                {
                                    type: 'link',
                                    src: 'https://www.spaceappschallenge.org/2023/find-a-team/cosmic-capybaras1/?tab=project',
                                    label: this.$t('timeline_2023_8_2')
                                },
                                {
                                    type: 'youtube-video',
                                    videoId: 'UXfRsnYP26E',
                                },
                            ]
                        },
                    ]
                },
            ];
        }
    }
}


</script>
