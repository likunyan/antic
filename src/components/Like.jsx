import Grid from "@material-ui/core/Grid";
import React, { useEffect, useState } from "react";

import axios from "../helpers/api";
import Card from "./Card";

const Like = () => {
  const [like, setLike] = useState([]);

  useEffect(() => {
    axios.get("like").then(({ data }) => {
      setLike(data);
    });
  }, []);

  return (
    <Grid container justify="flex-start" spacing={2}>
      {like.map((item) => (
        <Grid item xs={12} sm={6} md={4} lg={3} key={item.id}>
          <Card
            title={item.name}
            subHeader={item.sub_header}
            img={item.img}
            link={item.link}
            intro={item.intro}
            feeling={item.feeling}
          />
        </Grid>
      ))}
    </Grid>
  );
};

export default Like;
