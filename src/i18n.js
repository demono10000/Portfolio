import {createI18n} from 'vue-i18n';

const messages = {
    pl: {

    },
    en: {

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