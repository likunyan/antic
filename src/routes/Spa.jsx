import loadable from "@loadable/component";
import Container from "@material-ui/core/Container";
import { makeStyles } from "@material-ui/core/styles";
import LocalAirportIcon from "@material-ui/icons/LocalAirport";
import React from "react";
import { Route, Switch } from "react-router-dom";
import ScrollUpButton from "react-scroll-up-button";

import Header from "../components/Header";
import Loading from "../components/Loading";
import Footer from "../containers/Footer";
import Index from "../containers/Index";

const useStyles = makeStyles({
  main: {
    paddingLeft: 0,
    paddingRight: 0,
  },
  backToTop: {
    position: "fixed",
    width: 50,
    height: 50,
    right: 0,
    bottom: 0,
    zIndex: 9,
  },
});

const Spa = ({ match }) => {
  const classes = useStyles();

  return (
    <>
      <Header />
      <Container
        maxWidth={["/posts/create", "/cars"].includes(match.url) ? null : "lg"}
        style={["/cars"].includes(match.url) ? null : { marginTop: "1rem" }}
        classes={
          ["/nav", "/cars"].includes(match.url) ? { root: classes.main } : null
        }
      >
        <Switch>
          <Route exact path="/" component={Index} />
          <Route
            path="/game"
            component={loadable(() => import("../containers/Game"))}
          />
          <Route
            path="/algolia"
            component={loadable(() => import("../containers/Algolia"))}
          />
          <Route
            exact
            path="/posts"
            component={loadable(() => import("../components/PostList"))}
          />
          <Route
            path="/posts/create"
            component={loadable(() => import("../components/PostCreate"))}
          />
          <Route
            path="/posts/:id/edit"
            component={loadable(() => import("../components/PostCreate"))}
          />
          <Route
            path="/posts/:id"
            component={loadable(() => import("../containers/PostSingle"))}
          />
          <Route
            path="/register"
            component={loadable(() => import("../containers/Register"))}
          />
          <Route
            exact
            path="/api"
            component={loadable(() => import("../containers/Api"))}
          />
          <Route
            exact
            path="/api/time"
            component={loadable(() => import("../containers/Time"))}
          />
          <Route
            path="/sqg"
            component={loadable(() => import("../components/Sqg"))}
          />
          <Route
            path="/about"
            component={loadable(() => import("../containers/About"))}
          />
          <Route
            exact
            path="/weibo"
            component={loadable(() => import("../containers/Weibo"))}
          />
          <Route
            path="/weibo/about"
            component={loadable(() => import("../containers/WeiboAbout"))}
          />
          <Route
            exact
            path="/emoji"
            component={loadable(() => import("../components/Emoji"), {
              fallback: <Loading />,
            })}
          />
          <Route
            path="/emoji/create"
            component={loadable(
              () => import("../components/Emoji/EmojiCreate"),
              {
                fallback: <Loading />,
              }
            )}
          />
          <Route
            exact
            path="/todo"
            component={loadable(() => import("../components/Todo/Project"))}
          />
          <Route
            path="/todo/create"
            component={loadable(() => import("../components/Todo/NewProject"))}
          />
          <Route
            path="/todo/:id"
            component={loadable(() =>
              import("../components/Todo/SingleProject")
            )}
          />
          <Route
            path="/self-talk"
            component={loadable(() => import("../containers/SelfTalk"), {
              fallback: <Loading />,
            })}
          />
          <Route
            path="/like"
            component={loadable(() => import("../components/Like"))}
          />
          <Route
            path="/nav"
            component={loadable(() => import("../components/Nav"))}
          />
          <Route
            path="/a-z"
            component={loadable(() => import("../containers/A2Z"))}
          />
          <Route
            path="/piano"
            component={loadable(() => import("../components/Piano"))}
          />
          <Route
            path="/bookmarks"
            component={loadable(() => import("../containers/Bookmarks"))}
          />
          <Route
            path="/search"
            component={loadable(() => import("../components/Search"))}
          />
          <Route
            exact
            path="/user/:id"
            component={loadable(() => import("../containers/User"))}
          />
          <Route
            path="/user/:id/setting"
            component={loadable(() => import("../containers/UserSetting"))}
          />
          <Route
            exact
            path="/demo"
            component={loadable(() => import("../containers/Demo"))}
          />
          <Route
            path="/demos/chess"
            component={loadable(() => import("../containers/Chess"))}
          />
          <Route
            path="/demos/clock"
            component={loadable(() => import("../demo/Clock"))}
          />
          <Route
            path="/demos/calculator"
            component={loadable(() => import("../demo/Calculator"))}
          />
          <Route
            path="/demos/parking"
            component={loadable(() => import("../containers/Parking"))}
          />
          <Route
            path="/demos/font"
            component={loadable(() => import("../demo/Font"))}
          />
          <Route
            path="/powered-by"
            component={loadable(() => import("../containers/PoweredBy"))}
          />
          <Route
            path="/like"
            component={loadable(() => import("../components/Like"))}
          />
          <Route
            path="/slate"
            component={loadable(() => import("../containers/Slate"))}
          />
          <Route
            path="/cars"
            component={loadable(() => import("../containers/Cars"), {
              fallback: <Loading />,
            })}
          />
          <Route
            path="/video"
            component={loadable(() => import("../containers/Video"))}
          />
          <Route
            path="/copywriting"
            component={loadable(() => import("../containers/Copywriting"))}
          />
          <Route component={loadable(() => import("../containers/NoMatch"))} />
        </Switch>
      </Container>
      {["/"].includes(match.url) && <Footer />}
      <ScrollUpButton
        ContainerClassName="AnyClassForContainer"
        TransitionClassName="AnyClassForTransition"
      >
        <LocalAirportIcon alt="Back to top arrow" />
      </ScrollUpButton>
    </>
  );
};

export default Spa;