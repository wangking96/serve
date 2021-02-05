<template>
    <div class="area">
        <div class="area-item" 
            v-for="(item, index) in provinceList"
            :key="index">
            <div>{{ item.areaName }}</div>
            <div class="area-city">
                <div class="area-city-item"
                    :class="{'active': curIndex == index && curProvinceIndex == k}"
                    v-for="(v, k) in item.city"
                    :key="k"
                    @click="provinceClickFn(index, v, k,)">
                    {{ v }}
                </div>
            </div>
        </div>
        <div class="area-item" v-if="homeData.city && homeData.city.length > 0">
            <div>市级 / 区</div>
            <div class="area-city">
                <div class="area-city-item"
                    :class="{'active': curCityIndex == c.id}"
                    v-for="c in homeData.city"
                    :key="c.id"
                    @click="handleClickFn('city', c)">
                    {{ c.name }}
                </div>
            </div>
        </div>
        <div class="area-item" v-if="homeData.county && homeData.county.length > 0">
            <div>区 / 县</div>
            <div class="area-city">
                <div class="area-city-item"
                    :class="{'active': curAreaindex == c.id}"
                    v-for="c in homeData.county"
                    :key="c.id"
                    @click="handleClickFn('area', c)">
                    {{ c.name }}
                </div>
            </div>
        </div>
    </div>
</template>

<script>
export default {
    props: {
        homeData: Object
    },
    data() {
        return {
            provinceList: [],
            curIndex: null,
            curProvinceIndex: null,
            curCityIndex: null,
            curAreaindex: null
        }
    },
    watch: {
        homeData(value){
            if(value) {
                let areaList = value.zone.item 
                let titleList = value.zone.title 
                this.provinceList = []
                for (const key in titleList) {
                    this.provinceList.push({
                        areaName: titleList[key],
                        city: areaList[key]
                    })
                }
            }
        }
    },
    methods: {
        provinceClickFn(index, v, k){
            this.curProvinceIndex = k
            this.curIndex = index
            this.$emit('provinceClick', k)
            this.$store.commit('set_province', v)
        },
        handleClickFn(type, item){
            this.$store.commit(type === 'city' ? 'set_city' : 'set_area', item.name)
            type === 'city' ? this.curCityIndex = item.id : this.curAreaindex =item.id
            this.$emit(type === 'city' ? 'cityClick' : 'areaClick', item.id)
        },
    }
}
</script>

<style lang="scss" scoped>
.area {
    .area-item {
        width: 100%;
        display: flex;
        margin-top: 20px;
        overflow: hidden;
        div {
            cursor: pointer;
            text-align: center;
        }
        & > div:first-child {
            float: left;
            width: 100px;
            height: 28px;
            line-height: 28px;
            margin-top: 10px;
            margin-left: 34px;
            margin-right: 46px;
            border: 1px solid #fff;
        }
        .area-city {
            flex: 1;
            display: flex;
            flex-wrap: wrap;
            &-item {
                width: 92px;
                height: 28px;
                line-height: 28px;
                margin-top: 10px;
                &:hover {
                    color: #FF9600;
                }
            }
            .active {
                color: #FF9600;
            }
        }
    }
}
</style>