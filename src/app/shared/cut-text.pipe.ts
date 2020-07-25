import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'cutText'
})
export class CutTextPipe implements PipeTransform {

  transform(value: string, maxlength = 200): string {
    const len = value.length;

    return len > maxlength
      ? `${value.substr(0, maxlength - 2).trim()}...`
      : len <= maxlength
      ? value : null;
  }

}
