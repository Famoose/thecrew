import { Component, Input, OnInit } from '@angular/core'
import { Card } from 'src/staticData'

@Component({
    selector: 'app-cards',
    templateUrl: './cards.component.html',
    styleUrls: ['./cards.component.scss'],
})
export class CardsComponent implements OnInit {
    @Input() cards: Card[] | undefined

    constructor() {}

    ngOnInit(): void {
        console.log('Hello cards')
    }
}
