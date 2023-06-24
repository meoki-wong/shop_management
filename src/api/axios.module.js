import axios from 'axios'
import { message } from 'antd';
import Nprogress from 'nprogress'
import 'nprogress/nprogress.css'


// import axiosRetry from 'axios-retry'
// @ts-ignore

let axiosInstance = axios.create({
    baseURL: 'https://www.luqu.cc/api',
    timeout: 30 * 1000, // 设置请求超时时间
    retryDelay: 1000, // 超时请求
    retry: 4, // 超时重新触发请求次数
})

// const navigate = useNavigate()


// 请求拦截
let requestWhiteList = ['/login', '/register', '/getFullViews', '/getUniqueViews'] // 请求白名单
axiosInstance.interceptors.request.use((config) => {
    Nprogress.start() // 添加请求进度条
    if (requestWhiteList.includes(config.url)) {
        return config
    }
    let token = window.localStorage.getItem('token')
    if (!config.headers) {
        config.headers = {}
    } else {
        // 区分上传接口和普通接口
        config.headers['Content-Type'] = 'application/json; charset=UTF-8'
        config.headers['Authorization'] = "Bearer " + token 
        // 暂时不能使用中文做中文名  header不能写入中文  需要传入时进行过滤  后期做处理
        // config.headers = {
        //     authorization: token,
        // }
    }
    
    return config
}, (err) => {
    Nprogress.done() // 结束请求进度条 
    console.log('=====>请求拦截失败:', err)
})


// 响应拦截
axiosInstance.interceptors.response.use((config) => {
    Nprogress.done() // 结束请求进度条 
    // let { status, statusText, data } = config
    // if (!data.success) {
    //     Nprogress.done() // 结束请求进度条 
    //     message.error(data.message || data.data.message)
    // }
    // console.log('====响应数据', config);
    return config
}, (err) => {
    console.log('-----触发', err);
    Nprogress.done() // 结束请求进度条 
    // 设置超时请求
    message.error(String(err.response.data.Message[0]  || '网络异常，请稍后重试')) // statusCode 不为200时   报相关异常信息
    
})

export default axiosInstance


