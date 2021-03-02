import React from "react";
import { OfferPage } from "../../../components/requests/offers/OfferPage";
import { useGetOffersByUserIdQuery } from "../../../generated/graphql";
import { useQueryWithError } from "../../../hooks/useQueryWithError";

type Props = {};

export const OfferPageContainer: React.FC<Props> = (props: Props) => {
    const { data } = useQueryWithError(useGetOffersByUserIdQuery);
    return <OfferPage offers={data?.getOffersByUserId || []} />;
};
