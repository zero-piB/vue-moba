<template>
    <div class="page-hero" v-if="model">
        <div class="topbar bg-black pt-2 pb-1 px-5 w-100 text-white d-flex ai-center">
            <img src="../assets/logo.png" height="31rem" class="pr-1"/>
            <div class="px-2 flex-1">
                <span class="fs-md py-1">王者荣耀</span>
                <span class="fs-md py-1 pl-4">攻略战</span>
            </div>
            <router-link tag="div" to="/" class="fs-sm">更多英雄 &gt;</router-link>
        </div>
        <div class="top" :style="{'background-image':`url(${model.banner})`}" v-if="model.categories">
            <div class="info text-white p-4 h-100 jc-end d-flex flex-column">
                <div class="fs-sm">{{model.title}}</div>
                <h2 class="my-2">{{model.name}}</h2>
                <div class="fs-sm">{{model.categories.map(v => v.name).join('/')}}</div>
                <div class="d-flex jc-between">
                    <div class="scores fs-sm" v-if="model.scores">
                        <span>难度</span>
                        <span class="badge bg-primary">{{model.scores.difficulty}}</span>
                        <span>技能</span>
                        <span class="badge bg-blue-1">{{model.scores.skills}}</span>
                        <span>攻击</span>
                        <span class="badge bg-danger">{{model.scores.attack}}</span>
                        <span>生存</span>
                        <span class="badge bg-grey">{{model.scores.survive}}</span>
                    </div>
                    <router-link to="/" tag="span" class="text-grey fs-sm">皮肤: &gt;</router-link>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
export default {
    data(){
        return{
            model:{

            }
        }
    },
    props:{
        id:{require:true}
    },
    methods:{
        async fetch(){
            const res = await this.axios.get(`heroes/${this.id}`)
            this.model = res.data
        }
    },
    created(){
        this.fetch()
    }
}
</script>

<style lang="scss">
.page-hero{
    .top{
        height: 50vw;
        background: #fff no-repeat top center;
        background-size: auto 100%;
    }
    .info{
        background: linear-gradient(rgba(0,0,0,0),rgba(0,0,0,1));
        .scores{
            .badge{
                margin: 0 0.25rem;
                display: inline-block;
                width: 1rem;
                height: 1rem;
                line-height: 1rem;
                text-align: center;
                border-radius: 50%;
                font-size: 0.6rem;
                border: 1px solid rgba(255,255,255,0.3);
            }
        }
    }
}
</style>