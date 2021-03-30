/*
 * @Author: your name
 * @Date: 2021-02-02 20:26:58
 * @LastEditTime: 2021-03-22 09:36:14
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: \zhg\src\models\goodDetail.js
 */
/*
 * @Author: your name
 * @Date: 2020-12-28 17:42:14
 * @LastEditTime: 2021-02-01 18:39:32
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: \zhg\src\models\home.js
 */
import { Toast } from 'antd-mobile';
import {
  getGoodDetailInfo,
  addBrouse,
  collectGood,
  attentionUser,
  getCollectFlag,
  getAttentionFlag,
} from '../services/goodDetail'
const initState = {
  goodDetailInfo: {},
  collectFlag:false,
  attentionFlag:false,
}
export default {

  namespace: 'goodDetail',

  state: initState,

  subscriptions: {
    setup({ dispatch, history }) {  // eslint-disable-line
    },
  },

  effects: {
    *fetch({ payload }, { call, put }) {  // eslint-disable-line
      yield put({ type: 'save' });
    },
    *getGoodDetailInfo({ payload }, { call, put }) {
      const reqParams = payload || {};
      const { data } = yield call(getGoodDetailInfo, reqParams);
        yield put({
          type: 'save',
          payload: {
            goodDetailInfo:data.goodDetailInfo
          },
        });
    },
    *addBrouse({ payload }, { call, put }) {
      const reqParams = payload || {};
      const { data } = yield call(addBrouse, reqParams);
        // yield put({
        //   type: 'save',
        //   payload: {

        //   },
        // });
    },
    *collectGood({ payload,callback}, { call, put }) {
      const reqParams = payload || {};
      const { data } = yield call(collectGood, reqParams);
      if(data.code ===0 || data.code === '0') {
        callback({collectFlag:data.collectFlag});
      }else {
        Toast.info(data.msg);
      }
        // yield put({
        //   type: 'save',
        //   payload: {
        //     collectFlag:data.collectFlag
        //   },
        // });
    },
    *attentionUser({ payload,callback}, { call, put }) {
      const reqParams = payload || {};
      const { data } = yield call(attentionUser, reqParams);
      if(data.code ===0 || data.code === '0') {
        callback({attentionFlag:data.attentionFlag});
      }else {
        Toast.info(data.msg);
      }
        // yield put({
        //   type: 'save',
        //   payload: {

        //   },
        // });
    },
    *getAttentionFlag({ payload,callback }, { call, put }) {
      const reqParams = payload || {};
      const { data } = yield call(getAttentionFlag, reqParams);
      if(data.code ===0 || data.code === '0') {
        callback({collectFlag:data.collectFlag});
      }else {
        Toast.info(data.msg);
      }
        // yield put({
        //   type: 'save',
        //   payload: {

        //   },
        // });
    },

    *getCollectFlag({ payload,callback }, { call, put }) {
      const reqParams = payload || {};
      const { data } = yield call(getCollectFlag, reqParams);
      if(data.code ===0 || data.code === '0') {
        callback({collectFlag:data.collectFlag,attentionFlag:data.attentionFlag});
      }else {
        Toast.info(data.msg);
      }
        // yield put({
        //   type: 'save',
        //   payload: {
        //     collectFlag: data.collectFlag,
        //     attentionFlag: data.attentionFlag,
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
