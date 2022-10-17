import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core'
import { Card } from 'src/staticData'

@Component({
    selector: 'app-cards',
    templateUrl: './cards.component.html',
    styleUrls: ['./cards.component.scss'],
})
export class CardsComponent implements OnInit {
    @Input() cards: Card[] | undefined
    @Output() cardClick = new EventEmitter<Card>()

    constructor() {}

    ngOnInit(): void {
        console.log('Hello cards')
    }

    cardClicked($event: Card) {
        this.cardClick.emit($event)
    }
}
