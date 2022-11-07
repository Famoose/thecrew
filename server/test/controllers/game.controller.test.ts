import { createMockData, createMocks } from '../mocks'
import { SessionService } from '../../src/services/session.service'
import { Namespace } from 'socket.io'
import { GameService } from '../../src/services/game.service'
import { createGameController } from '../../src/module/game/game.controller'
import { cards } from '../../src/data/cards'
import { quests } from '../../src/data/quests'
import { LobbyStatus } from '../../src/repositories/lobby.repository'
import { missions } from '../../src/data/missions'

describe('chat service tests', () => {
    let gameController: any
    let deps: {
        namespaceMock: Namespace
        sessionServiceMock: SessionService
        gameServiceMock: GameService
    }

    const mockData = createMockData()

    beforeEach(() => {
        deps = createMocks(mockData)
        gameController = createGameController(
            deps.namespaceMock,
            deps.sessionServiceMock,
            deps.gameServiceMock
        )
        gameController.handshake = { auth: { token: '1' } }
        gameController.join = jest.fn()
    })

    describe('getGame', () => {
        it('should get game', async () => {
            const gameId = '1'
            const callback = jest.fn()
            await gameController.getGame(gameId, callback)

            expect(deps.gameServiceMock.getGame).toHaveBeenCalledWith(
                gameId,
                mockData.session
            )
            expect(gameController.join).toHaveBeenCalledWith(gameId)
            expect(callback).toHaveBeenCalledWith(mockData.game)
        })
    })

    describe('playCard', () => {
        const session1 = { _id: '1', userID: '1' }
        const session2 = { _id: '2', userID: '2' }

        const groupMembers = [session1, session2]
        const lobby = <any>{
            _id: '1',
            group: {
                groupMembers,
            },
            minRequiredPlayer: 3,
            maxAllowedPlayer: 5,
            mission: missions[0],
            owner: session1,
            status: LobbyStatus.InGame,
        }
        const game = {
            _id: '1',
            questPlayers: [
                {
                    player: session1,
                    quest: quests[0],
                },
                {
                    player: session2,
                    quest: quests[1],
                },
            ],
            rounds: [],
            lobby,
        }
        mockData.game = game

        it('should play wrong card', async () => {
            deps.gameServiceMock.checkIfPlayerIsAllowedToPlayCard = jest.fn(
                () => false
            )

            const gameId = '1'
            const card = { _id: '1' }
            const callback = jest.fn()
            await gameController.playCard(gameId, card, callback)

            expect(deps.gameServiceMock.getGame).toHaveBeenCalledWith(
                gameId,
                mockData.session
            )
            expect(deps.gameServiceMock.getCurrentRound).toHaveBeenCalledWith(
                mockData.game
            )

            expect(callback).toHaveBeenCalledWith(false)
        })

        it('should play card', async () => {
            const gameId = '1'
            const card = { _id: '1' }
            const callback = jest.fn()
            await gameController.playCard(gameId, card, callback)

            expect(deps.gameServiceMock.getGame).toHaveBeenCalledWith(
                gameId,
                mockData.session
            )
            expect(deps.gameServiceMock.getCurrentRound).toHaveBeenCalledWith(
                mockData.game
            )
            expect(deps.gameServiceMock.updateGame).toHaveBeenCalledWith(
                mockData.game
            )
            expect(deps.namespaceMock.to).toHaveBeenCalledWith(gameId)
            expect(deps.namespaceMock.emit).toHaveBeenCalledWith(
                'game:onPlayedCard',
                mockData.game
            )

            expect(callback).toHaveBeenCalledWith(true)
        })

        it('should finish round', async () => {
            mockData.round = <any>{
                cardsPlayers: [
                    {
                        player: session1,
                        cards: [cards[12], cards[13]],
                    },
                    {
                        player: session2,
                        cards: [cards[12], cards[13]],
                    },
                ],
                nextPlayer: session1,
                moves: [
                    {
                        player: session1,
                        card: cards[12],
                    },
                ],
            }

            const gameId = '1'
            const card = { _id: '1' }
            const callback = jest.fn()
            await gameController.playCard(gameId, card, callback)

            expect(deps.gameServiceMock.getGame).toHaveBeenCalledWith(
                gameId,
                mockData.session
            )
            expect(deps.gameServiceMock.getCurrentRound).toHaveBeenCalledWith(
                mockData.game
            )
            expect(deps.gameServiceMock.updateGame).toHaveBeenCalledWith(
                mockData.game
            )
            expect(deps.gameServiceMock.findWinner).toHaveBeenCalledWith(
                mockData.round
            )
            expect(deps.namespaceMock.to).toHaveBeenCalledWith(gameId)
            expect(deps.namespaceMock.emit).toHaveBeenCalledWith(
                'game:onNewRound',
                mockData.game
            )

            expect(callback).toHaveBeenCalledWith(true)
        })

        it('should finish game', async () => {
            mockData.round = <any>{
                cardsPlayers: [
                    {
                        player: session1,
                        cards: [cards[12]],
                    },
                    {
                        player: session2,
                        cards: [cards[12]],
                    },
                ],
                nextPlayer: session1,
                moves: [
                    {
                        player: session1,
                        card: cards[11],
                    },
                ],
            }

            const gameId = '1'
            const card = { _id: '1' }
            const callback = jest.fn()
            await gameController.playCard(gameId, card, callback)

            expect(deps.gameServiceMock.getGame).toHaveBeenCalledWith(
                gameId,
                mockData.session
            )
            expect(deps.gameServiceMock.getCurrentRound).toHaveBeenCalledWith(
                mockData.game
            )
            expect(deps.gameServiceMock.findWinner).toHaveBeenCalledWith(
                mockData.round
            )
            expect(deps.gameServiceMock.endGame).toHaveBeenCalledWith(
                mockData.game
            )
            expect(deps.namespaceMock.to).toHaveBeenCalledWith(gameId)
            expect(deps.namespaceMock.emit).toHaveBeenCalledWith(
                'game:onEndGame',
                mockData.game
            )

            expect(callback).toHaveBeenCalledWith(true)
        })
    })
})
