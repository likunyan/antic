import Card from "@material-ui/core/Card";
import CardContent from "@material-ui/core/CardContent";
import Grid from "@material-ui/core/Grid";
import makeStyles from "@material-ui/core/styles/makeStyles";
import Typography from "@material-ui/core/Typography";
import * as React from "react";

import { getHost } from "../../helpers";

const useStyles = makeStyles(() => ({
  card: {
    minHeight: 152,
  },
  intro: {
    overflow: "hidden",
    WebkitLineClamp: 2,
    WebkitBoxOrient: "vertical",
    display: "-webkit-box",
  },
}));

const Menu = ({ url, name }) => {
  const classes = useStyles();

  return (
    <Grid item xs={12} sm={6} md={4} lg={3}>
      <a href={url} target="_blank" rel="noopener noreferrer">
        <Card className={classes.card}>
          <CardContent>
            <Typography
              variant="body1"
              component="h3"
              className={classes.intro}
            >
              {name}
            </Typography>
            <Typography color="textSecondary" className={classes.intro}>
              {getHost(url)}
            </Typography>
          </CardContent>
        </Card>
      </a>
    </Grid>
  );
};

export default Menu;
