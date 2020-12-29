import {
  getHotSale,
  getCommodityList,
  getHotWords
} from '../services/home'
const initState = {
  hotList: [],
  commodityList: [],
  hotWords:[],
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
      const reqParams = payload || {};
      const { data } = yield call(getHotSale, reqParams);
        yield put({
          type: 'save',
          payload: {
            hotList: data.list
          },
        });
    },
    *getCommodityList({ payload }, { call, put,select}) {
      const reqParams = payload || {};
      const { data } = yield call(getCommodityList, reqParams);
      const thisData1 = yield select(state => state.home);
      const oldList = thisData1.commodityList;
        yield put({
          type: 'save',
          payload: {
            commodityList: [...oldList,...data.list],
            commodityListLoading: true,
            commodityListHasMore: true,
          },
        });
    },
    *getHotWords({ payload }, { call, put,select}) {
      const reqParams = payload || {};
      const { data } = yield call(getHotWords, reqParams);
        yield put({
          type: 'save',
          payload: {
            hotWords: data.list
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
