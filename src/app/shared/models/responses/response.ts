import { UserConfigs } from './../user-configs';
export interface ResponseCustom{
    msg : string,
    data: {
        authorization?: string;
    };
}