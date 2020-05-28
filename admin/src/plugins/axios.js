"use strict";

import Vue from 'vue';
import axios from "axios";
import router from '../router'

// Full config:  https://github.com/axios/axios#request-config
// axios.defaults.baseURL = process.env.baseURL || process.env.apiUrl || '';
// axios.defaults.headers.common['Authorization'] = AUTH_TOKEN;
// axios.defaults.headers.post['Content-Type'] = 'application/x-www-form-urlencoded';

let config = {
  // baseURL:'http://localhost:3000/admin/api'
  baseURL: process.env.VUE_APP_API_UR || "/admin/api"
  // timeout: 60 * 1000, // Timeout
  // withCredentials: true, // Check cross-site Access-Control
};

const _axios = axios.create(config);

//请求前处理，检验是否登陆
_axios.interceptors.request.use(config => {
    const token = localStorage.getItem('token')
    if (token) {
      config.headers.Authorization = 'Bearer ' + token
    }
    return config
}, err => {
    
    return Promise.reject(err)
  }
);

_axios.interceptors.response.use(res => {
  return res
}, err => {
  if (err.response.data.message !== 'ok') {
    Vue.prototype.$message({
      type: 'error',
      message: err.response.data.message
    })
    if (err.response.status === 401) {
      router.push('/login')
    }
  }
  
  return Promise.reject(err)
}
);

Plugin.install = function(Vue) {
  Vue.axios = _axios;
  window.axios = _axios;
  Object.defineProperties(Vue.prototype, {
    axios: {
      get() {
        return _axios;
      }
    },
    $axios: {
      get() {
        return _axios;
      }
    },
  });
};

Vue.use(Plugin)

export default Plugin;
