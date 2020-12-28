import request from '../utils/request';
import getPath from '../utils/getPath'

// export function getHotSale() {
//   return request(getPath('/api/hotSale'));
// }


const postOptions = (params = {}) => ({
  method: 'post',
  headers: {
    Accept: 'application/json',
    'Content-Type': 'application/json;charset=utf-8',
  },
  body: JSON.stringify(params),
  mode: 'cors',
});

// 获取热门推荐
export const getHotSale = (params) => {
  return request(getPath('/api/home/hotSale'), {
    ...postOptions(params),
  });
};
