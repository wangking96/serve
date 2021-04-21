/*
 * @Version:  ;
 * @Description:  ;
 * @Autor: Full
 * @Date: 2021-04-02 18:40:45
 */
export interface tabListItem {
  id: number;
  name: string;
  status: number;
}

export interface matchListItem {
  awayLogo: string;
  awayNameEn: string;
  awayNameZh: string;
  awayScores: Array<number>;
  awayTeamId: number;
  homeLogo: string;
  homeNameEn: string;
  homeNameZh: string;
  homeScores: Array<number>;
  homeTeamId: number;
  id: number;
  kind: number;
  matchStatusCode: number;
  matchStatusName: string;
  matchTime: number;
  neutral: number;
  periodCount: number;
  sportId: number;
}
