import request from '../utils/request';
import getPath from '../utils/getPath'


// 发送验证码
export const sendVerifyCode = (params) => {
  return request.get(getPath('/api/mine/sendcode'),params);
};

// 注册
export const register = (params) => {
  return request.post(getPath('/api/mine/register'),params);
};

// 发送验证码
export const login = (params) => {
  return request.post(getPath('/api/mine/logine'),params);
};

