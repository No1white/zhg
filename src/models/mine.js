import {
  sendVerifyCode
} from '../services/mine'
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
      console.log('2');
      const { data } = yield call(sendVerifyCode, reqParams);
      console.log(data);

      // yield put({
        //   type: 'save',
        //   payload: {
        //     hotList: data.list
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
