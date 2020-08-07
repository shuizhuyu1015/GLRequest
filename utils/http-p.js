/**
 * Promise版的微信请求类封装
 */

// 配置文件（内含接口或appkey等信息），须自行创建
import { config } from '../config.js'

// 可根据后端返回的error_code自定义更多其他提示信息
const tips = {
  1: '抱歉，出现了错误',
  1005: 'appkey无效，请重新获取'
}

class HTTP {
  request({url, data={}, method='GET'}) {
    return new Promise((resolve, reject) => {
      this._request(url, resolve, reject, data, method);
    });
  }

  _request(url, resolve, reject, data={}, method='GET') {
    wx.request({
      url: config.api_base_url + url,
      data: data,
      method: method,
      header: {
        'content-type': 'application/json',
        'appkey': config.appkey		// 此处为自行添加的header信息
      },
      success: (res) => {
        console.log(res.data);
				// 根据具体数据结构来处理，成功时调用resolve()，失败时调用reject()
        const code = res.statusCode.toString();
        if (code.startsWith('2')) {
          resolve(res.data);
        } else {
          reject(res);
          const error_code = res.data.error_code;
          this._show_error(error_code);
        }
      },
      fail: (err) => {
        reject(err);
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
