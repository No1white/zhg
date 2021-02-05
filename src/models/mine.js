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

} from '../services/mine'
import { Toast } from 'antd-mobile'
import storage from '../utils/storage'
const initState = {
  BASE_URL: 'http://qn2pi0q2o.hn-bkt.clouddn.com/',
  levelAddress: []
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

    *register({ payload,callback }, { call, put }) {
      const reqParams = payload || {};
      const { data } = yield call(register, reqParams);

      storage.set('userInfo',data.userInfo);
      if(data.code === 0 || data.code === '0') {
        callback(data);
      }
      yield put({
          type: 'save',
          payload: {
            userInfo: data.userInfo
          },
        });
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
      console.log(data);
      if(data.code === 0 || data.code === '0') {
        yield put({
          type: 'save',
          payload: {
            addressList:data.addressList
          },
        });
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
  },

  reducers: {
    save(state, action) {
      return { ...state, ...action.payload };
    }
  }

};
