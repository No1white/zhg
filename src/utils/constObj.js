/*
 * @Author: your name
 * @Date: 2021-02-09 19:24:59
 * @LastEditTime: 2021-02-22 19:32:59
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: \zhg\src\utils\const.js
 */
const degreeList = [

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
const dealWays = [
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

]
const effects = [
{
  label: '有影响',
  value: '1',
},
{
  label: '无影响',
  value: '0',
}
]
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
]

const degreeListObj = {
  0: '全新',
  1: '95新',
  2: '9成新',
  3: '8成新',
  4: '较旧',
}
const dealWaysObj = {
  0: '自提',
  1: '快递（货到付款）',
  2: '包邮'
}
const effectsObj = {
  0: '无影响',
  1: '有影响'
}
const categoryObj = {
  0: '全部',
  1: '服饰',
  2: '数码',
  3: '百货',
  4: '配饰',
  5: '潮玩',
  6: '美妆',
  7: '食品',
  8: '家居',
  9: '其他',
}
const swapObj = {
  0: '置换',
  1: ''
}
export default {
  degreeList,
  degreeListObj,
  dealWays,
  dealWaysObj,
  effects,
  effectsObj,
  category,
  categoryObj,
  swapObj,
}
