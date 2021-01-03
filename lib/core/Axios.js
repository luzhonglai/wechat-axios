/*
 * @Descripttion:
 * @repository: https://github.com/luzhonglai
 * @Author: ZhongLai Lu
 * @Date: 2020-12-21 11:02:35
 * @LastEditors: Zhonglai Lu
 * @LastEditTime: 2020-12-27 11:24:26
 */

class Axios {
  constructor(config = defalut) {
    this.defaults = config
    this.initAsyncFn()
  }

  request(config) {
    if (typeof config == 'string') {
      config = arguments[1] || {}
      config.url = arguments[0]
    } else {
      config = config || {}
    }

    config = Object.assign(this.defaults, config)

    // 拼接url
    let baseUrl = config.baseUrl
    config.url = `${
      config.url.includes('https://')
        ? config.url
        : `${baseUrl}${
            config.url.startsWith('/') ? config.url : `/${config.url}`
          }`
    }`

    if (config.method) {
      config.method = config.method.toLowerCase()
    } else if (this.defaults.method) {
      config.method = this.defaults.method.toLowerCase()
    } else {
      config.method = 'get'
    }

    let startDate = Date.now() // 时间戳
    let promise = new Promise((reslove, reject) => {
      wx.request(
        Object.assign(config, {
          success: reslove,
          fail: reject,
          complete: (arge) => {
            if (arge.errMsg == 'request:ok') {
              this.debug(config, startDate, arge.data)
            } else {
              this.debug(config, startDate, arge.errMsg)
            }
          },
        })
      )
    })
    return promise
  }

  /**
   * @name: initAsyncFn
   * @msg: 添加请求类型函数
   */
  initAsyncFn() {
    let arr = ['get', 'post', 'head', 'put'].forEach((methods) => {
      this[methods] = (url, config = {}) => {
        return this.request({
          method: methods,
          url: url,
          data: config.data || {},
        })
      }
    })
    return arr
  }

  /**
   * @name: create
   * @msg: 创建axios config配置相
   * @param {*}
   * @return {*}
   */
  create(config) {
    this.defaults = Object.assign(defalut, config)
    return this.defaults
  }

  /**
   * @name: axios.all
   * @content: 合并requset 请求
   * @param {promise} 传入promise函数
   * @return {*}
   */
  all(promies) {
    return Promies.all(promies)
  }

  /**
   * @name: axios
   * @content: 配置使用请求
   * @msg:
   * @param {object}  传入对象
   * @return {*}
   */
  axios(options) {
    if (typeof options !== 'object') {
      throw new typeError('请传入obj')
    }
    return this.request(options)
  }

  /**
   * @name: debug
   * @content:  请求调试信息
   */
  debug(config, startDate, stagingRes) {
    const { url, data: params, header: options, debug } = config
    const poorDate = Date.now() - startDate
    // count--
    // 开发日志调试信息
    if (debug == true) {
      console.group('%c当前请求详细信息： ', 'background:#000;color:#bada55')
      console.log('%c请求url：', 'color:#A101A6;font-weight: 600', url)
      console.log('%c请求参数：', 'color:#A101A6;font-weight: 600', params)
      console.log('%c请求配置：', 'color:#A101A6;font-weight: 600', options)
      console.log(
        '%c请求耗时：',
        'color:#A101A6;font-weight: 600',
        `${poorDate} ms`
      )
      console.log('%c返回数据：', 'color:#A101A6;font-weight: 600', stagingRes)
      console.groupEnd()
    }
  }
  showError(res) {
    if (res && res.data && res.data.msg) {
      wx.showToast({
        title: res.data.msg,
        icon: 'none',
      })
    }
  }  
}

export default Axios
