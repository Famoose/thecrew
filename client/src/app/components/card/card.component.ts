import { Component, Input, OnInit } from '@angular/core'
import { Card } from 'src/staticData'

@Component({
    selector: 'app-card',
    templateUrl: './card.component.html',
    styleUrls: ['./card.component.scss'],
})
export class CardComponent implements OnInit {
    @Input() card: Card | undefined
    constructor() {}

    ngOnInit(): void {
        console.log('Hello World')
    }

    onCardClick(card: Card) {
        console.log(card.color, card.value, card.type)
    }
}
