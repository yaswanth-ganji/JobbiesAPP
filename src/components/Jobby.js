import React from "react";
import Login from "./login";
import { BrowserRouter, Redirect, Route, Switch } from "react-router-dom";
import Home from "./home";
import Job from "./Job";
import SearchResultItemDetail from "./SearchResultItemDetails";
import NotFound from "./NotFound";
class Jobby extends React.Component {
  render() {
    return (
      <div>
        <BrowserRouter>
          <Switch>
            <Route exact path="/Login" component={Login} />
            <Route exact path="/" component={Home} />
            <Route exact path="/Jobs" component={Job} />
            <Route exact path="/Jobs/:id" component={SearchResultItemDetail} />
            <Route exact path="/Not-Found" component={NotFound} />
            <Redirect to="/Not-Found" />
          </Switch>
        </BrowserRouter>
      </div>
    );
  }
}

export default Jobby;
