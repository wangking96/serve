<template>
    <div class="release">
        <div class="release-title">
            <img src="/images/release.png" alt="">
            添加小姐信息
        </div>
        
        <div class="release-form">
            <div class="release-form-item">
                <span class="s-width">标题<i>*</i></span>
                <input type="text" v-model="title">
            </div>
            <div class="release-form-item">
                <span class="s-width">分类<i>*</i></span>
                <el-select  class="sort" v-model="categoryValue" @change="changeCategory" placeholder="请选择">
                    <el-option
                        v-for="item in category"
                        :key="item.id"
                        :label="item.name"
                        :value="item.id" />
                </el-select>
            </div>
            <div class="release-form-item">
                <span style="width: 50px;">地区</span>
                <div class="area">
                    <label>省份：</label>
                    <el-select v-model="provinceValue" @change="changeProvince" placeholder="- - - 请选择 - - -">
                        <el-option
                            v-for="item in provinceList"
                            :key="item.id"
                            :label="item.name"
                            :value="item.id" />
                    </el-select>
                    <label class="margin-left">市/区：</label>
                    <el-select v-model="cityValue" @change="changeCity">
                        <el-option
                            v-for="item in cityList"
                            :key="item.id"
                            :label="item.name"
                            :value="item.id" />
                    </el-select>
                    <label class="margin-left">县/区：</label>
                    <el-select v-model="areaValue" @change="changeArea">
                        <el-option
                            v-for="item in areasList"
                            :key="item.id"
                            :label="item.name"
                            :value="item.id" />
                    </el-select>
                </div>
            </div>
            <div class="release-form-item">
                <span class="l-width">小姐年龄</span>
                <input type="text" v-model="age">
            </div>
            <div class="release-form-item">
                <span class="l-width">小姐价格</span>
                <input type="text" v-model="price">
            </div>
            <div class="release-form-item">
                <span class="l-width">小姐外貌</span>
                <input type="text" v-model="outward">
            </div>
            <div class="release-form-item">
                <span class="l-width">服务项目</span>
                <input type="text" v-model="service">
            </div>
            <div class="release-form-item">
                <span class="l-width">营业时间</span>
                <input type="text" v-model="workTime">
            </div>
            <div class="release-form-item">
                <span class="l-width">环境设备</span>
                <input type="text" v-model="equipment">
            </div>
            <div class="release-form-item">
                <span class="l-width">安全评估</span>
                <input type="text" v-model="safety">
            </div>
            <div class="release-form-item">
                <span class="l-width">详细地址</span>
                <input type="text" v-model="address">
            </div>
            <div class="release-form-item contact">
                <span class="l-width">联系方式</span>
                <label>手机号码：</label>
                <input type="text" v-model="phone">
                <label>微信：</label>
                <input type="text" v-model="wechat">
                <label>QQ：</label>
                <input type="text" v-model="qq">
            </div>
            <div class="release-form-item">
                <span class="l-width">综合评价</span>
                <textarea v-model="assess"></textarea>
            </div>
            <div class="release-upload">
                <span class="l-width">相册</span>
                <div>
                    <el-upload
                        action="#"
                        list-type="picture-card"
                        accept="image/*"
                        :file-list="fileList"
                        :auto-upload="false"
                        :on-change="onUploadChange">
                            <i slot="default" class="el-icon-plus"></i>
                            <div slot="file" slot-scope="{file}">
                            <img
                                class="el-upload-list__item-thumbnail"
                                :src="file.url" alt="">
                            <span class="el-upload-list__item-actions">
                                <span
                                    class="el-upload-list__item-preview"
                                    @click="handlePictureCardPreview(file)">
                                    <i class="el-icon-zoom-in"></i>
                                </span>
                                <span
                                    v-if="!disabled"
                                    class="el-upload-list__item-delete"
                                    @click="handleRemove(file)">
                                    <i class="el-icon-delete"></i>
                                </span>
                            </span>
                            </div>
                    </el-upload>

                    <div class="release-upload-btn" @click="chooseImgFn">选择相片</div>
                </div>
            </div>
             <div class="submite-btn" @click="submiteFn">
                {{submiteText}}
                <i v-if="submiteStatus" class="el-icon-loading"></i> 
            </div>
        </div>

        
        <el-dialog :visible.sync="dialogVisible">
            <img width="100%" :src="dialogImageUrl">
        </el-dialog>
    </div>
</template>
<script>
import User from '@/api/user.js'
import Portal from '@/api/portal.js'
import {loadingFn} from '@/utils/tools'
export default {
    data() {
        return {
            category: [],
            submiteText: '添加',
            submiteStatus: false,
            provinceList: [],
            cityList: [],
            areasList: [],
            fileList: [],
            dialogImageUrl: '',
            dialogVisible: false,
            disabled: false,
            title: '',
            categoryValue: null,
            provinceValue: null,
            cityValue: null,
            areaValue: null,
            age: null,
            price: '',
            outward: '',
            service: '',
            workTime: '',
            equipment: '',
            safety: '',
            address: '',
            phone: '',
            wechat: '',
            qq: '',
            assess: '',
            imgName: [],  
            imgUrl: [], 
            fileName: [], 
            fileUrl: [],
            curFileId: null,
            curFilePath: '',
            serveLoading: null
        }
    },
    watch: {
        age(val){
            val = Number(val)
            if(isNaN(val)) {
                this.age = null
            }
        }
    },
    created() {
        this.categoryFn()
        this.getAreaInfoFn(this.id, (data) => {
            this.provinceList = data
        })  
    },
    methods: {
        chooseImgFn(){
            const uploadBtn = document.querySelector('.el-upload--picture-card')
            uploadBtn && uploadBtn.click()
        },
        categoryFn(){
            let  params = {
                cat: 0,
                c1: 0,
                c2: 0,
                c3: 0,
                keyword: '',
                page: 0
            }
            Portal.getHomeData(params).then(res => {
                if(res.code === 1) {
                    this.category = res.data.category
                }
            })
        },
        getAreaInfoFn(id, callback){
            Portal.getAreaInfo(id).then(res => {
                if(res.code === 1) {
                    callback && callback(res.data.data)
                }
            })
        },
        changeCategory(item){
            this.categoryValue = item
        },
        changeProvince(item){
            this.cityValue = null
            this.areaValue = null
            this.cityList = []
            this.areasList = []
            this.getAreaInfoFn(item, (data) => {
                this.cityList = data
                this.areaValue = null
            })  
        },
        changeCity(item){
            this.areaValue = null
            this.areasList = []
            this.getAreaInfoFn(item, (data) => {
                this.areasList = data
            })  

        },
        changeArea(item){
            console.log(item);
        },
        handleRemove(file) {
            this.deleteImg(file, true)
        },
        handlePictureCardPreview(file) {
            this.dialogImageUrl = file.url;
            this.dialogVisible = true;
        },
        onUploadChange(file, fileList){
            var fileFormat = file.name.substring(file.name.lastIndexOf('.') + 1)
            const formatArr = ['gif', 'jpg', 'jpeg', 'png']
            if(!formatArr.includes(fileFormat)) {
                this.$message.error('上传文件的格式不对!')
                this.deleteImg(file)
                return
            }
            if(file.uid){
                const formData = new FormData()
                formData.append('file', file.raw)
                User.fileUpload(formData).then(res => {
                    if(res.code === 1) {
                        this.$message.success(res.msg)
                        this.fileList = fileList
                        this.curFileId = res.data.id
                        this.curFilePath = res.data.filepath
                        if(formatArr.includes(fileFormat)) {
                            this.imgName.push(res.data.filename)
                            this.imgUrl.push(res.data.filepath)
                        }
                    }
                    else this.deleteImg(file)
                })
                .catch(err => {
                    console.log(err)
                    this.deleteImg(file)
                })
            }
        },
        // 删除图片
        deleteImg(file, bool){
            if(bool) {
                this.serveLoading = loadingFn()
                let params = {
                    id: this.curFileId,
                    file_path: this.curFilePath
                }
                User.deleteFile(params).then(res => {
                    this.$message.success(res.msg)
                    if(res.code ===  1) {
                        this.fileList = this.fileList.filter((item) => {
                            return item.uid != file.uid
                        })
                    }
                })
                .finally(() => {
                    this.serveLoading.close()
                })
            }else {
                this.fileList = this.fileList.filter((item) => {
                    return item.uid != file.uid
                })
            }
        },
        submiteFn(){
            if(!this.title){
                this.$message.error('请输入标题!')
                return
            }
            if(!this.categoryValue){
                this.$message.error('请选择分类!')
                return
            }
            if(!this.assess){
                this.$message.error('请输入综合评价!')
                return
            }
            if(this.fileList.length < 4) {
                this.$message.error('至少需要上传4张图片!')
                return
            }
            this.serveLoading = loadingFn()
            let data = {
                post: {
                    post_title: this.title, //	string	是	标题
                    parent_id: this.categoryValue,  //	number	是	版块ID
                    province: this.provinceValue,  //	number	否	省ID
                    city: this.cityValue,  //	number	否	市ID
                    county: this.areaValue,  //	number	否	区ID
                    miss_quantity: '',  //	number	否	小姐数量
                    miss_age: this.age,  //	number	否	小姐年龄
                    miss_quality: this.outward,  //	string	否	小姐质量
                    miss_price: this.price,  //	string	否	小姐价格
                    miss_appearance: this.outward,  //	string	否	小姐外貌
                    miss_services: this.service,  //	string	否	服务项目
                    miss_business_hours: this.workTime,  //	string	否	营业时间
                    miss_environmental_unit: this.equipment,  //	string	否	环境设备
                    miss_safety_assessment: this.safety,  //	string	否	安全评估
                    miss_address: this.address,  //	string	否	详细地址信息
                    miss_qq: this.qq,  //	string	否	QQ
                    miss_wechat: this.wechat,  //	string	否	微信
                    miss_moblie: this.phone,  //	string	否	电话
                    post_content: this.assess,  //	string	否	综合评价
                },
                photo_names: this.imgName,  //	object	否	图片名称数组
                photo_urls: this.imgUrl,  //	object	否	图片地址数组
                file_names: this.fileName,  //	object	否	上传的文件名称数组
                file_urls: this.fileUrl,  //
            }

            Portal.releaseInfo(data).then(res => {
                this.$message.success(res.msg)
                if(res.code === 1) {
                    window.scrollTo({ 
                        top: 0, 
                        behavior: "smooth" 
                    })
                    this.title = ''
                    this.categoryValue = null
                    this.provinceValue = null
                    this.cityValue = null
                    this.areaValue = null
                    this.age = null
                    this.price = ''
                    this.outward = ''
                    this.service = ''
                    this.workTime = ''
                    this.equipment = ''
                    this.safety = ''
                    this.address = ''
                    this.phone = ''
                    this.wechat = ''
                    this.qq = ''
                    this.assess = ''
                    this.imgName = []  
                    this.imgUrl = [] 
                    this.fileName = [] 
                    this.fileUrl = []
                    this.fileList = []
                }
            })
            .finally(() => {
                this.serveLoading.close()
            })
        }
    }
}
</script>
<style lang="scss" scoped>
.release {
    padding: 28px;
    min-height: 740px;
    &-title {
        display: flex;
        align-items: center;
        font-weight: 600;
        color: #DF2195;
        font-size: 20px;
        letter-spacing: 2px;
        img {
            margin-right: 10px;
        }
    }
    &-upload {
        & > span {
            width: 96px;
            line-height: 30px;
        }
        margin-top: 24px;
        display: flex;
        align-content: center;
        &-btn {
            width: 128px;
            height: 40px;
            background: #610D40;
            border-radius: 8px;
            display: inline-block;
            text-align: center;
            cursor: pointer;
            line-height: 40px;
            letter-spacing: 2px;
        }
    }
    &-form {
        &-item {
            margin-top: 24px;
            display: flex;
            align-content: center;
            span {
                line-height: 32px;
                position: relative;
                i {
                    color: #DF2195;
                    position: absolute;
                    top: 50%;
                    margin-left: 4px;
                    transform: translateY(-42%);
                }
            }
            .margin-left {
                margin-left: 46px;
            }
            .s-width {
                width: 60px;
            }
            .l-width {
                width: 96px;
            }
            input, textarea {
                flex: 1;
                height: 32px;
                background: #000000;
                border: 1px solid #393D42;
                border-radius: 4px;
                box-sizing: border-box;
                outline: none;
                color: #fff;
                padding-left: 20px;
                &.sort {
                    flex: 0;
                    width: 170px;
                }
            }
            textarea {
                min-height: 170px;
                line-height: 22px;
                text-indent: 30px;
                text-align: justify;
                padding-right: 10px;
            }
        }
        .contact label {
            line-height: 32px;
        }
    }
    .submite-btn {
        min-width: 110px;
        height: 38px;
        display: inline-block;
        background: #0C8988;
        border-radius: 4px;
        text-align: center;
        line-height: 38px;
        margin: 64px 0 64px 100px;
        font-size: 16px;
        letter-spacing: 1px;
        cursor: pointer;
        font-family: Microsoft YaHei;
    }
}    
</style>

<style>
.release-form-item .el-input__inner{
    border: 1px solid #393D42;
}
.sort .el-input__inner,
.area .el-input__inner,
.sort .el-input__inner::placeholder,
.area .el-input__inner::placeholder{
    height: 32px;
    color: #fff;
    background: #000000;
}
.sort .el-input .el-select__caret,
.area .el-input .el-select__caret {
    color: #fff;
    line-height: 32px;
}
.sort .el-input__inner:focus,
.sort .el-input.is-focus .el-input__inner,
.area .el-input__inner:focus,
.area .el-input.is-focus .el-input__inner {
    border-color: #fff;
}
.area .el-input__inner {
    width: 150px;
}
.el-upload--picture-card {
    display: none;
}
</style>