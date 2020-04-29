<template>
    <div>
        <h1>分类列表</h1>
        <el-table :data="articles">
            <el-table-column prop="title" label="文章名称"></el-table-column>
            <el-table-column prop="categories" label="所属分类">
                <template slot-scope="scope">
                    <el-tag v-for="item in scope.row.categories" :key="item._id" 
                    type="success">{{item.name}}</el-tag>
                </template>
            </el-table-column>
            <el-table-column
                fixed="right"
                label="操作"
                width="180">
                <template slot-scope="scope">
                <el-button type="text" size="small"
                    @click="$router.push(`/articles/edit/${scope.row._id}`)">编辑
                </el-button>
                <el-button type="text" size="small"
                    @click="remove(scope.row)">删除
                </el-button>
                </template>
            </el-table-column>
        </el-table>
    </div>
</template>

<script>
export default {
    data(){
        return{
            articles:[]
        }
    },
    methods:{
        async fetch(){
            let res = await this.axios("rest/articles")
            this.articles = res.data
        },
        remove(row){
            this.$confirm(`是否要删除<<${row.title}>>?`, '提示', {
                confirmButtonText: '确定',
                cancelButtonText: '取消',
                type: 'warning'
            }) 
            .then(async () => {
                await this.axios.delete(`rest/articles/${row._id}`)
                this.$message({
                    type: 'success',
                    message: '删除成功!'
                });
                this.fetch()
            })
            .catch(() => {
                this.$message({
                    type: 'info',
                    message: '已取消删除'
                });          
            });
        }
    },
    created(){
        this.fetch()
    }
}
</script>