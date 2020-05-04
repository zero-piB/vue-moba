<template>
    <m-card :title="title" :icon="icon">
        <div class="nav jc-between px-4 py-2">
            <div class="nav-item-inverse text-black" :class="{active:i==active}" 
            v-for="(item,i) in catesData" :key="i"
            @click="$refs.list.$swiper.slideTo(i)">{{item.name}}</div>
        </div>
        <div>
            <swiper ref="list" @slideChange="active = $refs.list.$swiper.realIndex" :options="swiperOptions">
                <swiper-slide v-for="(category,i) in catesData" :key="i+6">
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
        catesData:{type:Array,required:true}
    },
    methods:{
    },
    data(){
        return{
            active:0,
            swiperOptions:{
                autoHeight:true
            }
        }
    }
}
</script>