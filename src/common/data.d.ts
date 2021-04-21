interface playerItem {
    id: number
    logo: string
    nameEn: string
    nameZh: string
    position: string
    teamId: number
}
export interface players {
    awayPlayerList: playerItem[]
    homePlayerList: playerItem[]
}