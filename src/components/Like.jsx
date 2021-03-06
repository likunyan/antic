import { gql, useQuery } from "@apollo/client";
import Grid from "@material-ui/core/Grid";
import React, { useEffect, useState } from "react";

import Card from "./Card";

const LIKES = gql`
  query {
    likes {
      id
      name
      sub_header
      img
      link
      intro
      feeling
    }
  }
`;

const Like = () => {
  const [like, setLike] = useState([]);

  const { data } = useQuery(LIKES);

  useEffect(() => {
    if (data) {
      setLike(data.likes);
    }
  }, [data]);

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
