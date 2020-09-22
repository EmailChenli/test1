import { requestAsset } from '@/utils/request.js'

export default {
  // 电脑列表
  getComputer(query) {
    return requestAsset({
      url: '/asset/computer/info/searchComByCondition',
      method: 'post',
      data:query
    });
  },
  // 添加资产
  addComputer(query) {
    return requestAsset({
      url: '/asset/computer/info/addComputer',
      method: 'post',
      data:query
    });
  },
  // 修改资产
  updateComputer(query) {
    return requestAsset({
      url: '/asset/computer/info/modifyComputer',
      method: 'post',
      data:query
    });
  },
  // 删除资产
  deleteComputer(assetId) {
    return requestAsset({
      url: '/asset/computer/info/deleteComputer',
      method: 'post',
      data:{ id: assetId }
    });
  },
}
