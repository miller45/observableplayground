export class CatInfo {

    public uniqueId?: string;
    public name: string;
    public sleeping: boolean;
    public hash?:string;
}

export declare type CatInfos = Array<CatInfo>;
