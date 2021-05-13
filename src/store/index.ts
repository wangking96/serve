/*
 * @version:  ;
 * @description:  ;
 * @autor: Full
 * @date: Do not edit
 */
import { createStore, createLogger } from "vuex";
import { store as live, liveStore, liveState } from "../store/modules/live";

export interface RootState {
  live: liveState;
}
const debug = import.meta.env.VITE_APP_ENV_MODE !== "production";

const plugins = debug ? [createLogger({})] : [];
export type Store = liveStore<Pick<RootState, "live">>;
const store = createStore({
  modules: {
    live,
  },
  plugins,
});

export default store;

export function useStore(): Store {
  return store as Store;
}
