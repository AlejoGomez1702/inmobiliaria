import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'htmlToText'
})
export class HtmlToTextPipe implements PipeTransform 
{
  transform(text: string): string {
    return text ? text.replace(/]+>/gm, '') : '';
  }
}
