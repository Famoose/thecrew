import { Directive, ElementRef, Input, OnDestroy, OnInit } from '@angular/core'
import { TranslateService } from '@ngx-translate/core'
import { TranslatedString } from 'src/staticData'
import { Subscription } from 'rxjs'

@Directive({
    selector: '[appDataLang]',
})
export class DataLangDirective implements OnInit, OnDestroy {
    @Input() appDataLang: TranslatedString | undefined
    private translationSubscription: Subscription | undefined

    constructor(
        private el: ElementRef,
        private translateService: TranslateService
    ) {}

    ngOnInit(): void {
        this.translationSubscription =
            this.translateService.onLangChange.subscribe(() => {
                this.setInnerHtml()
            })
        this.setInnerHtml()
    }

    setInnerHtml() {
        if (this.appDataLang) {
            // @ts-ignore
            this.el.nativeElement.innerText =
                this.appDataLang[this.translateService.currentLang]
        }
    }

    ngOnDestroy(): void {
        if (this.translationSubscription) {
            this.translationSubscription.unsubscribe()
        }
    }
}
