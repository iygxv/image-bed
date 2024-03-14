<template>
  <Header/>
  <div class="storage-btn">
    <el-button type="primary" @click="handleLocalStorage">将表格数据存储到本地存储</el-button>
  </div>
  <div class="storage-btn2">
    <el-button type="danger" @click="handleDelLocalStorage">删除本地存储</el-button>
  </div>
  <div class="container">
    <el-upload
      class="upload-demo"
      drag
      multiple
      action="/api/user/image/upload"
      :show-file-list="false"
      :on-success="handleSuccessUpload"
      :before-upload="handleBeforeUpload"
    >
      <el-icon class="el-icon--upload"><upload-filled /></el-icon>
      <div class="el-upload__text">
        拖动文件到这里或 <em>点击上传</em>
      </div>
    </el-upload>
    <el-table :data="tableData" border v-if="tableData.length">
      <el-table-column prop="name" label="文件名" align="center"></el-table-column>
      <el-table-column prop="image" label="图片" align="center">
        <template #default="{ row }">
          <el-image :src="row.url" fit="contain" style="width: 70px; height: 70px" />
        </template>
      </el-table-column>
      <el-table-column prop="url" label="路径" align="center" width="680">
        <template #default="{ row }">
          <a :href="row.url" target="_blank" >{{ row.url }}</a>
        </template>
      </el-table-column>
      <el-table-column label="操作" align="center">
        <template #default="{ row, $index }">
          <el-button type="primary" @click="handleCopyPath(row, $index)">复制路径</el-button>
        </template>
      </el-table-column>
    </el-table>
  </div>
</template>

<script setup lang="ts">
import { ref, reactive, onMounted } from "vue";
import Header from './Header.vue'
import { ElMessage } from 'element-plus'
import type { UploadProps } from 'element-plus'
import { UploadFilled } from '@element-plus/icons-vue'
import useClipboard from "vue-clipboard3";
const { toClipboard } = useClipboard();


const tableData = reactive([])

// 获取到本地存储
const getLocalStorage = () => {
  const data = localStorage.getItem('image-bed-data')
  if (data) {
    tableData.push(...JSON.parse(data))
  }
}
onMounted(() => {
  getLocalStorage()
})

const handleSuccessUpload: UploadProps['onSuccess'] =(response, uploadFile) => {
  tableData.push({
    name: uploadFile.name,
    url: response.data
  })  
}
const handleBeforeUpload: UploadProps['beforeUpload'] = (rawFile) => {
  // 不是图片的 return false
  if (!rawFile.type.includes('image/')) {
    ElMessage.error('Only images can be uploaded!')
    return false
  }
  // 不超过 3MB
  if (rawFile.size > 3 * 1024 * 1024) {
    ElMessage.error('The file size cannot exceed 3MB!')
    return false
  }
  return true
}

const handleCopyPath = async(row) => {
  await toClipboard(row.url || '');
  ElMessage.success("复制成功");
}

const handleLocalStorage = () => {
  if(tableData.length === 0) {
    return
  }
  localStorage.setItem('image-bed-data', JSON.stringify(tableData))
  ElMessage.success('存储成功')
}
</script>
 
<style lang = "scss" scoped>
* {
  margin: 0;
  padding: 0;
}
.container {
  height: 90vh;
  box-sizing: border-box;
  padding: 10px !important;
  box-shadow: 0 0 4px rgba(0, 0, 0, 0.33);
  position: relative;
  z-index: 999;
  overflow-y: auto;
   /* 样式 */
}
a {
  color: #409eff !important;
}
::v-deep(.el-table) {
  margin-top: 10px;
}
.storage-btn {
  position: fixed;
  top: 30px;
  right: 80px;
  z-index: 9999999;
}
.storage-btn2 {
  position: fixed;
  top: 30px;
  right: 300px;
  z-index: 9999999;
}
</style>