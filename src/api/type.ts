// 定义首页模块ts数据类型
export interface ResponseData {
    message: string,
    status: string
    caseManagements: Content;
}

// 已有病历的ts类型
export interface CaseManagement {
    "id": number,
    "name": string,
    "gender": string,
    "time": number,
    "region": string,
    "telephone": string,
    'sensitives': string,
    "delivery": string,
    "diagnose": string,
    "desc": string
}

// 存储全部已有病历的类型
export type Content = CaseManagement[]


export interface CaseManagementInfo extends ResponseData {
    data: Content
}