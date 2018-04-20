/**
 * @author RKlein@rosen-group.com
 */
import {FodderStockEntry} from "./fodder-stock.model";

export class FodderStockDisplayEntry extends FodderStockEntry {
    public ItemName: string;
    public KindName: string;

    constructor(from: FodderStockEntry) {
        super();
        this.ID = from.ID;
        this.ItemREF = from.ItemREF;
        this.Amount = from.Amount;
    }
}