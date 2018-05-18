/**
 * @author RKlein@rosen-group.com
 */
export class CatEvent {
    public kind: CatEventKind = CatEventKind.Unknown;
}

export enum CatEventKind {
    Unknown=0,
    CatArrives=1,
    CatLeaves=2,
    CatMeows=3
}