import React from "react";
import { OfferItem } from "../../../components/requests/offers/OfferItem";
import { OfferResponse } from "../../../types/requests";

type Props = {
    offer: OfferResponse;
};

export const OfferItemContainer: React.FC<Props> = (props: Props) => {
    // placeholder
    const deleteOffer = (offerId: number) => {
        console.log("delete offer");
    };

    return <OfferItem offer={props.offer} deleteOffer={deleteOffer} />;
};
