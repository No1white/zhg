import request from '../utils/request';
import getPath from '../utils/getPath'

// export function getHotSale() {
//   return request(getPath('/api/hotSale'));
// }


const postOptions = (params = {}) => ({
  method: 'get',
  headers: {
    Accept: 'application/json',
    'Content-Type': 'application/json;charset=utf-8',
  },
  body: JSON.stringify(params),
  mode: 'cors',
});

// 获取热门推荐
export const getHotSale = (params) => {
  return request.get(getPath('/api/home/hotSale'),params
  );
};

// 获取商品列表
export const getCommodityList = (params) => {
  return request.get(getPath('/api/home/commodityList'), params

    );
};
// 获取热搜词
export const getHotWords = (params) => {
  return request.get(getPath('/api/home/hotWords'),params

  );
};
