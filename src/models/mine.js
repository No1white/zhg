import {
  sendVerifyCode,
  login,
  register,
  autonym
} from '../services/mine'
import { Toast } from 'antd-mobile'
import storage from '../utils/storage'
const initState = {

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
    *sendVerifyCode({ payload }, { call, put }) {
      const reqParams = payload || {};
      const { data } = yield call(sendVerifyCode, reqParams);
      console.log(data);

      // yield put({
        //   type: 'save',
        //   payload: {
        //     hotList: data.list
        //   },
        // });
    },
    *register({ payload,callback }, { call, put }) {
      const reqParams = payload || {};
      console.log(payload);
      const { data } = yield call(register, reqParams);

      console.log(data);
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
      console.log(payload);
      const { data } = yield call(login, reqParams);

      console.log(data);
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
    *autonym({ payload,callback }, { call, put }) {
      const reqParams = payload || {};
      console.log(payload);
      const { data } = yield call(autonym, reqParams);

      console.log(data);
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
  },

  reducers: {
    save(state, action) {
      return { ...state, ...action.payload };
    }
  }

};
