/**
 * 基于业务二次封装请求类（Promise版）
 */

import { HTTP } from '../utils/http-p.js';

class BookModel extends HTTP {
  getHotList(){
    return this.request({
      url: 'book/hot_list'
    });
  }
}

export {BookModel}