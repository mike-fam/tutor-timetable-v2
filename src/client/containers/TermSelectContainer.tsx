import { FC, useEffect, useState } from "react";
import { Dropdown } from "../components/helpers/Dropdown";
import { useTermsQuery } from "../generated/graphql";
import { Loadable } from "../components/helpers/Loadable";
import { Map } from "immutable";
import { formatTerm, getCurrentTerm } from "../utils/term";

type Props = {
    chooseTerm: (termId: string) => void;
    chosenTerm: string;
    maxW?: number | string;
};

export const TermSelectContainer: FC<Props> = ({
    chooseTerm,
    chosenTerm,
    maxW,
}) => {
    const { loading, data } = useTermsQuery();
    const [termsMap, setTermsMap] = useState(Map<string, string>());
    useEffect(() => {
        if (loading || !data) {
            return;
        }
        if (data.terms.length > 0) {
            chooseTerm(getCurrentTerm(data.terms).id);
        }
        for (const term of data.terms) {
            setTermsMap((termsMap) => termsMap.set(term.id, formatTerm(term)));
        }
    }, [loading, data, chooseTerm]);
    return (
        <Loadable isLoading={data === undefined}>
            <Dropdown
                onChange={(e) => chooseTerm(e.target.value)}
                value={chosenTerm}
                options={termsMap}
                maxW={maxW}
            />
        </Loadable>
    );
};
