export interface tabItem {
    id: number,
    title: string,
    title_icon: string
}

export interface teamItem {
    id: number,
    name_zh: string,
    name_icon: string,
    scores: string[]
}

export interface playerItem {
    id: number
    playerNumber: number
    playerName: string
    assists: number
    rebounds: number
    steals: number
    block: number
}