import React, { useEffect, useState } from "react";
import { Dropdown } from "../components/helpers/Dropdown";
import { useTermsQuery } from "../generated/graphql";
import { Loadable } from "../components/helpers/Loadable";
import { Map } from "immutable";
import { sentenceCase } from "change-case";

type Props = {
    chooseTerm: (termId: number) => void;
};

export const TermSelectContainer: React.FC<Props> = ({ chooseTerm }) => {
    const { loading, data } = useTermsQuery();
    const [termsMap, setTermsMap] = useState(Map<number, string>());
    useEffect(() => {
        if (loading || !data) {
            return;
        }
        for (const term of data.terms) {
            setTermsMap((termsMap) =>
                termsMap.set(
                    term.id,
                    `${sentenceCase(term.type)}, ${term.year}`
                )
            );
        }
    }, [loading, data]);
    return (
        <Loadable isLoading={loading}>
            <Dropdown
                onChange={(e) => chooseTerm(Number(e.target.value))}
                options={termsMap}
            />
        </Loadable>
    );
};
