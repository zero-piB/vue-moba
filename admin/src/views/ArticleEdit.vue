<template>
    <div>
        <h1>{{id?'编辑文章':'新建文章'}}</h1>
        <el-form label-width="120px" @submit.native.prevent="save">
            <el-form-item label="文章分类">
                <el-select v-model="model.categories" multiple >
                    <el-option v-for="item in categories" :key="item._id" 
                        :label="item.name" :value="item._id">
                    </el-option>
                </el-select>
            </el-form-item>
            <el-form-item label="文章标题">
                <el-input v-model="model.title"/>
            </el-form-item>
            <el-form-item label="文章内容">
                <vue-editor useCustomImageHandler @image-added="handleImageAdded" v-model="model.body"></vue-editor>
            </el-form-item>
            <el-form-item>
                <el-button type="primary" native-type="submit">保存</el-button>
            </el-form-item>
        </el-form>
        
    </div>
</template>

<script>
import { VueEditor } from "vue2-editor";
export default {
    data(){
        return{
            categories:[],
            model:{},
        }
    },
    props:{  //和路由解耦
        id:{}
    },
    components:{
        VueEditor
    },
    methods:{
        async save(){
            if(this.id){
                await this.axios.put(`rest/articles/${this.id}`,this.model)
                
            }else{
                await this.axios.post('rest/articles',this.model)
            } 
            this.$router.push('/articles/list')
            this.$message({
                type:'success',
                message:'更新成功'
            }) 
        },
        async fetch(){
            const res = await this.axios.get(`rest/articles/${this.id}`)
            this.model = res.data
        },
        async fetchCategories(){
            const res = await this.axios.get(`rest/categories`)
            this.categories = res.data
        },
        async handleImageAdded(file, Editor, cursorLocation, resetUploader){
            const formData = new FormData()
            formData.append('file',file)

            const res = await this.axios.post('upload',formData)
            Editor.insertEmbed(cursorLocation, "image", res.data.url)
            resetUploader();
        }
    },
    created(){
        this.id && this.fetch()
        this.fetchCategories()
    }
}
</script>