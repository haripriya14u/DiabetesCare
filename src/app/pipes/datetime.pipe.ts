import { Pipe, PipeTransform } from '@angular/core';
import * as moment from 'moment';

@Pipe({
  name: 'datetime'
})
export class DatetimePipe implements PipeTransform {

  transform(value: number, ...args: unknown[]): unknown {
    try {
      let stillUtc = moment.utc(value).toDate();
      return moment(stillUtc).local().format('lll');
    } catch(error) {
      return null;
    }
  }

}
