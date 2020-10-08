import { FormGroup } from '@angular/forms';
export class FormUtils {
    public static getField(nomeField: string, form : FormGroup){
        return form.get(nomeField).value;
    } 
}