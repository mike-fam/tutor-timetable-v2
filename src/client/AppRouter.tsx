import React from "react";
import { BrowserRouter, Switch, Route } from "react-router-dom";
import { NavBar } from "./components/NavBar";
import { RequestContainer } from "./containers/requests/RequestContainer";
import { TimetablePageContainer } from "./containers/TimetablePageContainer";
import { AvailabilityPageContainer } from "./containers/availabilities/AvailabilityPageContainer";

export const AppRouter: React.FunctionComponent<{}> = () => {
    return (
        <BrowserRouter>
            <NavBar />
            <Switch>
                <Route path="/" component={TimetablePageContainer} exact />
                <Route path="/requests" component={RequestContainer} />
                <Route
                    path="/availabilities"
                    component={AvailabilityPageContainer}
                />
            </Switch>
        </BrowserRouter>
    );
};
