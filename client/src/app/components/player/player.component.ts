import { Component, OnInit } from '@angular/core'

@Component({
    selector: 'app-player',
    templateUrl: './player.component.html',
    styleUrls: ['./player.component.scss'],
})
export class PlayerComponent implements OnInit {
    playerColor: string = 'ORANGE'

    constructor() {}

    ngOnInit(): void {
        console.log('Hello Player')
    }
}
