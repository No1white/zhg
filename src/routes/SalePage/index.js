import React, { Component } from 'react'
import { List, InputItem, WhiteSpace,Toast,TextareaItem,Picker,Button,Switch} from 'antd-mobile';
import ImagePicker from '../components/ImagePicker'
import { connect } from 'dva';
import storage from '@/utils/storage'
import utils from '@/utils/utils.js'
import goTo from '@/utils/goTo.js'
import styles from './index.less'
import { createForm } from 'rc-form';
import { getKeyThenIncreaseKey } from 'antd/lib/message';
const degreeList = [

    {
      label: '全新',
      value: '0',
    },
    {
      label: '95新',
      value: '1',
    },
    {
      label: '9成新',
      value: '2',
    },
    {
      label: '8成新',
      value: '3',
    },
    {
      label: '二手',
      value: '4',
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

]
const effects = [
  {
    label: '有影响',
    value: '1',
  },
  {
    label: '无影响',
    value: '0',
  }
]
const category = [
  {
    label: '服装',
    value:'0'
  },
  {
    label: '数码',
    value:'1'
  },
  {
    label: '百货',
    value:'2'
  },
  {
    label: '配饰',
    value:'3'
  },
  {
    label: '潮玩',
    value:'4'
  },
  {
    label: '美妆',
    value:'5'
  },
  {
    label: '食品',
    value:'6'
  },
  {
    label: '家居',
    value:'7'
  },
  {
    label: '其他',
    value:'8'
  },
]

class index extends Component {
  constructor(props) {
    super(props);
    this.state = {
      files: [],
      checked: false,
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
        const userInfo = storage.get('userInfo');
        const values = this.props.form.getFieldsValue();
        const obj = utils.getValueFromObjectArr(values);
        console.log('2');
        // obj.imgList = this.state.files;
        this.props.dispatch({
          type: 'sale/publishGood',
          payload: {
            ...obj,
            userId: userInfo.userId,
            imgList: this.state.files,
            swap: this.state.checked ? 1 : 0,
          },
          callback: (res)=> {
            goTo('/success',this.props.history,{msg: res.msg})
          },
        })

      }
      else {

        const key =  Object.keys(error)[0];
        Toast.info(error[key].errors[0].message);
      }
    });
  }
  renderList = () => {
    const { getFieldProps } = this.props.form;
    const { history } = this.props;
    const { location } = history;
    const { query = {} } = location;
    const { goodInfo = {}} = query;

  }
  render() {

    console.log(this.props);
    const { getFieldProps } = this.props.form;
    const { history } = this.props;
    const { location } = history;
    const { query = {} } = location;
    const { goodInfo = {}} = query;
    return (
      <div className={styles.salePageWrap}>
        {/* {this.renderList()} */}
        <form>
          <List >
            <InputItem
              {...getFieldProps('title',

                {
                  initialValue: goodInfo.title || '',
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
                {...getFieldProps('dep', {
                  initialValue: goodInfo.dep || '',
                })}
                // title="高度自适应"
                autoHeight
                labelNumber={5}
                placeholder="请输入商品描述"
                row ={5}
              />
            </List.Item>
            <Picker data={degreeList} cols={1} {...getFieldProps('degree',{
                initialValue: goodInfo.new || '',
                rules: [
                  { required: true, message: '请选择新旧程度' },
                ],
            })} className="forss">
              <List.Item arrow="horizontal"><span className={'must'}>*</span>新旧程度</List.Item>
            </Picker>
            <Picker data={category} cols={1} {...getFieldProps('category',{
                // rules: [
                //   { required: true, message: '请选择商品种类' },
                // ],
            })} className="forss">
              <List.Item arrow="horizontal"><span className={'must'}>*</span>商品种类</List.Item>
            </Picker>
            <Picker data={effects} cols={1} {...getFieldProps('effect',{
                // rules: [
                //   { required: true, message: '请选择有无影响使用' },
                // ],
            })} className="forss">
              <List.Item arrow="horizontal"><span className={'must'}>*</span>有无影响使用</List.Item>
            </Picker>
            <InputItem
              {...getFieldProps('reason')}
              clear
              placeholder="如有影响使用,请填写指明"
              ref={el => this.autoFocusInst = el}
            >原因</InputItem>
            <Picker data={dealWays} cols={1} {...getFieldProps('dealWay',{
                //  rules: [
                //   { required: true, message: '请选择交易方式' },
                // ],
            })} className="forss">
              <List.Item arrow="horizontal"><span className={'must'}>*</span>交易方式</List.Item>
            </Picker>
            <InputItem
                {...getFieldProps('price',{
                  //   rules: [
                  //   { required: true, message: '请输入价格' },
                  // ],
                })}
                placeholder="0.00"
                extra="¥"
              ><span className={'must'}>*</span>价格</InputItem>
            <List.Item
                extra={<Switch
                  checked={this.state.checked}
                  onChange={() => {
                    this.setState({
                      checked: !this.state.checked,
                    });
                  }}
                />}
              >是否接受置换</List.Item>
            <ImagePicker files={this.state.files} onChange={this.ImagePickeronChange}></ImagePicker>
            <Button onClick={this.publish}>发布</Button>
            </List>
        </form>
      </div>
    )
  }
}
const saleWrap = createForm()(index);
export default connect()(saleWrap)
