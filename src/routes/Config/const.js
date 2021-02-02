/*
 * @Author: your name
 * @Date: 2021-02-02 21:32:29
 * @LastEditTime: 2021-02-02 21:57:59
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: \zhg\src\routes\Config\const.js
 */
const dealWay =
[
  {
    label: '自提',
    value: '0',
  },
  {
    label: '快递（货到付款）',
    value: '1',
  },
  {
    label: '包邮',
    value: '2',
  },

];
const effect =[
  {
    label: '有影响',
    value: '1',
  },
  {
    label: '无影响',
    value: '0',
  }
];
const category = [
  {
    label: '服装',
    value:'0'
  },
  {
    label: '数码',
    value:'1'
  },
  {
    label: '百货',
    value:'2'
  },
  {
    label: '配饰',
    value:'3'
  },
  {
    label: '潮玩',
    value:'4'
  },
  {
    label: '美妆',
    value:'5'
  },
  {
    label: '食品',
    value:'6'
  },
  {
    label: '家居',
    value:'7'
  },
  {
    label: '其他',
    value:'8'
  },
];
const degree = [

  {
    label: '全新',
    value: '0',
  },
  {
    label: '95新',
    value: '1',
  },
  {
    label: '9成新',
    value: '2',
  },
  {
    label: '8成新',
    value: '3',
  },
  {
    label: '二手',
    value: '4',
  },

];
const swap = [
  {
    label: '置换',
    value: '0',
  },
  {
    label: '不置换',
    value: '1',
  }
]
function getLabel(value,List){
  let label = '';

  List.forEach(item => {
    if(item.value === String(value)) {
      label = item.label;
    }
  })
  return label;
}
export default {
  dealWay,
  effect,
  degree,
  swap,
  category,
  getLabel
}
