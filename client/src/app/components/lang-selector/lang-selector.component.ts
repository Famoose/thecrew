import { Component } from '@angular/core'
import { TranslateService } from '@ngx-translate/core'

@Component({
    selector: 'app-lang-selector',
    templateUrl: './lang-selector.component.html',
    styleUrls: ['./lang-selector.component.scss'],
})
export class LangSelectorComponent {
    language = ''

    constructor(private translateService: TranslateService) {
        if (translateService.currentLang) {
            this.language = translateService.currentLang
        } else {
            if (translateService.defaultLang) {
                this.language = translateService.defaultLang
            }
        }
    }

    setLanguage() {
        if (this.language) {
            this.translateService.use(this.language)
        }
    }
}
