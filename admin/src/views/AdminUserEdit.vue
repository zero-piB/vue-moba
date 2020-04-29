<template>
    <div>
        <h1>{{id?'编辑':'新建'}}管理员</h1>
        <el-form label-width="120px" @submit.native.prevent="save">
            <el-form-item label="用户名">
                <el-input v-model="model.username"/>
            </el-form-item>
            <el-form-item label="密码">
                <el-input v-model="model.password"/>
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
                await this.axios.put(`rest/admin_users/${this.id}`,this.model)
                
            }else{
                await this.axios.post('rest/admin_users',this.model)
            } 
            this.$router.push('/admin_users/list')
            this.$message({
                type:'success',
                message:'更新成功'
            }) 
        },
        async fetch(){
            const res = await this.axios.get(`rest/admin_users/${this.id}`)
            this.model = res.data
        },
    },
    created(){
        this.id && this.fetch()
    }
}
</script>