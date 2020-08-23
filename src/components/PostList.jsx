import Chip from "@material-ui/core/Chip";
import Grid from "@material-ui/core/Grid";
import Paper from "@material-ui/core/Paper";
import { makeStyles } from "@material-ui/core/styles";
import Typography from "@material-ui/core/Typography";
import Pagination from "@material-ui/lab/Pagination";
import PaginationItem from "@material-ui/lab/PaginationItem";
import Skeleton from "@material-ui/lab/Skeleton";
import axios from "axios";
import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";

const useStyles = makeStyles((theme) => ({
  paper: {
    padding: theme.spacing(2),
    margin: "auto",
  },
}));

const PostList = () => {
  const classes = useStyles();
  const [post, setPost] = useState({});
  const [pageCount, setPageCount] = useState();
  const [currPage, setCurrPage] = useState(1);

  useEffect(() => {
    axios.get("posts").then(({ data }) => {
      setPost(data);
      setCurrPage(data.current_page);
      setPageCount(data.last_page);
    });
  }, []);

  const handlePage = (page) => {
    axios.get(`posts?page[number]=${page}`).then(({ data }) => {
      setPost(data);
      setCurrPage(page);
      setPageCount(data.last_page);
    });
  };

  return (
    <>
      <Paper className={classes.paper}>
        <Grid container spacing={2}>
          {(post.data || Array.from(new Array(6))).map((item, index) => {
            return item ? (
              <Grid
                item
                container
                xs={12}
                key={item.id}
                spacing={2}
                alignItems="center"
              >
                {/* 分类 */}
                <Grid item>
                  <Chip
                    size="small"
                    label={item.category || "未分类"}
                    style={{ minWidth: "59px" }}
                  />
                </Grid>
                {/* 标题 */}
                <Grid item>
                  <Typography variant="h6" component="h2">
                    <Link to={`/posts/${item.id}`}>{item.title}</Link>
                  </Typography>
                </Grid>
                {/* 标签 */}
                <Grid item>
                  <Grid container spacing={1}>
                    {item.tags.length !== 0 &&
                      item.tags.map((tag) => (
                        <Grid item key={tag}>
                          <Chip variant="outlined" size="small" label={tag} />
                        </Grid>
                      ))}
                  </Grid>
                </Grid>
              </Grid>
            ) : (
              <Grid item container xs={12} key={index} spacing={2}>
                <Grid item>
                  <Skeleton width={40} height={32} animation="wave" />
                </Grid>
                <Grid item xs>
                  <Skeleton width="100%" height={32} animation="wave" />
                </Grid>
              </Grid>
            );
          })}
          <Grid itemxs={12}>
            <Pagination
              page={currPage}
              count={pageCount}
              hidePrevButton={currPage <= 1}
              hideNextButton={currPage >= post.last_page}
              renderItem={(item) => (
                <PaginationItem
                  {...item}
                  disabled={item.page === currPage}
                  onClick={() => handlePage(item.page)}
                />
              )}
            />
          </Grid>
        </Grid>
      </Paper>
    </>
  );
};

export default PostList;
