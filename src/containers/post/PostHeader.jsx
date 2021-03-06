import Grid from "@material-ui/core/Grid";
import Skeleton from "@material-ui/lab/Skeleton";
import dayjs from "dayjs";
import relativeTime from "dayjs/plugin/relativeTime";
import * as React from "react";

import Tags from "../../components/post/Tags";
import Tooltip from "../../components/Tooltip";

dayjs.extend(relativeTime);

const PostHeader = ({ post, edit = true }) => {
  return post ? (
    <Grid item container spacing={1}>
      <Grid item container spacing={2}>
        <Grid item>
          <Tooltip content="发布于" time={post.created_at} />
        </Grid>
        {post.created_at !== post.updated_at && (
          <Grid item>
            <Tooltip content="更新于" time={post.updated_at} />
          </Grid>
        )}
      </Grid>
      <Tags post={post} edit={edit} />
    </Grid>
  ) : (
    <Grid item xs={12}>
      <Skeleton variant="rect" height={20} width="60%" />
    </Grid>
  );
};

export default PostHeader;
