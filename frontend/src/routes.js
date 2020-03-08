import React from "react";
import { BrowserRouter, Switch, Route } from "react-router-dom";

// import { Container } from './styles';

import Main from "./pages/Main";
import Cadastro from "./pages/Cadastro";
import Update from "./pages/Update";

export default function Routes() {
  return (
    <BrowserRouter>
      <Switch>
        <Route path="/" exact component={Main} />
        <Route path="/cadastro" component={Cadastro} />
        <Route path="/update/:objectCoupon" component={Update} />
      </Switch>
    </BrowserRouter>
  );
}
