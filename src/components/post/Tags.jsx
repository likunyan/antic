import { connect } from "react-redux";

import { tagsDelete } from "../../actions";
import Tags from "../../containers/post/Tags";
import axios from "../../instance/axios";

const mapStateToProps = (state) => ({
  tags: state.lab.post.tags,
});

const mapDispatchToProps = (dispatch) => ({
  tagsDelete: (post, tagName) => {
    axios
      .delete(`/posts/${post.id}/tag`, { data: { name: tagName } })
      .then(({ data: count }) => {
        if (count === 1) {
          dispatch(tagsDelete(tagName));
        }
      });
  },
});

export default connect(mapStateToProps, mapDispatchToProps)(Tags);
