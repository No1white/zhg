import {
  sendVerifyCode,
  login,
  register,
  autonym,
  getPublishGoodList,
  saveAddressInfo,
  getLevelAddress,
  getAddressList,
  alterAddress,
  delAddress,
  getOrderList,
  acceprtExChange,
  getSaledGood,
  getOrderDetail,
  logisticsNumber,
  getLogisticsInfo,
  reFound,
  confirmGood,
  acceptReFound,
  changeUserInfo,
  concealOrder,
  delOrder,
  forget,
  fillAliPayId,
  updatePwd,
  updatePhone,
  getCollectListInfo,
  getAttentionListInfo,
  getCountAll,
} from '../services/mine'
import { Toast } from 'antd-mobile'
import storage from '../utils/storage'
const initState = {
  BASE_URL: 'http://qn2pi0q2o.hn-bkt.clouddn.com/',
  levelAddress: [],  // 城 镇 村 级联
  orderList: [], // 订单列表
  saledGoodList: [], //已售出商品列表
  orderInfo: {}, // 订单详情
  goodInfo:{}, //订单商品详情
  addressInfo: {}, //订单地址详情
  collectListInfo:[], //收藏列表
  attentionListInfo: [], //关注的人
}
export default {

  namespace: 'mine',

  state: initState,

  subscriptions: {
    setup({ dispatch, history }) {  // eslint-disable-line
    },
  },

  effects: {
    *fetch({ payload }, { call, put }) {  // eslint-disable-line
      yield put({ type: 'save' });
    },

    *getOrderList({ payload }, { call, put }) {
      const reqParams = payload || {};
      const { data } = yield call(getOrderList, reqParams);

      yield put({
        type: 'save',
        payload: {
          orderList: data.orderList
        },
      });
    },
    // 发送验证码
    *sendVerifyCode({ payload }, { call, put }) {
      const reqParams = payload || {};
      const { data } = yield call(sendVerifyCode, reqParams);
      // yield put({
        //   type: 'save',
        //   payload: {
        //     hotList: data.list
        //   },
        // });
    },

    *updatePhone({ payload,callback }, { call, put }) {
      const reqParams = payload || {};
      const { data } = yield call(updatePhone, reqParams);
      if(data.code === 0 || data.code === '0') {
        Toast.info(data.msg);
        callback(data);
      }else {
        Toast.info(data.msg);
      }
      yield put({
          type: 'save',
          payload: {
            userInfo: data.userInfo
          },
        });
    },
    *updatePwd({ payload,callback }, { call, put }) {
      const reqParams = payload || {};
      const { data } = yield call(updatePwd, reqParams);
      if(data.code === 0 || data.code === '0') {
        Toast.info(data.msg);
        callback(data);
      }else {
        Toast.info(data.msg);
      }
      yield put({
          type: 'save',
          payload: {
            userInfo: data.userInfo
          },
        });
    },
    *register({ payload,callback }, { call, put }) {
      const reqParams = payload || {};
      const { data } = yield call(register, reqParams);

      storage.set('userInfo',data.userInfo);
      if(data.code === 0 || data.code === '0') {
        callback(data);
      }else {
        Toast.info(data.msg);
      }
      yield put({
          type: 'save',
          payload: {
            userInfo: data.userInfo
          },
        });
    },

    *getCollectListInfo({ payload,callback }, { call, put }) {
      const reqParams = payload || {};
      const { data } = yield call(getCollectListInfo, reqParams);
      yield put({
        type: 'save',
        payload: {
          collectListInfo: data.collectListInfo,
        },
      });
    },
    *fillAliPayId({ payload,callback }, { call, put }) {
      const reqParams = payload || {};
      const { data } = yield call(fillAliPayId, reqParams);

      if(data.code === 0 || data.code === '0') {
        const userInfo = storage.get('userInfo');
        userInfo.aliPayId = data.aliPayId;
        // callback(data);
        storage.set('userInfo',userInfo)
        Toast.info(data.msg);
      }else {
        Toast.info(data.msg);
      }

    },

    *getCountAll({ payload,callback }, { call, put }) {
      const reqParams = payload || {};
      const { data } = yield call(getCountAll, reqParams);
      if(data.code === 0 || data.code ==='0') {
        callback(data)
      }else {
        Toast.info(data.msg);
      }

    },
    // 忘记密码
    *forget({ payload,callback }, { call, put }) {
      const reqParams = payload || {};
      const { data } = yield call(forget, reqParams);

      if(data.code === 0 || data.code === '0') {
        callback(data);
        Toast.info(data.msg);
      }else {
        Toast.info(data.msg);
      }

    },
    *login({ payload,callback }, { call, put }) {
      const reqParams = payload || {};
      const { data } = yield call(login, reqParams);

      storage.set('userInfo',data.userInfo);

      if(data.code === 0 || data.code === '0') {
        callback(data);
        Toast.info(data.msg);
      } else {
        Toast.info(data.msg);
        return ;
      }
      yield put({
          type: 'save',
          payload: {
            userInfo: data.userInfo
          },
        });
    },
    // 实名
    *autonym({ payload,callback }, { call, put }) {
      const reqParams = payload || {};
      const { data } = yield call(autonym, reqParams);

      storage.set('userInfo',data.userInfo);
      if(data.code === 0 || data.code === '0') {
        Toast.info(data.msg);
        callback(data);
      }else {
        Toast.info(data.msg);
        return ;
      }
      yield put({
          type: 'save',
          payload: {
            userInfo: data.userInfo
          },
        });
    },
    // 获取发布的商品
    *getPublishGoodList({ payload,callback }, { call, put }) {
      const reqParams = payload || {};
      const { data } = yield call(getPublishGoodList, reqParams);

      // storage.set('userInfo',data.userInfo);
      if(data.code === 0 || data.code === '0') {
        yield put({
          type: 'save',
          payload: {
            publishGoodList:data.goodList
          },
        });
      }else {
        Toast.info(data.msg);
        return ;
      }

    },
    // 保存地址信息
    *saveAddressInfo({ payload,callback }, { call, put }) {
      const reqParams = payload || {};
      const { data } = yield call(saveAddressInfo, reqParams);

      // storage.set('userInfo',data.userInfo);
      if(data.code === 0 || data.code === '0') {
        callback();
        Toast.info(data.msg);
      }else {
        Toast.info(data.msg);
        return ;
      }

    },
    // 获取三级联动数据
    *getLevelAddress({ payload,callback }, { call, put }) {
      const reqParams = payload || {};
      const { data } = yield call(getLevelAddress, reqParams);
      if(data.code === 0 || data.code === '0') {
        yield put({
          type: 'save',
          payload: {
            levelAddress:data.data
          },
        });
      }else {
        Toast.info(data.msg);
        return ;
      }

    },
    *getAddressList({ payload,callback }, { call, put }) {
      const reqParams = payload || {};
      const { data } = yield call(getAddressList, reqParams);
      if(data.code === 0 || data.code === '0') {
        yield put({
          type: 'save',
          payload: {
            addressList:data.addressList
          },
        });
      const addressList  = data.addressList.map(item => {
        if(item.defaultAddress === 0) {
          let temp = {
            ...item,
            checked:true,
          };
          return temp;
        }else {
          let temp = {
            ...item,
            checked:false,
          };
          return temp;
        }
      })
        storage.set('addressList',addressList)
      }else {
        Toast.info(data.msg);
        return ;
      }

    },
    *alterAddress({ payload,callback }, { call, put }) {
      const reqParams = payload || {};
      const { data } = yield call(alterAddress, reqParams);
      if(data.code === 0 || data.code === '0') {
        callback();
        Toast.info(data.msg);
      }else {
        Toast.info(data.msg);
        return ;
      }
    },
    *delAddress({ payload,callback }, { call, put }) {
      const reqParams = payload || {};
      const { data } = yield call(delAddress, reqParams);
      if(data.code === 0 || data.code === '0') {
        callback();
        Toast.info(data.msg);
      }else {
        Toast.info(data.msg);
        return ;
      }

    },
    // 取消订单
    *concealOrder({ payload,callback}, { call, put }) {
      const reqParams = payload || {};
      const { data } = yield call(concealOrder, reqParams);
      if(data.code === 0 || data.code ==='0') {
        callback(data)
      }else {
        Toast.info(data.msg);
      }
      // yield put({
      //   type: 'save',
      //   payload: {
      //     msg: data.msg,
      //   },
      // });
    },
    *delOrder({ payload,callback}, { call, put }) {
      const reqParams = payload || {};
      const { data } = yield call(delOrder, reqParams);
      if(data === 0 || data ==='0') {
        callback(data)
      }else {
        Toast.info(data.msg);
      }
      // yield put({
      //   type: 'save',
      //   payload: {
      //     msg: data.msg,
      //   },
      // });
    },

    *getAttentionListInfo({ payload,callback}, { call, put }) {
      const reqParams = payload || {};
      const { data } = yield call(getAttentionListInfo, reqParams);
      // if(data === 0 || data ==='0') {
      //   callback(data)
      // }else {
      //   Toast.info(data.msg);
      // }
      yield put({
        type: 'save',
        payload: {
          attentionListInfo: data.attentionListInfo,
        },
      });
    },
    *acceprtExChange({ payload,callback}, { call, put }) {
      const reqParams = payload || {};
      const { data } = yield call(acceprtExChange, reqParams);
      if(data === 0 || data ==='0') {
        callback(data)
      }else {
        Toast.info(data.msg);
      }
      // yield put({
      //   type: 'save',
      //   payload: {
      //     msg: data.msg,
      //   },
      // });
    },
    *getSaledGood({ payload,callback}, { call, put }) {
      const reqParams = payload || {};
      const { data } = yield call(getSaledGood, reqParams);
      yield put({
        type: 'save',
        payload: {
          saledGoodList: data.goodList,
        },
      });
    },

    *getOrderDetail({ payload,callback}, { call, put }) {
      const reqParams = payload || {};
      const { data } = yield call(getOrderDetail, reqParams);
      yield put({
        type: 'save',
        payload: {
          addressInfo: data.addressInfo,
          goodInfo: data.goodInfo,
          orderInfo: data.orderInfo
        },
      });
    },

    *logisticsNumber({ payload,callback}, { call, put }) {
      const reqParams = payload || {};
      const { data } = yield call(logisticsNumber, reqParams);
      callback(data);
      // yield put({
      //   type: 'save',
      //   payload: {
      //     addressInfo: data.addressInfo,
      //     goodInfo: data.goodInfo,
      //     orderInfo: data.orderInfo
      //   },
      // });
    },

    // 获取物流信息
    *getLogisticsInfo({ payload,callback}, { call, put }) {
      const reqParams = payload || {};
      const { data } = yield call(getLogisticsInfo, reqParams);


      yield put({
        type: 'save',
        payload: {
          logisticsInfo: data.logisticsInfo,
        },
      });
    },
    *reFound({ payload,callback}, { call, put }) {
      const reqParams = payload || {};
      const { data } = yield call(reFound, reqParams);
      if(data.code ===0) {
        callback(data);

      }else {
        Toast.info(data.msg);
      }
      // yield put({
      //   type: 'save',
      //   payload: {
      //     logisticsInfo: data.logisticsInfo,
      //   },
      // });
    },

    *acceptReFound({ payload,callback}, { call, put }) {
      const reqParams = payload || {};
      const { data } = yield call(acceptReFound, reqParams);


      // yield put({
      //   type: 'save',
      //   payload: {
      //     logisticsInfo: data.logisticsInfo,
      //   },
      // });
    },
    *confirmGood({ payload,callback}, { call, put,select }) {
      const reqParams = payload || {};
      const { data } = yield call(confirmGood, reqParams);
      // 此处代码用于页面刷新作用
      const thisData1 = yield select(state => state.mine);
      const {orderList} = thisData1;
      callback(data)
      yield put({
        type: 'save',
        payload: {
          orderList
        },
      });
    },
    *changeUserInfo({ payload,callback}, { call, put,select }) {
      const reqParams = payload || {};
      const { data } = yield call(changeUserInfo, reqParams);
      // 此处代码用于页面刷新作用
      callback(data)
      // const thisData1 = yield select(state => state.mine);
      // const {orderList} = thisData1;
      // callback(data)
      // yield put({
      //   type: 'save',
      //   payload: {
      //     orderList
      //   },
      // });
    },

  },

  reducers: {
    save(state, action) {
      return { ...state, ...action.payload };
    }
  }

};
