import { ClickAsObservableDirective } from "./directives/click-as-observable.directive";
import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { HighlightDirective } from "./directives/highlight.directive";

/**
 * @author RKlein@rosen-group.com
 */
@NgModule({
    declarations: [
        ClickAsObservableDirective, HighlightDirective
    ],
    imports: [
        CommonModule
    ],
    exports: [
        ClickAsObservableDirective, HighlightDirective
    ]
})
export class LibModule {
}
