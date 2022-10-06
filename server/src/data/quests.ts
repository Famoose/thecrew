import { TranslatedString } from './missions'
import { Game } from '../repositories/game.repository'

export type Quest = {
    _id: string
    name: TranslatedString
    points: { [key: number]: number }
    questFulfilled?: (game: Game) => boolean
}

export const quests: Quest[] = [
    {
        _id: '1',
        name: {
            de: 'Ich gewinne 1,2 und 3 blau.',
            fr: 'Je gagne 1,2 et 3 bleu.',
            en: 'I win 1,2 and 3 blue.',
        },
        points: {
            3: 2,
            4: 3,
            5: 3,
        },
        // questFulfilled: (gameState: GameState, player: Player) => {
        //     gameState.player.cards.
        //     return true;
        //     return false;
        // }
    },
    {
        _id: '2',
        name: {
            de: 'Ich gewinne die gelbe 9 und blaue 7.',
            fr: 'Je gagne le 9 jaune et le 7 bleu.',
            en: 'I win the yellow 9 and the blue 7.',
        },
        points: {
            3: 2,
            4: 3,
            5: 3,
        },
        // questFulfilled: (gameState: GameState, player: Player) => {
        //     gameState.player.cards.
        //     return true;
        //     return false;
        // }
    },
    {
        _id: '3',
        name: {
            de: 'Ich gewinne genau einen Stich.',
            fr: 'Je gagne exactement un pli.',
            en: 'I win exactly one trick.',
        },
        points: {
            3: 3,
            4: 2,
            5: 2,
        },
        // questFulfilled: (gameState: GameState, player: Player) => {
        //     gameState.player.cards.
        //     return true;
        //     return false;
        // }
    },
    {
        _id: '4',
        name: {
            de: 'Ich gewinne keine gelben Karten.',
            fr: 'Je ne gagne aucune carte jaune.',
            en: 'I do not win any yellow cards.',
        },
        points: {
            3: 2,
            4: 2,
            5: 2,
        },
        // questFulfilled: (gameState: GameState, player: Player) => {
        //     gameState.player.cards.
        //     return true;
        //     return false;
        // }
    },
    {
        _id: '5',
        name: {
            de: 'Ich gewinne keine 5.',
            fr: 'Je ne gagne aucun 5.',
            en: 'I do not win a 5.',
        },
        points: {
            3: 3,
            4: 4,
            5: 5,
        },
        // questFulfilled: (gameState: GameState, player: Player) => {
        //     gameState.player.cards.
        //     return true;
        //     return false;
        // }
    },
    {
        _id: '6',
        name: {
            de: 'Ich gewinne mindestens 5 rote Karten.',
            fr: 'Je gagne au moins 5 cartes rouges.',
            en: 'I win at least 5 red cards.',
        },
        points: {
            3: 2,
            4: 3,
            5: 3,
        },
        // questFulfilled: (gameState: GameState, player: Player) => {
        //     gameState.player.cards.
        //     return true;
        //     return false;
        // }
    },
    {
        _id: '7',
        name: {
            de: 'Ich gewinne mehr rote als grüne Karten (0 grüne Karten erlaubt).',
            fr: 'Je gagne plus de cartes rouges que vertes (0 cartes vertes permis).',
            en: 'I win more red than green cards (0 green cards allowed).',
        },
        points: {
            3: 1,
            4: 1,
            5: 1,
        },
        // questFulfilled: (gameState: GameState, player: Player) => {
        //     gameState.player.cards.
        //     return true;
        //     return false;
        // }
    },
    {
        _id: '8',
        name: {
            de: 'Ich gewinne einen Stich, der nur ungerade Kartenwerte enthält.',
            fr: 'Je gagne un pli qui contient que des valeurs de cartes impaires.',
            en: 'I win a trick that contains only odd card values.',
        },
        points: {
            3: 2,
            4: 4,
            5: 5,
        },
        // questFulfilled: (gameState: GameState, player: Player) => {
        //     gameState.player.cards.
        //     return true;
        //     return false;
        // }
    },
    {
        _id: '9',
        name: {
            de: 'Ich gewinne keine 9.',
            fr: 'Je ne gagne aucun 9.',
            en: 'I do not win a 9.',
        },
        points: {
            3: 1,
            4: 1,
            5: 1,
        },
        // questFulfilled: (gameState: GameState, player: Player) => {
        //     gameState.player.cards.
        //     return true;
        //     return false;
        // }
    },
]
