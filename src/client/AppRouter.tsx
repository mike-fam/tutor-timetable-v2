import React from "react";
import { BrowserRouter, Switch, Route } from "react-router-dom";
import { TimetableContainer } from "./containers/TimetableContainer";
import { WeekNavContainer } from "./containers/WeekNavContainer";

export const AppRouter: React.FunctionComponent<{}> = () => {
    return (
        <BrowserRouter>
            <Switch>
                <Route path="/" component={TimetableContainer} exact />
                <Route path="/test" component={WeekNavContainer} />
            </Switch>
        </BrowserRouter>
    );
};
