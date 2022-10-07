import { Component, OnInit } from '@angular/core'

@Component({
    selector: 'app-quests',
    templateUrl: './quests.component.html',
    styleUrls: ['./quests.component.scss'],
})
export class QuestsComponent implements OnInit {
    constructor() {}

    ngOnInit(): void {
        console.log('Hello Quests')
    }
}
