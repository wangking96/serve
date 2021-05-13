/*
 * @version:  ;
 * @description:  ;
 * @autor: Full
 * @date: Do not edit
 */
import { MutationTree } from "vuex";
import { liveState } from "./state";
import { liveMutationTypes } from "./mutation-types";

export type Mutations<S = liveState> = {
  [liveMutationTypes.TOGGLE_COUNT](state: S, count: number): void;
  [liveMutationTypes.TOGGLESUB_COUNT](state: S, count: number): void;
};

export const mutations: MutationTree<liveState> & Mutations = {
  [liveMutationTypes.TOGGLE_COUNT](state: liveState, count: number) {
    state.count = state.count + count;
  },
  [liveMutationTypes.TOGGLESUB_COUNT](state: liveState, count: number) {
    state.count = state.count - count;
  },
};
