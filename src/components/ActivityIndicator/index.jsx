import React from 'react';
import { ActivityIndicator as AntdActivityIndicator } from 'antd-mobile';

const ActivityIndicator = (props) => {
  const { animating, ...restProps } = props;
  return (
    <AntdActivityIndicator toast text="请求中..." animating={animating || false} {...restProps} />
  );
};

export default ActivityIndicator;
