import { AbstractControl, ValidationErrors, ValidatorFn } from '@angular/forms';

export const passwordMatchValidator: ValidatorFn = (control: AbstractControl): ValidationErrors | null => {
  const password = control.get('password');
  const confirmarC = control.get('confirmarC');
  return password && confirmarC && password.value !== confirmarC.value ? { passwordMismatch: true } : null;
};
