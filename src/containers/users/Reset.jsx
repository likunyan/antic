import Avatar from "@material-ui/core/Avatar";
import Button from "@material-ui/core/Button";
import Container from "@material-ui/core/Container";
import Grid from "@material-ui/core/Grid";
import { makeStyles } from "@material-ui/core/styles";
import Typography from "@material-ui/core/Typography";
import LockOutlinedIcon from "@material-ui/icons/LockOutlined";
import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { useRouteMatch } from "react-router-dom";
import { useHistory } from "react-router-dom";
import swal from "sweetalert2";

import { loginAction } from "../../actions";
import axios from "../../instance/axios";
import Password from "../auth/Password";
import PasswordConfirmation from "../auth/PasswordConfirmation";

const useStyles = makeStyles((theme) => ({
  paper: {
    marginTop: theme.spacing(6),
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
  },
  avatar: {
    margin: theme.spacing(1),
    backgroundColor: theme.palette.secondary.main,
  },
  form: {
    width: "100%", // Fix IE 11 issue.
    marginTop: theme.spacing(3),
  },
  submit: {
    margin: theme.spacing(3, 0, 2),
  },
}));

const Forget = () => {
  const dispatch = useDispatch();
  const history = useHistory();
  const classes = useStyles();
  const match = useRouteMatch();
  const [inputErrors, setInputErrors] = useState({});
  const [displayPassword, setDisplayPassword] = useState(false);
  const [password, setPassword] = useState("");
  const [passwordConfirmation, setPasswordConfirmation] = useState("");

  const handlePassword = () => {
    setDisplayPassword(!displayPassword);
  };

  const handleReset = (e) => {
    e.preventDefault();

    axios
      .post("/reset", {
        password,
        password_confirmation: passwordConfirmation,
        secret: match.params.secret,
      })
      .then((response) => {
        swal.fire({
          title: "重置成功，正在登录",
          icon: "success",
          showCloseButton: true,
        });
        dispatch(loginAction(response.data));
        history.push("/");
      })
      .catch((error) => {
        setInputErrors(error.data.errors);
      });
  };

  return (
    <Container component="main" maxWidth="xs">
      <div className={classes.paper}>
        <Avatar className={classes.avatar}>
          <LockOutlinedIcon />
        </Avatar>
        <Typography component="h1" variant="h5" style={{ marginBottom: 10 }}>
          重置密码
        </Typography>
        <div>
          <form className={classes.form} noValidate>
            <Grid container spacing={2}>
              <Grid item xs={12}>
                <Password
                  password={password}
                  displayPassword={displayPassword}
                  handlePassword={handlePassword}
                  setPassword={setPassword}
                  error={inputErrors?.password}
                />
              </Grid>
              <Grid item xs={12}>
                <PasswordConfirmation
                  passwordConfirmation={passwordConfirmation}
                  displayPassword={displayPassword}
                  handlePassword={handlePassword}
                  setPasswordConfirmation={setPasswordConfirmation}
                  error={inputErrors?.password_confirmation}
                />
              </Grid>
            </Grid>
          </form>
          <Button
            type="submit"
            fullWidth
            variant="contained"
            color="primary"
            className={classes.submit}
            onClick={handleReset}
          >
            修改
          </Button>
        </div>
      </div>
    </Container>
  );
};

export default Forget;
