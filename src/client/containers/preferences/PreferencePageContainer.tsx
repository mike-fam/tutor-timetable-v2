import React, { useState } from "react";
import { useQueryWithError } from "../../hooks/useQueryWithError";
import { TermSelectContainer } from "../TermSelectContainer";

type Props = {};

export const PreferencePageContainer: React.FC<Props> = ({}) => {
    const [chosenTermId, setChosenTermId] = useState(-1);
    return <TermSelectContainer chooseTerm={setChosenTermId} />;
};
