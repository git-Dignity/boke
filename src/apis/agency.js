import req from './http.js'

//定义接口  
export const AddAgency =params=>req('post','/agency/addAgency',params)

export const ShowAgency = params=>req('post','agency/showAgency',params);

export const UpdateAgency = params=>req('post','agency/updateAgency',params);