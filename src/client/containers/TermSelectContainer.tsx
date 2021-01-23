import React, { useContext, useEffect, useState } from "react";
import { Dropdown } from "../components/helpers/Dropdown";
import { useTermsQuery } from "../generated/graphql";
import { Loadable } from "../components/helpers/Loadable";
import { Map } from "immutable";
import { TimetableContext } from "../utils/timetable";
import { sentenceCase } from "change-case";

type Props = {};

export const TermSelectContainer: React.FC<Props> = () => {
    const { loading, data } = useTermsQuery();
    const [termsMap, setTermsMap] = useState(Map<number, string>());
    const { chooseTerm } = useContext(TimetableContext);
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
                maxW={72}
            />
        </Loadable>
    );
};
