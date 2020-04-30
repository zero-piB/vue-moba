<template>
    <div>
        <h1>{{id?'编辑英雄':'新建英雄'}}</h1>
        <el-form label-width="120px" @submit.native.prevent="save">
            <el-tabs value="basic" type="border-card">
                <el-tab-pane label="基础信息" name="basic">
                    <el-form-item label="名称">
                        <el-input v-model="model.name"/>
                    </el-form-item>
                    <el-form-item label="称号">
                        <el-input v-model="model.title"/>
                    </el-form-item>
                    <el-form-item label="头像">
                        <el-upload
                            class="avatar-uploader"
                            :action="uploadUrl"
                            :show-file-list="false"
                            :on-success="afterUpload">
                            <img v-if="model.avatar" :src="model.avatar" class="avatar">
                            <i v-else class="el-icon-plus avatar-uploader-icon"></i>
                        </el-upload>
                    </el-form-item>
                    <el-form-item label="类型">
                    <el-select v-model="model.categories" multiple>
                        <el-option v-for="item of categories" :key="item._id"
                        :label="item.name" :value="item._id"></el-option>
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

                    <el-form-item label="顺风出装">
                        <el-select v-model="model.items1" multiple>
                        <el-option v-for="item of items" :key="item._id"
                        :label="item.name" :value="item._id"></el-option>
                    </el-select>
                    </el-form-item>
                    <el-form-item label="逆风出装">
                        <el-select v-model="model.items2" multiple>
                        <el-option v-for="item of items" :key="item._id"
                        :label="item.name" :value="item._id"></el-option>
                    </el-select>
                    </el-form-item>
                    <el-form-item label="使用技巧">
                        <el-input type="textarea" v-model="model.usageTips"/>
                    </el-form-item>
                    <el-form-item label="对线技巧">
                        <el-input type="textarea" v-model="model.battleTips"/>
                    </el-form-item>
                    <el-form-item label="团战技巧">
                        <el-input type="textarea" v-model="model.teamTips"/>
                    </el-form-item>
                </el-tab-pane>
                <el-tab-pane label="技能" name="skills">
                    <el-button @click="model.skills.push({})"><i class="el-icon-plus"></i>添加技能</el-button>
                    <el-row type="flex" style="flex-wrap:wrap; margin-top:1rem">
                        <el-col :md="12" v-for="(item,i) in model.skills" :key="i">
                            <el-form-item label="名称">
                                <el-input  v-model="item.name"/>
                            </el-form-item>
                            <el-form-item label="图标">
                                <el-upload
                                    class="avatar-uploader"
                                    :action="axios.defaults.baseURL+'/upload' "
                                    :show-file-list="false"
                                    :on-success="res => $set(item,'icon',res.url)">
                                    <img v-if="item.icon" :src="item.icon" class="avatar">
                                    <i v-else class="el-icon-plus avatar-uploader-icon"></i>
                                </el-upload>
                            </el-form-item>
                            <el-form-item label="描述">
                                <el-input type="textarea" v-model="item.description"/>
                            </el-form-item>
                            <el-form-item label="使用提示">
                                <el-input type="textarea" v-model="item.tips"/>
                            </el-form-item>
                            <el-form-item>
                                <el-button type="danger" @click="model.skills.splice(i,1)">删除技能</el-button>
                            </el-form-item>
                            
                        </el-col>
                    </el-row>
                </el-tab-pane>
            </el-tabs>
            <el-form-item>
                <el-button type="primary" native-type="submit" style="margin-top:1rem">保存</el-button>
            </el-form-item>
        </el-form>
        
    </div>
</template>

<script>
export default {
    data(){
        return{
            categories:[],
            items:[],
            model:{
                avatar:'',
                scores:{    
                    difficulty:0,
                },
                skills:[]
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
            //this.model = res.data
            this.model = Object.assign({}, this.model, res.data); //这种复制方式不是暴力替换
        },
        async fetchCategories(){
            const res = await this.axios.get(`rest/categories`)
            this.categories = res.data.filter(item=>{
                if(item.parent){
                    return item.parent.name === '英雄'
                }
                return false;
            })
        },
        async fetchItems(){
            const res = await this.axios.get(`rest/items`)
            this.items = res.data
        },
        afterUpload(res){
            this.model.avatar = res.url
            // console.log(res) 
        }
    },
    created(){
        this.fetchCategories()
        this.fetchItems()
        this.id && this.fetch()
    }
}
</script>

