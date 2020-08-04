import React, { useState } from "react";
import Avatar from "@material-ui/core/Avatar";
import Button from "@material-ui/core/Button";
import TextField from "@material-ui/core/TextField";
import Link from "@material-ui/core/Link";
import Grid from "@material-ui/core/Grid";
import Typography from "@material-ui/core/Typography";
import Box from "@material-ui/core/Box";
import Container from "@material-ui/core/Container";
import LockOutlinedIcon from "@material-ui/icons/LockOutlined";
import { makeStyles } from "@material-ui/core/styles";
import Swal from "sweetalert2";
import axios from "axios";

import Copyright from "./Copyright";

const useStyles = makeStyles((theme) => ({
  paper: {
    marginTop: theme.spacing(8),
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

const Register = ({ history }) => {
  const classes = useStyles();
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [password_confirmation, setPassword_confirmation] = useState("");
  const [inputErrors, setInputErrors] = useState({});

  const handle = (e) => {
    e.preventDefault();
    axios
      .post("user/signup", {
        name: name,
        email: email,
        password: password,
        password_confirmation: password_confirmation,
      })
      .then((response) => {
        console.log(response);
        return response;
      })
      .then((json) => {
        if (json.status === 201) {
          Swal.fire({
            position: "top-end",
            type: "success",
            title: "注册成功，请尝试登录！",
            showConfirmButton: false,
            timer: 2000,
          });
          history.push("/login");
        } else {
          alert("注册失败！");
        }
      })
      .catch((error) => {
        setInputErrors(error.errors);
        console.log(error);
      });
  };

  return (
    <Container component="main" maxWidth="xs">
      <div className={classes.paper}>
        <Avatar className={classes.avatar}>
          <LockOutlinedIcon />
        </Avatar>
        <Typography component="h1" variant="h5">
          注册
        </Typography>
        <form className={classes.form} noValidate>
          <Grid container spacing={2}>
            <Grid item xs={12}>
              <TextField
                variant="outlined"
                required
                fullWidth
                id="name"
                label="名称"
                name="name"
                autoComplete="name"
                onChange={(e) => setName(e.target.value)}
                error={!!inputErrors.name}
                placeholder={inputErrors.name ? inputErrors.name : null}
                InputLabelProps={inputErrors.name ? { shrink: true } : {}}
                helperText={inputErrors.name ? inputErrors.name[0] : ""}
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                variant="outlined"
                required
                fullWidth
                id="email"
                label="Email 地址"
                name="email"
                autoComplete="email"
                onChange={(e) => setEmail(e.target.value)}
                error={!!inputErrors.email}
                placeholder={inputErrors.email ? inputErrors.email : null}
                InputLabelProps={inputErrors.email ? { shrink: true } : {}}
                helperText={inputErrors.email ? inputErrors.email[0] : null}
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                variant="outlined"
                required
                fullWidth
                name="password"
                label="密码"
                type="password"
                id="password"
                autoComplete="password"
                onChange={(e) => setPassword(e.target.value)}
                error={!!inputErrors.password}
                placeholder={inputErrors.password ? inputErrors.password : null}
                InputLabelProps={inputErrors.password ? { shrink: true } : {}}
                helperText={
                  inputErrors.password ? inputErrors.password[0] : null
                }
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                variant="outlined"
                required
                fullWidth
                name="password_confirmation"
                label="确认密码"
                type="password"
                id="password_confirmation"
                autoComplete="password_confirmation"
                onChange={(e) => setPassword_confirmation(e.target.value)}
              />
            </Grid>
          </Grid>
          <Button
            type="submit"
            fullWidth
            variant="contained"
            color="primary"
            className={classes.submit}
            onClick={handle}
          >
            注册
          </Button>
          <Grid container justify="flex-end">
            <Grid item>
              <Link
                onClick={() => {
                  history.push("/login");
                }}
                variant="body2"
              >
                已经有账户？登录！
              </Link>
            </Grid>
          </Grid>
        </form>
      </div>
      <Box mt={5}>
        <Copyright />
      </Box>
    </Container>
  );
};

export default Register;