import {
    EntitySubscriberInterface,
    EventSubscriber,
    UpdateEvent,
} from "typeorm";
import { Offer } from "../entities";
import { OfferStatus } from "../types/offer";

@EventSubscriber()
export class OfferSubscriber implements EntitySubscriberInterface {
    listenTo() {
        return Offer;
    }

    async afterUpdate(event: UpdateEvent<Offer>): Promise<void> {
        const loaders = Offer.loaders;
        const beforeUpdate = event.databaseEntity;
        const afterUpdate = event.entity;
        if (
            beforeUpdate.status !== OfferStatus.ACCEPTED &&
            afterUpdate.status === OfferStatus.ACCEPTED
        ) {
            const request = await loaders.staffRequest.load(
                afterUpdate.requestId
            );
            const requestedSession = await loaders.session.load(
                request.sessionId
            );
            const offeredSession = await loaders.session.load(
                afterUpdate.acceptedSessionId
            );
            const requester = await loaders.user.load(request.requesterId);
            const offerer = await loaders.user.load(afterUpdate.userId);
            await requestedSession.allocate(offerer);
            await offeredSession.allocate(requester);
            await requestedSession.deallocate(requester);
            await offeredSession.deallocate(offerer);
        }
    }
}
