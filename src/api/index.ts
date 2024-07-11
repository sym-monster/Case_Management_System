// 统一管理首页模块的接口
import request from '@/utils/request'
import type { ResponseData } from './type'

// 通过枚举管理首页模块接口地址
enum API {
    // 获取已有的医院的数据接口的地址
    CASEMANAGEMENT_URL = '/query',
}

// 获取医院的数据
export const CaseManagements = () => request.post<any, ResponseData>(API.CASEMANAGEMENT_URL)