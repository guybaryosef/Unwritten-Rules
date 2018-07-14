//connects us to the control's value (current tag)
import {AbstractControl } from '@angular/forms';


export function repeatingValidator(arr: string[]) {
    return (control: AbstractControl): {[key: string]: any} | null => {
        return (arr.indexOf(control.value) > -1 ? {'repeating': {value: control.value}} : null );
    }
}
export function tooManyValidator(arr: string[]) {
    return (control: AbstractControl): {[key: string]: any} | null => {
        return (arr.length > 4 ? {'tooMany': {value: control.value}} : null );
    }
}