import { stateProps } from "./state";

// export interface mutationProps {
//   setMatchDetal: (state: stateProps, value?: any) => void;
// }

export const mutations = {
    setMatchDetal(state: stateProps, value:any) {
        state.matchDetail = {...value};
    },
    setPlayerList(state: stateProps, value:any) {
        state.playerList = {...value};
    }
};
