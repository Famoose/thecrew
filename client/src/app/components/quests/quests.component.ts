import { Component, Input, OnInit } from '@angular/core'
import { Quest, quests } from 'src/staticData'
import { Game, Session } from 'src/types'

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

    isQuestFulfilled(quest: Quest, player: Session) {
        const staticQuest = quests.find((q) => q._id === quest._id)
        if (staticQuest && this.game) {
            return staticQuest.questFulfilled(this.game, player)
        }
        return false
    }
}
