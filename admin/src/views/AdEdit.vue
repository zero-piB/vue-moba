<template>
    <div>
        <h1>{{id?'编辑广告':'新建广告'}}</h1>
        <el-form label-width="120px" @submit.native.prevent="save">
            <el-form-item>
                <el-input v-model="model.name"></el-input>
            </el-form-item>
            <el-form-item>
                 <el-button @click="model.items.push({})"><i class="el-icon-plus"></i>添加广告</el-button>
            </el-form-item>
            <el-row type="flex" style="flex-wrap:wrap; margin-top:1rem">
                <el-col :md="24" v-for="(item,i) in model.items" :key="i">
                    <el-form-item label="跳转链接">
                        <el-input  v-model="item.link"/>
                    </el-form-item>
                    <el-form-item label="广告图">
                        <el-upload
                            class="avatar-uploader"
                            :action="uploadUrl"
                            :show-file-list="false"
                            :on-success="res => $set(item,'imgUrl',res.url)">
                            <img v-if="item.imgUrl" :src="item.imgUrl" class="avatar">
                            <i v-else class="el-icon-plus avatar-uploader-icon"></i>
                        </el-upload>
                    </el-form-item>
                    <el-form-item>
                        <el-button type="danger" @click="model.items.splice(i,1)">删除广告</el-button>
                    </el-form-item>
                    
                </el-col>
            </el-row>
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
                items:[]
            },
        }
    },
    props:{  //和路由解耦
        id:{}
    },
    methods:{
        async save(){
            if(this.id){
                await this.axios.put(`rest/ads/${this.id}`,this.model)
                
            }else{
                await this.axios.post('rest/ads',this.model)
            } 
            this.$router.push('/ads/list')
            this.$message({
                type:'success',
                message:'更新成功'
            }) 
        },
        async fetch(){
            const res = await this.axios.get(`rest/ads/${this.id}`)
            this.model = res.data
        },
    },
    created(){
        this.id && this.fetch()
    }
}
</script>