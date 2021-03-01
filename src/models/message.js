/*
 * @Author: your name
 * @Date: 2021-02-04 21:41:04
 * @LastEditTime: 2021-02-08 21:56:28
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: \zhg\src\models\message.js
 */
import {
  getReceiverInfo,
  getMessageList,
  getMessage,
} from '../services/message'
import { Toast } from 'antd-mobile'
import storage from '../utils/storage'
const initState = {
  BASE_URL: 'http://qn2pi0q2o.hn-bkt.clouddn.com/',
  receiverInfo: {},
  messageList: [],
  message: [],
}
export default {

  namespace: 'message',

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
    *getReceiverInfo({ payload }, { call, put }) {
      const reqParams = payload || {};
      const { data } = yield call(getReceiverInfo, reqParams);
      yield put({
          type: 'save',
          payload: {
            receiverInfo: data.receiverInfo
          },
        });
    },
    // 获取消息列表
    *getMessageList({ payload }, { call, put }) {
      const reqParams = payload || {};
      const { data } = yield call(getMessageList, reqParams);
      yield put({
          type: 'save',
          payload: {
            messageList: data.messageList
          },
        });
    },

    *getMessage({ payload }, { call, put }) {
      const reqParams = payload || {};
      const { data } = yield call(getMessage, reqParams);
      yield put({
          type: 'save',
          payload: {
            message: data.message
          },
        });
    },
    *addMessage({ payload }, { call, put }) {
      console.log(payload);
      yield put({
          type: 'save',
          payload: {
            message: payload.message,
          },
        });
    },
  },

  reducers: {
    save(state, action) {
      return { ...state, ...action.payload };
    },
    saveMessage(state, action) {
      let newState = JSON.parse(JSON.stringify(state));
      newState.message.push(action.payload.message)
      return newState
    }
  }

};
