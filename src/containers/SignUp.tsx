import React, { FormEvent, useState } from 'react'
import {RouteComponentProps} from 'react-router-dom'
import Avatar from '@material-ui/core/Avatar'
import Button from '@material-ui/core/Button'
import CssBaseline from '@material-ui/core/CssBaseline'
import TextField from '@material-ui/core/TextField'
import Link from '@material-ui/core/Link'
import Grid from '@material-ui/core/Grid'
import Box from '@material-ui/core/Box'
import LockOutlinedIcon from '@material-ui/icons/LockOutlined'
import Typography from '@material-ui/core/Typography'
import makeStyles from '@material-ui/core/styles/makeStyles'
import Container from '@material-ui/core/Container'

import Copyright from "../components/Copyright"
import axios from 'axios'
import Swal from 'sweetalert2'

const useStyles = makeStyles(theme => ({
  paper: {
    marginTop: theme.spacing(8),
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
  },
  avatar: {
    margin: theme.spacing(1),
    backgroundColor: theme.palette.secondary.main,
  },
  form: {
    width: '100%', // Fix IE 11 issue.
    marginTop: theme.spacing(3),
  },
  submit: {
    margin: theme.spacing(3, 0, 2),
  },
}));

const SignUp: React.FC<RouteComponentProps> = ({history}) => {
  const classes = useStyles();
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [password_confirmation, setPassword_confirmation] = useState('');
  const [inputErrors, setInputErrors] = useState<{name?: string,email?: string, password?: string}>({});

  const handle = (e: FormEvent) => {
    e.preventDefault();
    axios
      .post("user/sign-up", {
        name: name,
        email: email,
        password: password,
        password_confirmation: password_confirmation
      })
      .then(response => {
        if (response.status === 201) {
          Swal.fire('成功', '注册成功，请尝试登录！', 'success');
          history.push('/sign-in');
        }
        setInputErrors(response.data.errors);
      })
  };

  return (
    <Container component="main" maxWidth="xs">
      <CssBaseline/>
      <div className={classes.paper}>
        <Avatar className={classes.avatar}>
          <LockOutlinedIcon/>
        </Avatar>
        <Typography component="h1" variant="h5">
          注册
        </Typography>
        <form className={classes.form} noValidate>
          <Grid container spacing={2}>
            <Grid item xs={12} sm={6}>
              <TextField
                variant="outlined"
                required
                fullWidth
                id="name"
                label="昵称"
                name="name"
                autoComplete="name"
                onChange={(e) => setName(e.target.value)}
                error={!!inputErrors.name}
                placeholder={inputErrors.name ? inputErrors.name[0] : undefined}
                InputLabelProps={
                  inputErrors.name ? {shrink: true} : {}
                }
                helperText={inputErrors.name ? inputErrors.name[0] : undefined}
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
                placeholder={inputErrors.email ? inputErrors.email[0] : undefined}
                InputLabelProps={
                  inputErrors.email ? {shrink: true} : {}
                }
                helperText={inputErrors.email ? inputErrors.email[0] : undefined}
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
                autoComplete="current-password"
                onChange={(e) => setPassword(e.target.value)}
                error={!!inputErrors.password}
                placeholder={inputErrors.password ? inputErrors.password[0] : undefined}
                InputLabelProps={
                  inputErrors.password ? {shrink: true} : {}
                }
                helperText={inputErrors.password ? inputErrors.password[0] : undefined}
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
                autoComplete="current-password-confirmation"
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
            onClick={e => handle(e)}
          >
            注册
          </Button>
          <Grid container justify="flex-end">
            <Grid item>
              <Link onClick={() => {
                history.push('/sign-in')
              }} variant="body2">
                已经有账户？登录！
              </Link>
            </Grid>
          </Grid>
        </form>
      </div>
      <Box mt={5}>
        <Copyright/>
      </Box>
    </Container>
  );
}

export default SignUp
