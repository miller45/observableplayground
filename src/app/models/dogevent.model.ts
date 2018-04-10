/**
 * @author RKlein@rosen-group.com
 */
export class DogEvent {
    public kind: DogEventKind = DogEventKind.Unknown;
}

export enum DogEventKind {
    Unknown=0,
    DogArrives=1,
    DogLeaves=2,
    DogBark=3
}