<template>
    <div>
        <h1>{{id?'编辑':'新建'}}管理员</h1>
        <el-form label-width="120px" @submit.native.prevent="save" status-icon :model="model"
        :rules="rules" ref="model">
            <el-form-item label="用户名">
                <el-input v-model="model.username"/>
            </el-form-item>
            <el-form-item label="密码" prop="pass">
                <el-input type="password" v-model="model.password"/>
            </el-form-item>
            <el-form-item label="重复密码" prop="checkPass">
                <el-input type="password" v-model="model.checkPass"/>
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
        let validatePass1 = (rule, value, callback) => {
            if (value === '') {
                callback(new Error('请输入密码'));
            } else {
            if (this.model.checkPass !== '') {
                this.$refs.model.validateField('checkPass');
            }
                callback();
            }
        };
        let validatePass2 = (rule, value, callback)=>{
            if (value === '') {
                callback(new Error('请再次输入密码'));
            } else if (value !== this.model.password) {
                callback(new Error('两次输入密码不一致!'));
            } else {
                callback();
            }
        }
        return{
            rules:{
                pass: [
                    { validator: validatePass1, trigger: 'blur' }
                ],
                checkPass: [
                    { validator: validatePass2, trigger: 'blur' }
                ],
            },
            model:{
            },
        }
    },
    props:{  //和路由解耦
        id:{}
    },
    methods:{
        save(){
            this.$refs.model.validate((valid) =>  {
                if (!valid) {
                    this.$message({
                        type:'error',
                        message:'请重新输入'
                    })
                    return false;
                }else{
                    if(this.id){
                        this.axios.put(`rest/admin_users/${this.id}`,this.model)
                    }
                    else{
                        this.axios.post('rest/admin_users',this.model)
                    } 
                    this.$router.push('/admin_users/list')
                    this.$message({
                        type:'success',
                        message:'更新成功'
                    })   
                }
            });
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