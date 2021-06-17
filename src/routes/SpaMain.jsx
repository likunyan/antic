import loadable from "@loadable/component";
import React from "react";
import { Route, Switch } from "react-router-dom";

import Loading from "../components/Loading";
import Index from "../containers";
import Redirect from "../containers/Redirect";

const SpaMain = () => (
  <Switch>
    <Route exact path="/" component={Index} />
    <Route exact path="/redirect" component={Redirect} />
    <Route
      exact
      path="/posts"
      component={loadable(() => import("../components/post/PostList"))}
    />
    <Route
      path="/posts/create"
      component={loadable(() => import("../components/post/PostCreate"), {
        fallback: <Loading />,
      })}
    />
    <Route
      path="/posts/:id/edit"
      component={loadable(() => import("../components/post/PostCreate"), {
        fallback: <Loading />,
      })}
    />
    <Route
      path="/posts/:id"
      component={loadable(() => import("../components/post/PostSingle"), {
        fallback: <Loading />,
      })}
    />
    <Route
      path="/reset/:secret"
      component={loadable(() => import("../containers/Reset"))}
    />
    <Route
      path="/bookmarks"
      component={loadable(() => import("../containers/Bookmarks"))}
    />
    <Route
      path="/progress"
      component={loadable(() => import("../containers/Progress"))}
    />
    <Route
      path="/categories"
      component={loadable(() => import("../containers/post/AllCategories"))}
    />
    <Route
      path="/tags"
      component={loadable(() => import("../containers/Tags"))}
    />
    <Route
      path="/register"
      component={loadable(() => import("../containers/Register"))}
    />
    <Route
      exact
      path="/forget"
      component={loadable(() => import("../containers/auth/Forget"))}
    />
    <Route
      path="/forget/:secret"
      component={loadable(() => import("../containers/auth/EmailVerify"))}
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
      component={loadable(() => import("../components/Emoji/EmojiCreate"), {
        fallback: <Loading />,
      })}
    />
    <Route
      exact
      path="/project"
      component={loadable(() => import("../components/Task/Project"))}
    />
    <Route
      path="/project/create"
      component={loadable(() => import("../components/Task/NewProject"))}
    />
    <Route
      path="/project/:id"
      component={loadable(() => import("../components/Task/SingleProject"))}
    />
    <Route
      path="/todo"
      component={loadable(() => import("../components/TodoList"))}
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
      path="/bookmark/create"
      component={loadable(() => import("../containers/BookmarkCreate"))}
    />
    <Route
      path="/bookmarks/old"
      component={loadable(() => import("../containers/Bookmarks"))}
    />
    <Route
      path="/ndd"
      component={loadable(() => import("../components/Ndd"))}
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
      path="/powered_by"
      component={loadable(() => import("../containers/PoweredBy"), {
        fallback: <Loading />,
      })}
    />
    <Route
      path="/like"
      component={loadable(() => import("../components/Like"))}
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
      path="/music"
      component={loadable(() => import("../containers/Music"))}
    />
    <Route
      path="/copywriting"
      component={loadable(() => import("../containers/Copywriting"))}
    />
    <Route
      path="/moon"
      component={loadable(() => import("../containers/Moon"))}
    />
    <Route
      path="/php-function"
      component={loadable(() => import("../containers/PHPFunction"))}
    />
    <Route
      path="/chat"
      component={loadable(() => import("../containers/Chat"))}
    />
    <Route
      path="/base64"
      component={loadable(() => import("../containers/Base64"))}
    />
    <Route
      path="/money"
      component={loadable(() => import("../containers/Money"))}
    />
    <Route
      path="/color"
      component={loadable(() => import("../containers/Color"))}
    />
    <Route
      path="/goods"
      component={loadable(() => import("../containers/goods/Index"))}
    />
    <Route
      path="/docs"
      component={loadable(() => import("../containers/Docs"))}
    />
    <Route component={loadable(() => import("../containers/NoMatch"))} />
  </Switch>
);
export default SpaMain;