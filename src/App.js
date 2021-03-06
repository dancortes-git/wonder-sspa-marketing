import React, { useEffect, useState } from "react";
import { Switch, Route, BrowserRouter as Router } from "react-router-dom";
import {
  StylesProvider,
  createGenerateClassName,
} from "@material-ui/core/styles";

import Landing from "./components/Landing";
import Pricing from "./components/Pricing";

const generateClassName = createGenerateClassName({
  productionPrefix: "mkt",
});

export default (props) => {
  const {
    getUser,
    addSignInEventListener,
    removeSignInEventListener,
    addSignOutEventListener,
    removeSignOutEventListener,
  } = props;
  const user = (getUser && getUser()) || null;
  const [isSignedIn, setIsSignedIn] = useState(!!user);

  const onEventSignInOrSignOutCallback = ({ detail: userLogged }) => {
    setIsSignedIn(!!userLogged);
  };

  // Add Sign In event listener
  useEffect(() => {
    addSignInEventListener &&
      addSignInEventListener(onEventSignInOrSignOutCallback);
    return () => {
      removeSignInEventListener &&
        removeSignInEventListener(onEventSignInOrSignOutCallback);
    };
  }, [addSignInEventListener, removeSignInEventListener]);

  // Add Sign Out event listener
  useEffect(() => {
    addSignOutEventListener &&
      addSignOutEventListener(onEventSignInOrSignOutCallback);
    return () => {
      removeSignOutEventListener &&
        removeSignOutEventListener(onEventSignInOrSignOutCallback);
    };
  }, [addSignOutEventListener, removeSignOutEventListener]);

  return (
    <StylesProvider generateClassName={generateClassName}>
      <Router>
        <Switch>
          <Route exact path="/pricing">
            <Pricing />
          </Route>
          <Route path="/">
            <Landing isSignedIn={isSignedIn} />
          </Route>
        </Switch>
      </Router>
    </StylesProvider>
  );
};
