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
export const getFactory = code => fetch('/farmeasy-resume-service/resume/V2.1/resumeExhibitionTwoOne/getEnterpriseDetail/' + code,{

})
// 模版企业
export const getBaseFactory = userInfoId => fetch('/farmeasy-auth-service/auth/userInfo/getEnterpriseByUserInfoId',{
    userInfoId
}, 'POST')

//发表评论
export const publishComment = (commentContent, commentStars, enterpriseInfoId, enterpriseInfoName, sourceBatchCode) => fetch('/farmeasy-resume-service/resume/V2.1/resumeExhibitionTwoOne/add',{
    commentContent,
    commentStars,
    enterpriseInfoId,
    enterpriseInfoName,
    sourceBatchCode
}, 'POST')

//获取评论列表

export const getCommentsList = (resumeCode, page) => fetch('/farmeasy-resume-service/resume/V2.1/resumeExhibitionTwoOne/getList',{
    resumeCode,
    page
},'POST')
export const likeArticle = resumeCode => fetch('/farmeasy-resume-service/resume/V2.1/resumeExhibitionTwoOne/updateThumbsUpNum/' + resumeCode,{
    
})

