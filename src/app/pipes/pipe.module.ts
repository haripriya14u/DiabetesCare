import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DatetimePipe } from './datetime.pipe';

@NgModule({
  imports: [
    CommonModule
  ],
  exports: [
    DatetimePipe
  ],
  declarations: [
    DatetimePipe
  ]
})
export class PipeModule { }