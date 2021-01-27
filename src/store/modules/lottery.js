import Bet from '@/api/Bet'

const lottery = {
	state: {
        lotterys: [],
        lotteryMap: {}
	},
	mutations: {
        SET_LOTTERY: (state, {lotterys, lotteryList}) => {
            state.lotterys = lotterys
            const L_MAP = {}
            for (let i = 0; i < lotteryList.length; i++) {
                const lottery = lotteryList[i]
                L_MAP[lottery.id] = lottery
            }
            state.lotteryMap = L_MAP
        }
    },
    actions: {
        getLottery: ({commit, state}) => {
            Bet.getLotteryList({ allLotterysFlag: true }).then(res => {
                commit('SET_LOTTERY', {lotterys: res.category_list, lotteryList: res.lottery_list})
            })
        }
    }
}

export default lottery
