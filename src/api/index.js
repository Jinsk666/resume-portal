import fetch from '../config/fetch';

// 获取履历
export const getResumeDetails = (code) => fetch('/getDetail/' + code, {

})

// 模版获取数据
export const getResumeData = (uniqueCode, type) => fetch('/getDetail',{
    type: type,
    uniqueCode: uniqueCode
},'POST')