import { Method } from 'axios';

export interface requestItem {
    url: string
    params: any
    method: Method
}