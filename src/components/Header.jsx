import { connect } from "react-redux";

import {
  loginAction,
  logoutAction,
  snackToggleAction,
  toggleDrawer,
  toggleTheme,
} from "../actions";
import Header from "../containers/Header";
import { logout } from "../helpers";
import axios from "../instance/axios";

const mapStateToProps = (state) => ({
  toggleDrawer: state.lab.toggleDrawer,
  paletteMode: state.lab.paletteMode,
  lab: state.lab,
});

const mapDispatchToProps = (dispatch) => ({
  snackClose: (event, reason) => {
    if (reason === "clickaway") {
      return;
    }

    dispatch(snackToggleAction());
  },
  onLogout: () => {
    logout();
    axios.post("user/logout").then(() => {
      dispatch(logoutAction());
    });
  },
  onClickDrawer: () => dispatch(toggleDrawer()),
  onThemeClick: () => dispatch(toggleTheme()),
  onTestLogin: (name = "") => {
    axios
      .post(
        "user/guest",
        name
          ? {
              name,
            }
          : {}
      )
      .then(({ data }) => {
        dispatch(loginAction(data));
      });
  },
});

export default connect(mapStateToProps, mapDispatchToProps)(Header);
