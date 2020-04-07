<template>
    <div>
        <h1>我是编辑页面</h1>
        <el-form label-width="120px" @submit.native.prevent="save">
            <el-form-item label="名称">
                <el-input v-model="model['name']"/>
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
            model:{
                name:"2222"
            }
        }
    },
    methods:{
        async save(){
            await this.axios.post('categories',this.model)
            this.$router.push('/categories/list')
            this.$message({
                type:'success',
                message:'提交成功'
            }) 
        }
    }
}
</script>