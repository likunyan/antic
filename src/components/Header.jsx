import axios from "axios";
import { connect } from "react-redux";
import Swal from "sweetalert2";

import {
  loginAction,
  logoutAction,
  toggleDrawer,
  toggleTheme,
} from "../actions";
import Header from "../containers/Header";
import { logged, logout } from "../helpers";

const mapStateToProps = (state) => ({
  toggleDrawer: state.lab.toggleDrawer,
  themePaletteType: state.lab.themePaletteType,
  lab: state.lab,
});

const mapDispatchToProps = (dispatch) => ({
  onLogout: () => {
    logout();
    dispatch(logoutAction());
    axios.post("user/logout").then(() => {
      Swal.fire("登出成功！");
    });
  },
  onClickDrawer: () => dispatch(toggleDrawer()),
  onThemeClick: () => dispatch(toggleTheme()),
  onTestLogin: () => {
    axios
      .post("user/login", {
        email: "test@test.com",
        password: "test@test.com",
        remember_me: true,
      })
      .then((response) => {
        const accessToken = response.data.access_token;
        axios.defaults.headers.common.Authorization = `Bearer ${accessToken}`;
        axios.post("user/profile").then(({ data }) => {
          const { id, name, email: userEmail } = data;
          logged(response.data, data);
          dispatch(loginAction(accessToken, id, name, userEmail));
        });
      });
  },
});

export default connect(mapStateToProps, mapDispatchToProps)(Header);
