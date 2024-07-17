// 统一管理首页模块的接口
import request from '@/utils/request'
import type { ResponseData } from './type'

// 通过枚举管理接口地址
enum API {
    // 获取已有的病历的数据接口的地址
    CASEMANAGEMENT_URL = '/query',
    // 获取提交病历的数据
    SUBMITCASEMANAGEMENT_URL = '/add'
}

// 获取病历的数据
export const CaseManagements = () => request.post<any, ResponseData>(API.CASEMANAGEMENT_URL,{
    headers: {
      'Content-Type': 'application/json'
    }})
// 提交病历的数据
export const submitCaseManagement = () => request.post(API.SUBMITCASEMANAGEMENT_URL)