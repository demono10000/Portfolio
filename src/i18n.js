import {createI18n} from 'vue-i18n';

const messages = {
    pl: {
        portfolio: 'Portfolio',
        contact: 'Kontakt',
        timeline_title: 'Ścieżka mojego rozwoju programistycznego',
    },
    en: {
        portfolio: 'Portfolio',
        contact: 'Contact',
        timeline_title: 'The path of my programming development',
    }
}

const i18n = createI18n({
    legacy: false,
    locale: 'pl',
    fallbackLocale: 'pl',
    messages,
})

export default i18n;

export const supportedLanguages = [
    {code: 'en', flag: 'us'},
    {code: 'pl', flag: 'pl'}
];