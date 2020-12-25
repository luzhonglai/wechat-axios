/*
 * @Descripttion: 
 * @repository: https://github.com/luzhonglai
 * @Author: ZhongLai Lu
 * @Date: 2020-12-25 16:20:07
 * @LastEditors: Zhonglai Lu
 * @LastEditTime: 2020-12-25 16:36:20
 */

let defaults = require('./default')
let Axios = require('./core/Axios')

function createAxios(defaults) {
  let instanc =  new Axios(defaults)
  return instanc
}

let axios = createAxios(defaults)

module.exports.default = axios




