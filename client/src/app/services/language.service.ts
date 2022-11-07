import { Injectable } from '@angular/core'
import { TranslateService } from '@ngx-translate/core'

export const AVAILABLE_LANGS = ['de', 'fr', 'en']

export function initLanguageService(languageService: LanguageService) {
    return () => {
        console.log('initSynchronousFactory')
        languageService.initLang()
    }
}

const LANG_KEY = 'lang'

@Injectable({
    providedIn: 'root',
})
export class LanguageService {
    constructor(private translateService: TranslateService) {}

    initLang() {
        this.translateService.onLangChange.subscribe((lang) => {
            this.setLang(lang.lang)
        })

        const storedLang = this.getLang()
        if (storedLang) {
            this.translateService.use(storedLang)
        } else {
            const browserLang = this.translateService.getBrowserLang()
            if (browserLang && AVAILABLE_LANGS.indexOf(browserLang) >= 0) {
                this.translateService.use(browserLang)
            }
        }
    }

    setLang(lang: string) {
        return localStorage.setItem(LANG_KEY, lang)
    }

    getLang() {
        return localStorage.getItem(LANG_KEY)
    }
}
