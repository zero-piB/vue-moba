<template>
    <div>
        <h1>英雄列表</h1>
        <el-table :data="heroes">
            <el-table-column prop="name" label="英雄名称"></el-table-column>
            <el-table-column prop="title" label="称号"></el-table-column>
            <el-table-column prop="categories" label="英雄分类">
                <template slot-scope="scope">
                    <el-tag v-for="item in scope.row.categories" :key="item._id" 
                    type="success">{{item.name}}</el-tag>
                </template>
            </el-table-column>
            <el-table-column>
                <template slot-scope="scope">
                    <img :src="scope.row.avatar" style="height:3rem">
                </template>
            </el-table-column>
            <el-table-column
                fixed="right"
                label="操作"
                width="180">
                <template slot-scope="scope">
                <el-button type="text" size="small"
                    @click="$router.push(`/heroes/edit/${scope.row._id}`)">编辑
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
            heroes:[]
        }
    },
    methods:{
        async fetch(){
            let res = await this.axios("rest/heroes")
            this.heroes = res.data
        },
        remove(row){
            this.$confirm(`是否要删除${row.name}?`, '提示', {
                confirmButtonText: '确定',
                cancelButtonText: '取消',
                type: 'warning'
            }) 
            .then(async () => {
                await this.axios.delete(`rest/heroes/${row._id}`)
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