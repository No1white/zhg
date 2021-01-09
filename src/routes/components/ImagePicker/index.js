import React, { Component } from 'react'
import { ImagePicker } from 'antd-mobile';
import styles from './index.less'

const data = [{
  url: 'https://zos.alipayobjects.com/rmsportal/PZUUCKTRIHWiZSY.jpeg',
  id: '2121',
}, {
  url: 'https://zos.alipayobjects.com/rmsportal/hqQWgTXdrlmVVYi.jpeg',
  id: '2122',
}];

export default class index extends Component {
  state = {
    files: data,
  }
  onChange = (files, type, index) => {
    console.log(files, type, index);
    this.setState({
      files,
    });
  }

  render() {
    // const { files } = this.state;
    const { onChange,files } = this.props;
    return (
      <div>
        <ImagePicker
          files={files}
          onChange={onChange}
          onImageClick={(index, fs) => console.log(index, fs)}
          selectable={files.length < 5}
          accept="image/gif,image/jpeg,image/jpg,image/png"
        />
      </div>
    );
  }

}
