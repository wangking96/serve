/*
 * @version:  ;
 * @description:  ;
 * @autor: Full
 * @date: Do not edit
 */
export type Active = string | number | null;

export interface Tabs {
    state: TabsState;
    activateTab: (tab: Active) => void;
  }
  
  export interface TabsState {
    active: string | number | null;
  }