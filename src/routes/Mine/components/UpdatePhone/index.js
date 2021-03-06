import React, { Component } from 'react'
import { connect } from 'dva'
import { List, InputItem, WhiteSpace, Button, Toast } from 'antd-mobile';
import { createForm } from 'rc-form';
import storage from '@/utils/storage'
import goTo from '../../../../utils/goTo'
import styles from './index.less'

const Item = List.Item;
class index extends Component {
  constructor(props) {
    super(props);
    this.state = {
      hint: '获取验证码',
      codeFlag: false,
      msg:''
    }
  }
  sendVerifyCode = (phone) => {
    this.props.dispatch({
      type: 'mine/sendVerifyCode',
      payload: {
        phone
      },

    })

  }
  goToMine = ()=>{
    goTo('mine',this.props.history)
  }
  // 处理点击事件
  handleGetCode = ()=> {
    const { getFieldsValue } = this.props.form;
    const {codeFlag,hint} = this.state;
    const values = getFieldsValue();
    var myreg = /^[1][3,4,5,7,8,9][0-9]{9}$/;
    if (!myreg.test(values.phone)) {
      Toast.info('手机号格式不正确')
    } else {
      let i =60;
      // 判断重复点击
      if(codeFlag) {
        return 0;
      }

      setInterval(item =>{
        if(i>0) {
          i--;
          this.setState({
            hint: `获取验证码(${i})`,
            codeFlag: true,
          });
        } else {

          this.setState({
            hint: `获取验证码`
          });

        }
      },1000);
      // 发送验证码
      this.sendVerifyCode(values.phone);
    }


  }
  validValue = ()=>{
    let reg = '';
    let flag= 0;
    const { getFieldsValue } = this.props.form;
    const values = getFieldsValue();
    Object.keys(values).forEach(item =>{
      // eslint-disable-next-line default-case
      switch(item) {

        case 'phone':
          reg = /^[1][3,4,5,7,8,9][0-9]{9}$/;
          if(!reg.test(values[item])) {
            this.setState({
              msg: '输入手机号格式错误'
            });

          }else {
            flag++;

          }
          break;
        case 'verifyCode':
          reg = /[0-9]{6}/;
          if(!reg.test(values[item])) {
            this.setState({
              msg: '验证码错误'
            })
          } else {
            flag++;

          }
          break;
      }
    });
    if(flag ===2) {
      this.regiter();
    }else {
      return ;
    }
  }
  regiter = () => {
    const { getFieldsValue } = this.props.form;
    const userInfo = storage.get('userInfo');
    const {match:{params:{flag}}} = this.props;
    const values = getFieldsValue();
      this.props.dispatch({
        type: 'mine/updatePhone',
        payload: {
          ...values,
          userId: userInfo.userId,
        },
        callback: (res)=> {
          goTo('/mine',this.props.history)
        },
      })

  }
  renderLogin = () =>{
    const { getFieldProps } = this.props.form;
    const {hint,codeFlag,msg}  = this.state;
    return (
      <div className={styles.operateWrap}>
          <List className={styles.form} >
            {/* <InputItem
              {...getFieldProps('phone')}
              placeholder="请输入手机号"
              className={'userName'}
            >
              <span className={`iconfont icon-shouji ${styles.inputIcon}`} />
            </InputItem> */}

            <InputItem
              {...getFieldProps('password')}
              type="password"
              placeholder="请输入登录密码"
              className={'userName'}
            >
              <span className={'iconfont icon-iconfont17'} />
            </InputItem>

            <InputItem
              {...getFieldProps('phone')}
              placeholder="请输入新手机号"
              className={'userName'}
            >
              <span className={`iconfont icon-shouji ${styles.inputIcon}`} />
            </InputItem>
            <div className={styles.verifyCodeInput}>
              <span className={'iconfont icon-iconfont17'} />
              <InputItem
                {...getFieldProps('verifyCode')}
                className={styles.verifyInput}
                placeholder="请输入验证码"
              />
              <span className={`${styles.btnVerify} themeColor ${codeFlag ? 'disableBtn' : 'ableBtn'}`} onClick={this.handleGetCode}>{hint}</span>
            </div>
            {/* <InputItem
              {...getFieldProps('newPhone2')}
              placeholder="请再次输入手机号"
              className={'userName'}
            >
              <span className={`iconfont icon-shouji ${styles.inputIcon}`} />
            </InputItem> */}


            <p className={styles.info}>{msg}</p>
        </List>
          <Button className={styles.submitBtn} onClick={this.validValue} >修改</Button>
      </div>

    )
  }
  render() {
    const {match:{params:{flag}}} = this.props;
    return (
      <div className={styles.userPageWrap}>
        <div className={styles.closeBtn} onClick={()=> {this.props.history.goBack(-1)}}>
          <span className={`iconfont icon-guanbi ${styles.close}`}></span>
        </div>
        <div className={styles.appTitle}>{flag ==1 ? '修改密码':'修改手机号'}</div>
        <div className={styles.formWrap}>
          <div className={styles.titleWrap}>
            {/* <p className={styles.label}>已有账号，
              <span className={styles.swtichBtn} onClick={()=>{goTo('login',this.props.history)}}>去登录</span>
            </p> */}
          </div>
          {this.renderLogin()}
        </div>
      </div>
    )
  }
}
const Register = createForm()(index)
const mapStateToProps = state =>({

})

export default connect(mapStateToProps)(Register)
