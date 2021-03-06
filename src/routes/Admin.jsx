import * as React from "react";
import { Route, Switch } from "react-router-dom";

import Index from "../containers/admin";

const Admin = () => (
  <Switch>
    <Route exact path="/admin" component={Index} />
  </Switch>
);

export default Admin;
