import fetch from '../config/fetch';

// 获取履历
export const getResumeDetails = code => fetch('/farmeasy-resume-service/resume/V2.1/resumeExhibitionTwoOne/getDetail/' + code, {

})

// 模版获取数据
export const getResumeData = (uniqueCode, type) => fetch('/farmeasy-resume-service/resume/V2.1/resumeExhibitionTwoOne/getDetail',{
    type: type,
    uniqueCode: uniqueCode
},'POST')

// 模版企业
export const getFactory = code => fetch('/farmeasy-resume-service/resume/V2.1/enterpriseInfoTwoOne/getDetail/' + code,{

})
// 模版企业
export const getBaseFactory = userInfoId => fetch('/farmeasy-auth-service/auth/userInfo/getEnterpriseByUserInfoId',{
    userInfoId
}, 'POST')