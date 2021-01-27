<template>
    <div class="bet-select">
        <BetRow 
            class="bet-select-row"
            v-for="(row, i) in rows" 
            :key="i" 
            :row="row" 
            :middle="5">
        </BetRow>
    </div>
</template>

<script>
import BetRow from './BetRow'
const rows = [
    {
        unit: { id: 4, name: '千位'},
        balls: [],
        availableBalls: [0,1,2,3,4,5,6,7,8,9]
    },{
        unit: { id: 3, name: '百位'},
        balls: [],
        availableBalls: [0,1,2,3,4,5,6,7,8,9]
    },{
        unit: { id: 2, name: '十位'},
        balls: [],
        availableBalls: [0,1,2,3,4,5,6,7,8,9]
    },{
        unit: { id: 1, name: '个位'},
        balls: [],
        availableBalls: [0,1,2,3,4,5,6,7,8,9]
    }
]
export default {
    components: {
        BetRow
    },
    data() {
        return {
            rows: JSON.parse(JSON.stringify(rows))
        }
    }
}
</script>

<style lang="scss" scoped>
.bet-select {
    height: 100%;
    padding: 0 10px;
    overflow-x: hidden;
    overflow-y: auto;
    &-row {
        &:first-child {
            margin-top: 10px;
        }
    }
}
</style>