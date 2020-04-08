<template>
    <div>
        <h1>{{id?'编辑分类':'新建分类'}}</h1>
        <el-form label-width="120px" @submit.native.prevent="save">
            <el-form-item label="上级分类">
                <el-select v-model="model.parent">
                    <el-option v-for="item in parents" :key="item._id" 
                        :label="item.name" :value="item._id">
                    </el-option>
                </el-select>
            </el-form-item>
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
            model:{},
            parents:[]
        }
    },
    props:{  //和路由解耦
        id:{}
    },
    methods:{
        async save(){
            if(this.id){
                await this.axios.put(`rest/categories/${this.id}`,this.model)
                
            }else{
                await this.axios.post('rest/categories',this.model)
            } 
            this.$router.push('/categories/list')
            this.$message({
                type:'success',
                message:'更新成功'
            }) 
        },
        async fetch(){
            const res = await this.axios.get(`rest/categories/${this.id}`)
            this.model = res.data
        },
        async fetchParent(){
            const res = await this.axios.get(`rest/categories`)
            this.parents = res.data
        }
    },
    created(){
        this.id && this.fetch()
        this.fetchParent()
    }
}
</script>