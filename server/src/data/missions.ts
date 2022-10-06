import { Quest, quests } from './quests'

export type TranslatedString = {
    de: string
    fr: string
    en: string
}

export type Mission = {
    _id: string
    name: TranslatedString
    level: number
    quests: (Quest | undefined)[]
}

export const missions: Mission[] = [
    {
        _id: 'roestigrabe',
        name: {
            de: 'Kampf im Röstigraben',
            fr: 'Combat dans le Röstigraben',
            en: 'Battle in the Rösti-Trench',
        },
        level: 1,
        quests: [quests[0], quests[1]],
    },
    {
        _id: 'referendum',
        name: {
            de: 'Referendum',
            fr: 'Référendum',
            en: 'Referendum',
        },
        level: 2,
        quests: [quests[2], quests[3], quests[4]],
    },
    {
        _id: 'eidgenossen',
        name: {
            de: 'Die 3 Eidgenossen',
            fr: 'Les 3 confédérés',
            en: 'The 3 confederates',
        },
        level: 3,
        quests: [quests[5], quests[6], quests[7], quests[8], quests[9]],
    },
]
