/**
 * callback回调版的微信请求类封装
 */

// 配置文件（内含接口或appkey等信息），须自行创建
import { config } from '../config.js'

// 可根据后端返回的error_code自定义更多其他提示信息
const tips = {
  1: '抱歉，出现了错误',
  1005: 'appkey无效，请重新获取'
}

class HTTP {
	/** 
	 * @param {Object} params
	 * params对象包含的字段与wx.request里面的字段基本一致（如url，method，data等）
	 */
  request(params) {
    if (!params.method) {
      params.method = 'GET';
    }
    wx.request({
      url: config.api_base_url + params.url,
      data: params.data,
      header: {
        'content-type': 'application/json',
        'appkey': config.appkey		// 此处为自行添加的header信息
      },
      method: params.method,
      success: (res) => {
        console.log(res.data);
        let code = res.statusCode.toString();
        if (code.startsWith('2')) {
          params.success && params.success(res.data);
        } else {
          let error_code = res.data.error_code;
          this._show_error(error_code);
        }
      },
      fail: (err) => {
        this._show_error(1);
      },
      complete: function (res) { },
    })
  }

  _show_error(error_code) {
    wx.showToast({
      title: tips[error_code] ? tips[error_code] : tips[1],
      icon: 'none',
      duration: 2000
    })
  }
}

export {HTTP}
