import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core'
import { Card } from 'src/staticData'

@Component({
    selector: 'app-card',
    templateUrl: './card.component.html',
    styleUrls: ['./card.component.scss'],
})
export class CardComponent {
    @Input() card: Card | undefined
    @Output() cardClick = new EventEmitter<Card>()
    constructor() {}

    cardClicked(card: Card) {
        console.log(card.color, card.value, card.type)
        this.cardClick.emit(card)
    }
}
