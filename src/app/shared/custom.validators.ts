import {FormControl} from "@angular/forms";
import {Observable} from "rxjs";

export class CustomValidators {

  static emptyField(control: FormControl): Promise<{ [key: string]: boolean }> | Observable<{ [key: string]: boolean }> {
    return new Promise(resolve => {
      if (control.value.trim() === '') {
        resolve({
          emptyField: true
        })
      } else {
        resolve(null)
      }
    })
  }

}
