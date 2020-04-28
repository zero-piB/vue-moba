<template>
    <div>
        <h1>{{id?'编辑英雄':'新建英雄'}}</h1>
        <el-form label-width="120px" @submit.native.prevent="save">
            <el-form-item label="名称">
                <el-input v-model="model.name"/>
            </el-form-item>
            <el-form-item label="称号">
                <el-input v-model="model.title"/>
            </el-form-item>
            <el-form-item label="头像">
                <el-upload
                    class="avatar-uploader"
                    :action="this.axios.defaults.baseURL+'/upload' "
                    :show-file-list="false"
                    :on-success="afterUpload">
                    <img v-if="model.avatar" :src="model.avatar" class="avatar">
                    <i v-else class="el-icon-plus avatar-uploader-icon"></i>
                </el-upload>
            </el-form-item>
            <el-form-item label="类型">
               <el-select v-model="model.categories" multiple>
                   <el-option v-for="item of categories" :key="item._id"
                   :lable="item.name" :value="item._id"/>
               </el-select>
            </el-form-item>
            <el-form-item label="难度">
                <el-rate style="margin-top:0.6rem" :max="9" show-score v-model="model.scores.difficulty"/>
            </el-form-item>
            <el-form-item label="技能">
                <el-rate style="margin-top:0.6rem" :max="9" show-score v-model="model.scores.skills"/>
            </el-form-item>
            <el-form-item label="攻击">
                <el-rate style="margin-top:0.6rem" :max="9" show-score v-model="model.scores.attack"/>
            </el-form-item>
            <el-form-item label="生存">
                <el-rate style="margin-top:0.6rem" :max="9" show-score v-model="model.scores.survive"/>
            </el-form-item>
            <el-form-item>
                <el-button type="primary" native-type="submit">保存</el-button>
            </el-form-item>
        </el-form>
        
    </div>
</template>

<script>
export default {
    data(){
        return{
            categories:[],
            model:{
                avatar:'',
                scores:{    
                    difficulty:1,
                }
            },
        }
    },
    props:{  //和路由解耦
        id:{}
    },
    methods:{
        async save(){
            if(this.id){
                await this.axios.put(`rest/heroes/${this.id}`,this.model)
                
            }else{
                await this.axios.post('rest/heroes',this.model)
            } 
            this.$router.push('/heroes/list')
            this.$message({
                type:'success',
                message:'更新成功'
            }) 
        },
        async fetch(){
            const res = await this.axios.get(`rest/heroes/${this.id}`)
            this.model = res.data
        },
        async fetchCategories(){
            const res = await this.axios.get(`rest/categories`)
            this.categories = res.data
        },
        afterUpload(res){
            this.model.avatar = res.url
            // console.log(res) 
        }
    },
    created(){
        this.fetchCategories()
        this.id && this.fetch()
    }
}
</script>

<style language='scss'>
  .avatar-uploader .el-upload{
    border: 1px dashed #615e5e;
    border-radius: 6px;
    cursor: pointer;
    position: relative;
    overflow: hidden;
  }
  .avatar-uploader-icon{
    font-size: 28px;
    color: #8c939d;
    width: 178px;
    height: 178px;
    line-height: 178px!important;
    text-align: center;
  }
  .avatar {
    width: 178px;
    height: 178px;
    display: block;
  }
</style>