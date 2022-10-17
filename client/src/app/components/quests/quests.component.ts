import { Component, Input, OnInit } from '@angular/core'
import { Game } from 'src/types'

@Component({
    selector: 'app-quests',
    templateUrl: './quests.component.html',
    styleUrls: ['./quests.component.scss'],
})
export class QuestsComponent {
    @Input() game: Game | undefined
    collapsed = false

    toggleQuestWindow() {
        this.collapsed = !this.collapsed
    }
}
