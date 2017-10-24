import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
    name: 'filter',
    pure: false
})

export class FilterPipe implements PipeTransform {
    transform(items: any[], term: string): any {
        return term
            ? items.filter((e: any) => new RegExp(term, 'gi').test(e.name))
            : items;
    }
}
