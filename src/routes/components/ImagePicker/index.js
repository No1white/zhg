/*
 * @Author: your name
 * @Date: 2021-01-08 19:48:38
 * @LastEditTime: 2021-02-23 17:19:38
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: \zhg\src\routes\components\ImagePicker\index.js
 */
import React, { Component } from 'react'
import { ImagePicker } from 'antd-mobile';
import {connect} from 'dva';
import styles from './index.less'

const data = [{
  url: 'https://zos.alipayobjects.com/rmsportal/PZUUCKTRIHWiZSY.jpeg',
  id: '2121',
}, {
  url: 'https://zos.alipayobjects.com/rmsportal/hqQWgTXdrlmVVYi.jpeg',
  id: '2122',
}];

class index extends Component {
  state = {
    files: data,
  }
  onChange = (files, type, index) => {
    console.log(files);
    console.log(files, type, index);
    this.setState({
      files,
    });
  }
  componentDidMount() {
    let {initialValue=[]} = this.props;
    if(initialValue.length>0) {
      const filesList = initialValue.map((item,index) => {
        return (
          {
            url: item,
            id: index
          }
        )
      });
      this.props.onChange(filesList)
    }

  }
  render() {
    // const { files } = this.state;
    let { onChange,files = [], initialValue=[]} = this.props;
    // console.log(this.props);
    if(initialValue.length>0) {
      const initFiles = initialValue.map((item,index) => {
        // return {
        //   url: this.props.BASE_URL + item,
        //   id: index
        // }
        // files.push({
        //     url: this.props.BASE_URL + item,
        //     id: index
        //   })
      });
      // files = initFiles;
    }

    // console.log(initFiles);
    return (
      <div>
        <ImagePicker
          files={files}
          multiple= {true}

          onChange={onChange}
          onImageClick={(index, fs) => console.log(index, fs)}
          selectable={files.length < 5}
          accept="image/jpeg,image/jpg,image/png"
        />
      </div>
    );
  }

}
const mapStateToProps = (state) => ({
  BASE_URL: state.sale.BASE_URL
})
export default connect(mapStateToProps)(index)
