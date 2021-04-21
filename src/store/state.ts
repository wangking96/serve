import { players } from "../common/data";
export interface stateProps {
    matchDetail: {},
    playerList: players,
}

export const state: stateProps = {
    matchDetail: {},
    playerList: {
        awayPlayerList: [],
        homePlayerList: []
    }
}

