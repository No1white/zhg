import {
  getHotSale
} from '../services/home'
const initState = {
  hotList: []
}
export default {

  namespace: 'home',

  state: initState,

  subscriptions: {
    setup({ dispatch, history }) {  // eslint-disable-line
    },
  },

  effects: {
    *fetch({ payload }, { call, put }) {  // eslint-disable-line
      yield put({ type: 'save' });
    },
    *getHotList({ payload }, { call, put }) {
      console.log('list');
      const reqParams = payload || {};
      const { data } = yield call(getHotSale, reqParams);
        yield put({
          type: 'save',
          payload: {
            hotList: data.list
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
