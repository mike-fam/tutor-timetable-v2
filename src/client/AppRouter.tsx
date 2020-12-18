import React from "react";
import { BrowserRouter, Switch, Route } from "react-router-dom";
import { NavBar } from "./components/NavBar";
import { Wrapper } from "./components/Wrapper";
import { RequestContainer } from "./containers/RequestContainer";
import { TimetableContainer } from "./containers/TimetableContainer";

export const AppRouter: React.FunctionComponent<{}> = () => {
    return (
        <BrowserRouter>
            <Wrapper>
                <NavBar user={"s123456789"} />
                <Switch>
                    <Route path="/" component={TimetableContainer} exact />
                    <Route path="/requests" component={RequestContainer} />
                </Switch>
            </Wrapper>
        </BrowserRouter>
    );
};
