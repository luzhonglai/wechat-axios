/*
 * @Descripttion:
 * @repository: https://github.com/luzhonglai
 * @Author: ZhongLai Lu
 * @Date: 2020-12-25 16:20:28
 * @LastEditors: Zhonglai Lu
 * @LastEditTime: 2020-12-25 16:22:13
 */
let defalut = {
  baseUrl: '',
  // 请求接口地址
  url: undefined,
  // 请求的参数
  data: {},
  // 请求的 header
  header: {
    'Content-type': 'application/json;charset=UTF-8',
  },
  // 超时时间，单位为毫秒
  timeout: 8000,
  // HTTP 请求方法
  method: 'GET',
  // 返回的数据格式
  dataType: 'json',
  // 响应的数据类型x
  responseType: 'text',
  // 开启 http2
  enableHttp2: false,
  // 开启 quic
  enableQuic: false,
  // 开启 cache
  enableCache: false,
  // 开启请求调试模式
  debug: true,
}


module.exports = defalut