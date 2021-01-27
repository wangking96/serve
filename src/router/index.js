import Vue from 'vue'
import VueRouter from 'vue-router'
import Login from '../views/Login'
import Layout from '../views/Layout'

Vue.use(VueRouter)

const originalPush = VueRouter.prototype.push
VueRouter.prototype.push = function push(location, onResolve, onReject) {
  if (onResolve || onReject) return originalPush.call(this, location, onResolve, onReject)
  return originalPush.call(this, location).catch(err => err)
}

const routes = [
	{
		path: '/login',
		name: 'login',
		meta: {
			title: '登录'
		},
		component: Login
	},{
		path: '',
		component: Layout,
		children: [
			{
				path: '/',
				name: 'lottery',
				meta: {
					title: '彩票'
				},
				component: () => import('@/views/Lottery/index')
			},{
				path: '/zonghe',
				name: 'zonghe',
				meta: {
					title: '综合'
				},
				component: () => import('@/views/Zonghe/index')
			},{
				path: '/promotion',
				name: 'promotion',
				meta: {
					title: '优惠'
				},
				component: () => import('@/views/Promotion/index')
			},{
				path: '/main',
				component: () => import('@/views/Main/index'),
				children: [
					{
						path: '/main/lotterybet',
						name: 'lotterybet',
						component: () => import('@/views/Main/LotteryBet/index'),
						children: [
							{
								path: '/main/lotterybet/bet',
								name: 'bet',
								meta: {
									title: '投注区'
								},
								component: () => import('@/views/Main/LotteryBet/Bet/index')
							},{
								path: '/main/lotterybet/chat',
								name: 'chat',
								meta: {
									title: '聊天室'
								},
								component: () => import('@/views/Main/LotteryBet/Chat/index')
							},{
								path: '/main/lotterybet/openrecord',
								name: 'openrecord',
								meta: {
									title: '开奖记录'
								},
								component: () => import('@/views/Main/LotteryBet/OpenRecord/index')
							},{
								path: '/main/lotterybet/betrecord',
								name: 'betrecord',
								meta: {
									title: '投注记录'
								},
								component: () => import('@/views/Main/LotteryBet/BetRecord/index')
							}
						]
					},{
						path: '/main/lotteryhall',
						name: 'lotteryhall',
						component: () => import('@/views/Main/LotteryHall/index')
					}
				]
			},{
				path: '/mine',
				name: 'mine',
				meta: {
					title: '我的'
				},
				component: () => import('@/views/Mine/index')
			}
		]
	}
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

export default router
