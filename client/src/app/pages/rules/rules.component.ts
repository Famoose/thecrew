import { Component } from '@angular/core'
import { Location } from '@angular/common'

@Component({
    selector: 'app-rules',
    templateUrl: './rules.component.html',
    styleUrls: ['./rules.component.scss'],
})
export class RulesComponent {
    constructor(private location: Location) {}

    back(): void {
        this.location.back()
    }
}
