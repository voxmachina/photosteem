import {NgModule} from "@angular/core";
import {RouterModule, Routes} from "@angular/router";
import {FreshComponent} from "./fresh.component";

export const routes: Routes = [
  {path: '', component: FreshComponent}
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class FreshRoutingModule { }
