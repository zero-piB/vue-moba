<template>
    <div>
        <h1>{{id?'编辑物品':'新建物品'}}</h1>
        <el-form label-width="120px" @submit.native.prevent="save">
            <el-form-item label="名称">
                <el-input v-model="model['name']"/>
            </el-form-item>
            <el-form-item label="图标">
                <el-upload
                    class="avatar-uploader"
                    :action="uploadUrl"
                    :show-file-list="false"
                    :on-success="afterUpload">
                    <img v-if="model.icon" :src="model.icon" class="avatar">
                    <i v-else class="el-icon-plus avatar-uploader-icon"></i>
                </el-upload>
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
            model:{},
        }
    },
    props:{  //和路由解耦
        id:{}
    },
    methods:{
        async save(){
            if(this.id){
                await this.axios.put(`rest/items/${this.id}`,this.model)
                
            }else{
                await this.axios.post('rest/items',this.model)
            } 
            this.$router.push('/items/list')
            this.$message({
                type:'success',
                message:'更新成功'
            }) 
        },
        async fetch(){
            const res = await this.axios.get(`rest/items/${this.id}`)
            this.model = res.data
        },
        afterUpload(res){
            this.$set(this.model,'icon',res.url)
            // console.log(res) 
        }
    },
    created(){
        this.id && this.fetch()
    }
}
</script>

<style language="scss">

  
</style>