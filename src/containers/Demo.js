import React from 'react'
import { Link } from 'react-router-dom'

const Demo = () => (
    <div>
      <ul>
        <li><a href="/demos/threejs/3d.html" target="_blank">Emoji 3D(Three.js)</a></li>
        <li><a href="/demos/threejs/love.html" target="_blank">喜欢的（Three.js）</a></li>
        <li><a href="/demos/threejs/threejs_load_images.html" target="_blank">Three.js 加载图片</a></li>
        <li><a href="/demos/mv.html" target="_blank">MV 测试</a></li>
        <li><a href="/demos/react-test.html" target="_blank">React 单文件测试</a></li>
        <li><a href="/demos/tailwind" target="_blank">Tailwind CSS 学习</a></li>
        <li><Link to="/demos/clock">Time</Link></li>
        <li><Link to="/demos/calculator">🌡摄氏度、华氏度转换（React 官方 Example）</Link></li>
        <li><Link to="/demos/parking">停车（爬虫)</Link></li>
        <li><Link to="/demos/markdown-editor">Markdown 编辑器</Link></li>
        <li><Link to="/demos/markdown">Markdown 渲染</Link></li>
      </ul>
    </div>
);

export default Demo