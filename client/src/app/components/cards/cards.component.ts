import { Component, OnInit } from '@angular/core'

@Component({
    selector: 'app-cards',
    templateUrl: './cards.component.html',
    styleUrls: ['./cards.component.scss'],
})
export class CardsComponent implements OnInit {
    cards: any

    constructor() {}

    ngOnInit(): void {
        console.log('Hello cards')
    }
}
