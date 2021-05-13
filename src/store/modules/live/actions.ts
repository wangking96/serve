/*
 * @version:  ;
 * @description:  ;
 * @autor: Full
 * @date: Do not edit
 */
import { ActionTree, ActionContext } from "vuex";
import { liveActionTypes } from "./action-types";
import { Mutations } from "./mutations";
import { liveMutationTypes } from "./mutation-types";
import { liveState } from "./state";
import { RootState } from "../../index";
type AugmentedActionContext = {
  commit<K extends keyof Mutations>(
    key: K,
    payload: Parameters<Mutations[K]>[1]
  ): ReturnType<Mutations[K]>;
} & Omit<ActionContext<liveState, RootState>, "commit">;
export interface Actions {
  [liveActionTypes.COUNT_ACTION](
    { commit }: AugmentedActionContext,
    count: number
  ): void;
  [liveActionTypes.SUB_ACTION](
    { commit }: AugmentedActionContext,
    count: number
  ): void;
}

export const actions: ActionTree<liveState, RootState> & Actions = {
  [liveActionTypes.COUNT_ACTION]({ commit }, count: number) {
    commit(liveMutationTypes.TOGGLE_COUNT, count);
  },
  [liveActionTypes.SUB_ACTION]({ commit }, count: number) {
    commit(liveMutationTypes.TOGGLESUB_COUNT, count);
  },
};
