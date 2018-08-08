import * as _ from 'lodash';
import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'filter'
})
export class FilterPipe implements PipeTransform {

  transform(ninjas: any, term: any): any {
    // check if  search term is undefined
    if (term === undefined) {return ninjas;}

    return ninjas.filter(function(ninjas){
// console.log(ninjas.name.toLowerCase().includes(term.toLowerCase()))
 return ninjas.name.toLowerCase().includes(term.toLowerCase());
      // return ninjas.name.toLowerCase().includes(term.toLowercase());
    })
  }

}
// import * as _ from 'lodash';
// import { Pipe, PipeTransform } from '@angular/core';

// @Pipe({
//   name: 'residentFilter'
// })
// export class ResidentFilterPipe implements PipeTransform {

//   transform(array: any[], query: string, type:string): any {
//     if(type == 'name'){
//         if (query) {
//             return _.filter(array, row=>row.residentName.toLowerCase().indexOf(query.toLowerCase()) > -1);
//         }
//     } else{
//         if (query) {
//             return _.filter(array, row=>row.mobileNo.toLowerCase().indexOf(query.toLowerCase()) > -1);
//         }
//     }
    
//     return array;
//   }
// }