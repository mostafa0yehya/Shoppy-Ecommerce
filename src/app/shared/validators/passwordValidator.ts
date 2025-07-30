import { ValidationErrors, AbstractControl } from '@angular/forms';

export function passwordMatch(formInputs: AbstractControl): null | ValidationErrors {
  let password = formInputs.value.password;
  let rePassword = formInputs.value.rePassword;

   return password === rePassword ? null : { passwordMatchResult: true };

}
