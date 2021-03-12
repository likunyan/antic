import Container from "@material-ui/core/Container";
import Grid from "@material-ui/core/Grid";
import { makeStyles } from "@material-ui/core/styles";
import Typography from "@material-ui/core/Typography";
import * as React from "react";
import { Link as RouteLink } from "react-router-dom";

import HomeFooter from "../components/HomeFooter";
import backgroundImg from "../config/footerBackground";

const useStyles = makeStyles((theme) => ({
  footer: {
    backgroundImage:
      theme.palette.type === "dark"
        ? `url(${process.env.REACT_APP_CDN_URL}/bg/tesla-vector-roadster.png!/compress/true/fw/400)`
        : `url(${process.env.REACT_APP_CDN_URL}/bg/${
            backgroundImg[Math.floor(Math.random() * backgroundImg.length)]
          }!/compress/true/fw/400)`,
    backgroundPosition: "right top",
    backgroundRepeat: "no-repeat",
    backgroundSize: 200,
    minHeight: 200,
    paddingTop: "2rem",
    marginTop: "2rem",
    borderTop: "1px solid rgba(211,224,233,.15)",
  },
}));

const Footer = () => {
  const classes = useStyles();

  return (
    <Container component="footer">
      <Grid container spacing={2} className={classes.footer}>
        <Grid item xs={12} sm={5}>
          <Typography variant="h5" component="h3">
            说明
          </Typography>
          <p>
            1.该实验室的各项功能都是测试版本
            <br />
            2. 因实验室只有自己在访问和使用，所以没有其他人的注册和信息
            <br />
            3. 如有侵犯到您的权益，请及时联系我
          </p>
        </Grid>
        <Grid item xs={12} sm={3}>
          <Typography variant="h5" component="h3">
            长期计划
          </Typography>
          <ul>
            <li>健康</li>
            <li>PHP + JavaScript</li>
            <li>TDD、算法和底层等</li>
            <li>英语</li>
            <li>实时的应用、游戏</li>
          </ul>
        </Grid>
        <Grid item xs={12} sm={3}>
          <Typography variant="h5" component="h3">
            网站
          </Typography>
          <ul>
            <li>
              <RouteLink to="/project/1">代办事项</RouteLink>
            </li>
            <li>
              <RouteLink to="/powered-by">Powered by</RouteLink>
            </li>
          </ul>
        </Grid>
      </Grid>
      <HomeFooter />
    </Container>
  );
};

export default Footer;
