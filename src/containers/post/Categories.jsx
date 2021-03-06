import { useQuery } from "@apollo/client";
import Skeleton from "@material-ui/lab/Skeleton";
import * as React from "react";
import { useEffect, useState } from "react";

import ChipFlow from "../../components/ChipFlow";
import { CATEGORIES } from "../../graphql/post";

export default (props) => {
  const [categories, setCategories] = useState([]);
  const [category, setCategory] = useState(undefined);

  const { data } = useQuery(CATEGORIES);

  useEffect(() => {
    if (data) {
      setCategories(_.orderBy(data.categories, ["count"], ["desc"]));
    }
  }, [data]);

  return categories.length ? (
    <ChipFlow
      items={categories}
      type="id"
      currentSelect={category}
      onHandleClick={(category) => {
        setCategory(category);
        props.changeCategory(parseInt(category));
      }}
    />
  ) : (
    <Skeleton variant="rect" height="24rem" />
  );
};
