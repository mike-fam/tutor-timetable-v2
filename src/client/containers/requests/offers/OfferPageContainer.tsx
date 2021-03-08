import React from "react";
import { OfferPage } from "../../../components/requests/offers/OfferPage";
import { notSet } from "../../../constants";
import { useGetOffersByUserIdQuery } from "../../../generated/graphql";
import { useQueryWithError } from "../../../hooks/useQueryWithError";

type Props = {};

export const OfferPageContainer: React.FC<Props> = (props: Props) => {
    const [term, setTerm] = React.useState<number>(notSet);

    const { data } = useQueryWithError(useGetOffersByUserIdQuery);

    return (
        <OfferPage
            offers={data?.getOffersByUserId || []}
            term={term}
            setTerm={setTerm}
        />
    );
};
