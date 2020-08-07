/**
 * 基于业务二次封装请求类（callback版）
 */

import {HTTP} from '../utils/http.js';

class ClassicModel extends HTTP {
  getLatest(sCallBack) {
    this.request({
      url: 'classic/latest',
      success: (res) => {
        sCallBack(res);
      }
    })
  }
}

export { ClassicModel }