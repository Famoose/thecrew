export enum Color {
    YELLOW = 'YELLOW',
    GREEN = 'GREEN',
    BLUE = 'BLUE',
    RED = 'RED',
}

export enum CardType {
    NORMAL = 'NORMAL',
    TRUMP = 'TRUMP',
}

export const cards = [
    {
        value: 1,
        color: Color.YELLOW,
        type: CardType.NORMAL,
    },
]
