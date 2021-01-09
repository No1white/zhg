import React, { Component } from 'react'
import { List, InputItem, WhiteSpace,Toast,TextareaItem,Picker,Button } from 'antd-mobile';
import ImagePicker from '../components/ImagePicker'

import styles from './index.less'
import { createForm } from 'rc-form';
const seasons = [

    {
      label: '全新',
      value: '0',
    },
    {
      label: '95新',
      value: '1',
    },
    {
      label: '8成新',
      value: '2',
    },
    {
      label: '二手',
      value: '3',
    },

];
const dealWays = [
  {
    label: '自提',
    value: '0',
  },
  {
    label: '快递（货到付款）',
    value: '1',
  },
  {
    label: '包邮',
    value: '2',
  },
  {
    label: '线下交易',
    value: '3',
  },
]
class index extends Component {
  constructor(props) {
    super(props);
    this.state = {
      files: []
    }
  }

  ImagePickeronChange = (files, type, index) => {
    console.log(files, type, index);
    this.setState({
      files,
    });
  }
  publish = ()=> {
    this.props.form.validateFields({ force: true }, (error) => {
      if (!error) {
        console.log(this.props.form.getFieldsValue());
        console.log(this.state);
      }
      else {

        const key =  Object.keys(error)[0];
        Toast.info(error[key].errors[0].message);
      }
    });
  }
  render() {
    const { getFieldProps } = this.props.form;
    return (
      <div className={styles.salePageWrap}>
        <form>
        <List >
          <InputItem
            {...getFieldProps('title',
              {
                rules: [
                  { required: true, message: '请输入商品名称' },
                ],
              }
              )}
            clear
            placeholder="请输入商品名称"
            ref={el => this.autoFocusInst = el}
          ><span className={'must'}>*</span>商品标题</InputItem>
          <List.Item>
            <TextareaItem
              {...getFieldProps('describe')}
              // title="高度自适应"
              autoHeight
              labelNumber={5}
              placeholder="请输入商品描述"
              row ={5}
            />
          </List.Item>
          <Picker data={seasons} cols={1} {...getFieldProps('degree',{
              rules: [
                { required: true, message: '请选择新旧程度' },
              ],
          })} className="forss">
            <List.Item arrow="horizontal"><span className={'must'}>*</span>新旧程度</List.Item>
          </Picker>
          <Picker data={seasons} cols={1} {...getFieldProps('effect',{
              rules: [
                { required: true, message: '请选择有无影响使用' },
              ],
          })} className="forss">
            <List.Item arrow="horizontal"><span className={'must'}>*</span>有无影响使用</List.Item>
          </Picker>
          <InputItem
            {...getFieldProps('explain')}
            clear
            placeholder="如有影响使用,请填写指明"
            ref={el => this.autoFocusInst = el}
          >原因</InputItem>
          <Picker data={dealWays} cols={1} {...getFieldProps('dealWay',{
               rules: [
                { required: true, message: '请选择交易方式' },
              ],
          })} className="forss">
            <List.Item arrow="horizontal"><span className={'must'}>*</span>交易方式</List.Item>
          </Picker>
          <InputItem
              {...getFieldProps('price',{
                  rules: [
                  { required: true, message: '请输入价格' },
                ],
              })}
              placeholder="0.00"
              extra="¥"
            ><span className={'must'}>*</span>价格</InputItem>
          <ImagePicker files={this.state.files} onChange={this.ImagePickeronChange}></ImagePicker>
          <Button onClick={this.publish}>发布</Button>
          </List>
        </form>

      </div>
    )
  }
}
export default createForm()(index)
