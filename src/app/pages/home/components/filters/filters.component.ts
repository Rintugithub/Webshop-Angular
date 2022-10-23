import { Subscription } from 'rxjs';
import { StoreService } from './../../../../services/store.service';
import { Component, OnInit, Output, EventEmitter, OnDestroy } from '@angular/core';

@Component({
  selector: 'app-filters',
  templateUrl: 'filters.component.html'
})
export class FiltersComponent implements OnInit ,OnDestroy{
  @Output() showCategory = new EventEmitter<string>();
  categorySubscription: Subscription | undefined;
 categories: Array<string> | undefined;
  constructor( private storeService:StoreService) { }

  ngOnInit(): void {
    this.categorySubscription = this.storeService.getAllCategories()
    .subscribe((response)=>{
      this.categories = response;
    })
  }
  onShowCategory(category: string): void{
 this.showCategory.emit(category);
  }
  ngOnDestroy(): void {
    if (this.categorySubscription) {
      this.categorySubscription.unsubscribe();
    }
  }
  

}
