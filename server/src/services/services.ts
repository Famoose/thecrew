import { createSessionService, SessionService } from './session.service'
import { Repositories } from '../repositories/repositories'
export type Services = {
    sessionService: SessionService
}
export const createServices = (repositories: Repositories): Services => {
    const sessionService = createSessionService(repositories.sessionRepository)
    return { sessionService }
}
