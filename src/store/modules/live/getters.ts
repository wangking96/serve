/*
 * @version:  ;
 * @description:  ;
 * @autor: Full
 * @date: Do not edit
 */
import { GetterTree } from "vuex";
import { liveState } from "./state";
import { RootState } from "../../index";

export type Getters = {
  getCount(state: liveState): number | null;
};

export const getters: GetterTree<liveState, RootState> & Getters = {
  getCount: (state) => state.count + 1,
};
