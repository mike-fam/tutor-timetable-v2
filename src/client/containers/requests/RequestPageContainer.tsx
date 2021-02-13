import React, { useCallback, useEffect, useState } from "react";
import { notSet } from "../../constants";
import {
    RequestStatus,
    RequestType,
    useTermsQuery,
} from "../../generated/graphql";
import { getCurrentTerm } from "../../utils/term";
import { Wrapper } from "../../components/helpers/Wrapper";
import { Box, Flex, Grid, Heading } from "@chakra-ui/react";
import { RequestFilter } from "../../components/requests/RequestFilter";
import { CreateRequestButtonContainer } from "./CreateRequestButtonContainer";
import { RequestListContainer } from "./RequestListContainer";
import { TermSelectContainer } from "../TermSelectContainer";
import { RequestResponse } from "../../types/requests";
import { Set } from "immutable";
import { useSelectableList } from "../../hooks/useSelectableList";
import {
    requestCourseFilter,
    requestStatusFilter,
    requestTypeFilter,
} from "../../utils/requests";

export const RequestPageContainer: React.FunctionComponent = () => {
    // Get Current Term
    const { data: termsData } = useTermsQuery();
    const [chosenTerm, setChosenTerm] = useState(notSet);
    const [termIsSet, setTermIsSet] = useState(false);
    const [chosenCourses, setChosenCourses] = useState<Set<number>>(Set());
    const {
        selected: selectedTypes,
        selectElem: selectType,
    } = useSelectableList([RequestType.Temporary, RequestType.Permanent]);
    const {
        selected: selectedStatuses,
        selectElem: selectStatus,
    } = useSelectableList([RequestStatus.Open, RequestStatus.Closed]);

    useEffect(() => {
        if (!termsData || termIsSet) {
            return;
        }
        setChosenTerm(getCurrentTerm(termsData.terms).id);
        setTermIsSet(true);
    }, [termsData, termIsSet]);

    //Filter management.
    const filterByStatus = useCallback(
        (request: RequestResponse) => {
            return requestStatusFilter(request, selectedStatuses);
        },
        [selectedStatuses]
    );

    const filterByType = useCallback(
        (request: RequestResponse) => {
            return requestTypeFilter(request, selectedTypes);
        },
        [selectedTypes]
    );

    const filterByCourse = useCallback(
        (request: RequestResponse) => {
            return requestCourseFilter(request, chosenCourses);
        },
        [chosenCourses]
    );

    return (
        <Wrapper>
            <Grid templateColumns="1fr 5fr" templateRows="auto" gap={6}>
                <Box spacing={8} gridRow="4 / 6" gridColumn={1}>
                    <RequestFilter
                        chosenCourses={chosenCourses}
                        setChosenCourses={setChosenCourses}
                        selectType={selectType}
                        selectStatus={selectStatus}
                        chosenTerm={chosenTerm}
                    />
                </Box>
                <Heading gridRow={1} gridColumn={2}>
                    Requests
                </Heading>
                <Flex gridRow={2} gridColumn={2} justifyContent="flex-end">
                    <TermSelectContainer
                        chooseTerm={setChosenTerm}
                        chosenTerm={chosenTerm}
                    />
                </Flex>
                <Flex gridRow={3} gridColumn={2} justifyContent="flex-end">
                    <CreateRequestButtonContainer />
                </Flex>
                <Box gridRow={4} gridColumn={2}>
                    <RequestListContainer
                        filters={[filterByCourse, filterByType, filterByStatus]}
                        termId={chosenTerm}
                    />
                </Box>
            </Grid>
        </Wrapper>
    );
};
