import React, {useEffect, useState} from 'react';
import axios from 'axios';
import Input from '@material-ui/core/Input';
import Grid from '@material-ui/core/Grid';
import Fab from '@material-ui/core/Fab';
import CheckIcon from '@material-ui/icons/Check';
import ErrorIcon from '@material-ui/icons/ErrorOutline';
import SaveIcon from '@material-ui/icons/Save';
import CircularProgress from '@material-ui/core/CircularProgress';
import {makeStyles} from '@material-ui/core/styles';
import {green, red} from '@material-ui/core/colors';
import clsx from 'clsx';
import Swal from 'sweetalert2';
import {useRouteMatch} from 'react-router-dom';
import {Editor} from '@toast-ui/react-editor';
import codeSyntaxHightlight
  from '@toast-ui/editor-plugin-code-syntax-highlight';
import tableMergedCell from '@toast-ui/editor-plugin-table-merged-cell';
import colorSyntax from '@toast-ui/editor-plugin-color-syntax';
import uml from '@toast-ui/editor-plugin-uml';
import chart from '@toast-ui/editor-plugin-chart';
import 'codemirror/lib/codemirror.css';
import '@toast-ui/editor/dist/toastui-editor.css';
import 'highlight.js/styles/atom-one-dark.css';
import hljs from 'highlight.js';
import javascript from 'highlight.js/lib/languages/javascript';
import php from 'highlight.js/lib/languages/php';
import 'tui-color-picker/dist/tui-color-picker.css';
import 'tui-chart/dist/tui-chart.css';
import '@toast-ui/editor/dist/i18n/zh-cn';

hljs.registerLanguage('javascript', javascript);
hljs.registerLanguage('php', php);

const useStyles = makeStyles(theme => ({
  '@global': {
    '.te-preview, .tui-editor-contents p': {
      color: theme.palette.type === 'dark' && 'white !important',
    },
    '.CodeMirror': {
      background: theme.palette.type === 'dark' && 'unset !important',
      color: theme.palette.type === 'dark' && 'white !important',
    },
  },
  buttonSuccess: {
    backgroundColor: green[500],
    '&:hover': {
      backgroundColor: green[700],
    },
  },
  buttonError: {
    backgroundColor: red[500],
    '&:hover': {
      backgroundColor: red[700],
    },
  },
  fabProgress: {
    color: green[500],
    marginBottom: -30,
    marginLeft: -62,
    zIndex: 1,
  },
}));

const PostCreate = () => {
  const classes = useStyles();
  const match = useRouteMatch();
  const [id, setId] = useState(0);
  const [title, setTitle] = React.useState('');
  const [content, setContent] = useState('');
  const [loading, setLoading] = React.useState(false);
  const [success, setSuccess] = React.useState(false);
  const [errors, setErrors] = React.useState(false);

  const editorRef = React.createRef();

  useEffect(() => {
    if (match.params.id) {
      setId(match.params.id);

      axios.get(`posts/${match.params.id}`).then(({data}) => {
        setTitle(data.title);
        setContent(data.content);
      });
    }
  }, [match.params.id]);

  const handlePost = () => {
    if (!loading) {
      setSuccess(false);
      setLoading(true);
    }

    let url = id ? `posts/${id}` : 'posts';
    let method = id ? 'put' : 'post';

    axios({
      method: method,
      url: url,
      data: {
        title: title,
        content: content,
      },
    }).then(({data}) => {
      setId(data.id);
      setSuccess(true);
      setLoading(false);
    }).catch(error => {
      let errors = error.response.data.errors;
      setErrors(errors);
      Swal.fire(error.response.data.message,
        (errors.title !== undefined ? errors.title[0] : '') +
        (errors.content !== undefined ? errors.content[0] : ''),
        'error');
      setSuccess(false);
      setLoading(false);
    });
  };

  const handleEditorChange = () => {
    setContent(editorRef.current.getInstance().getMarkdown());
  };

  const handleTitleChange = event => {
    setTitle(event.target.value);
  };

  const buttonClassname = errors ?
    clsx({[classes.buttonError]: errors})
    :
    clsx({[classes.buttonSuccess]: success});

  return (
    <Grid container spacing={2} justify={'center'}>
      <Grid item xs={4}>
        <Input
          fullWidth
          value={title}
          placeholder="请输入标题"
          inputProps={{'aria-label': 'description'}}
          onChange={handleTitleChange}
        />
      </Grid>
      <Grid item xs={12}>
        <Editor
          placeholder='Please enter text.'
          initialValue={content}
          previewStyle="vertical"
          initialEditType="markdown"
          height="600px"
          useCommandShortcut={true}
          language="zh-CN"
          plugins={[
            [codeSyntaxHightlight, {hljs}],
            colorSyntax,
            tableMergedCell,
            uml,
            chart]}
          ref={editorRef}
          onChange={handleEditorChange}
          hooks={{
            addImageBlobHook: (fileOrBlob, callback, source) => {
              console.log(fileOrBlob);
              console.log(callback);
            },
          }}
        />
      </Grid>
      <Grid item xs={12} style={{position: 'relative', textAlign: 'center'}}>
        <Fab
          aria-label="save"
          color="primary"
          className={buttonClassname}
          onClick={handlePost}
        >
          {success ? <CheckIcon/> : (errors ? <ErrorIcon/> : <SaveIcon/>)}
        </Fab>
        <CircularProgress
          size={68}
          className={classes.fabProgress}
          style={{visibility: loading ? 'visible' : 'hidden'}}/>
      </Grid>
    </Grid>
  );
};

export default PostCreate;
