import React, { useState, useEffect } from 'react';
import ReactMarkdown from 'react-markdown/with-html'
import MdEditor from 'react-markdown-editor-lite'
import 'react-markdown-editor-lite/lib/index.css';
import Button from '@material-ui/core/Button'
import axios from 'axios'
import CodeBlock from "../demo/CodeBlock";
import HeadingBlock from "../demo/HeadingBlock";
import Input from '@material-ui/core/Input';

const PLUGINS = undefined;

const PostCreate = () => {
  const [id, setId] = useState();
  const [mdEditor, setMdEditor] = useState();
  const [title, setTitle] = React.useState();
  const handleChange = event => {
    setTitle(event.target.value);
  };

  const handlePost = () => {
    let url = id ? `post/${id}` : 'post';
    let method = id ? 'put' : 'post';
    axios({
      method: method,
      url: url,
      data: {
        title: title,
        content: mdEditor
      }
    }).then(resp => {
      setId(resp.data.id);
    });
  };

  const renderHTML = (text) => {
    return (
      <ReactMarkdown source={text} escapeHtml={false} renderers={{
        code: CodeBlock,
        heading: HeadingBlock
      }}/>
    )
  };

  const handleImageUpload = acceptedFiles => {
    return new Promise((resolve, reject) => {
      const file = new Blob([acceptedFiles]);
      const formData = new FormData();
      formData.append('emoji', file, acceptedFiles['name']);
      axios.post('/emoji', formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
          'Accept': "image/*"
        },
        transformRequest: [function (data) {
          return data
        }],
        onUploadProgress: function (e) {
          let percentage = Math.round((e.loaded * 100) / e.total) || 0;
          if (percentage < 100) {
            console.log(percentage + '%');  // 上传进度
          }
        }
      }).then(function (resp) {
        resolve(resp.data.url);
      });
    });
  };

  const handleEditorChange = (it, event) => {
    setMdEditor(it.text);
    // console.log('handleEditorChange', it.text, it.html, event);
  };

  return (
    <div className="demo-wrap">
      <div><Input placeholder="请输入标题" inputProps={{'aria-label': 'description'}} onChange={handleChange}/></div>
      <div className="editor-wrap">
        <MdEditor
          value={mdEditor}
          style={{height: '500px', width: '100%'}}
          renderHTML={renderHTML}
          plugins={PLUGINS}
          config={{
            view: {
              menu: true,
              md: true,
              html: true,
              fullScreen: true,
              hideMenu: true,
            },
            table: {
              maxRow: 5,
              maxCol: 6,
            },
            imageUrl: 'https://octodex.github.com/images/minion.png',
            syncScrollMode: ['leftFollowRight', 'rightFollowLeft'],
          }}
          onChange={handleEditorChange}
          onImageUpload={handleImageUpload}
        />
      </div>
      <div style={{paddingTop: 20, textAlign: 'center'}}>
        <Button variant="contained" color="primary" onClick={handlePost}>{id ? '修改' : '提交'}</Button>
      </div>
    </div>
  );
};

export default PostCreate;