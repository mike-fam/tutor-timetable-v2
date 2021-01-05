import React from "react";
import { BrowserRouter, Switch, Route } from "react-router-dom";
import { NavBar } from "./components/NavBar";
import { RequestContainer } from "./containers/RequestContainer";
import { TimetableContainer } from "./containers/TimetableContainer";
import { AvailabilityContainer } from "./containers/AvailabilityContainer";

export const AppRouter: React.FunctionComponent<{}> = () => {
    return (
        <BrowserRouter>
            <NavBar user={"s123456789"} />
            <Switch>
                <Route path="/" component={TimetableContainer} exact />
                <Route path="/requests" component={RequestContainer} />
                <Route
                    path="/availabilities"
                    component={AvailabilityContainer}
                />
            </Switch>
        </BrowserRouter>
    );
};
