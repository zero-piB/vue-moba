<template>
    <m-card :title="title" :icon="icon">
        <div class="nav jc-between px-2 py-2">
            <div class="nav-item-inverse text-black" :class="{active:i==active}" 
            v-for="(item,i) in newsData" :key="i"
            @click="active=i">{{item.categoryName}}</div>
        </div>
        <div>
            <swiper>
                <swiper-slide v-for="(category,i) in newsData" :key="i+6">
                    <slot name="items" :category="category"></slot>
                </swiper-slide>
            </swiper>
        </div>
    </m-card>
</template>

<script>
export default {
    props:{
        title:{type:String,required:true},
        icon:{type:String,required:true},
        newsData:{type:Array,required:true}
    },
    data(){
        return{
            active:0,
        }
    }
}
</script>