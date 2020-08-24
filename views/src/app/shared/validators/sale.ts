import { FormControl, Validators, FormGroup } from '@angular/forms';

export class SaleValidators {
  pageNameFormControl = new FormControl('', [Validators.required]);

  cpfCnpjFormControl = new FormControl('', [
    Validators.required,
    Validators.minLength(11),
    Validators.maxLength(14),
  ]);

  nameFormControl = new FormControl('', [Validators.required]);

  cpfFormControl = new FormControl('', [
    Validators.required,
    Validators.minLength(11),
    Validators.maxLength(11),
  ]);

  birthDateFormControl = new FormControl('', [Validators.required]);

  phoneFormControl = new FormControl('', [
    Validators.required,
    Validators.minLength(10),
    Validators.maxLength(11),
  ]);

  emailFormControl = new FormControl('', [
    Validators.required,
    Validators.email,
  ]);

  // usernameFormControl = new FormControl('', [
  //   Validators.required,
  //   Validators.minLength(6),
  //   Validators.maxLength(16),
  //   Validators.pattern('^[a-z0-9_-]+$'),
  // ]);

  // passwordFormControl = new FormControl('', [
  //   Validators.required,
  //   Validators.minLength(8),
  //   Validators.maxLength(16),
  // ]);

  postalCodeFormControl = new FormControl('', [
    Validators.required,
    Validators.minLength(8),
    Validators.maxLength(8),
  ]);

  streetFormControl = new FormControl('', [Validators.required]);

  numberFormControl = new FormControl('', [Validators.required]);

  districtFormControl = new FormControl('', [Validators.required]);

  cityFormControl = new FormControl('', [Validators.required]);

  stateFormControl = new FormControl('', [Validators.required]);

  public getPageNameErrorMessage() {
    return this.pageNameFormControl.hasError('required')
      ? 'Este campo é obrigatório'
      : '';
  }

  public getCpfCnpjErrorMessage() {
    return this.cpfCnpjFormControl.hasError('required')
      ? 'Este campo é obrigatório'
      : this.cpfCnpjFormControl.hasError('minlength')
      ? 'Há números faltando'
      : this.cpfCnpjFormControl.hasError('maxlength')
      ? 'Há números demais'
      : '';
  }

  public getPhoneErrorMessage() {
    return this.phoneFormControl.hasError('required')
      ? 'Este campo é obrigatório'
      : this.phoneFormControl.hasError('minlength')
      ? 'Há números faltando'
      : this.phoneFormControl.hasError('maxlength')
      ? 'Há números demais'
      : '';
  }

  public getEmailErrorMessage() {
    return this.emailFormControl.hasError('required')
      ? 'Este campo é obrigatório'
      : this.emailFormControl.hasError('email')
      ? 'Email inválido'
      : '';
  }

  // public getUsernameErrorMessage() {
  //   return this.usernameFormControl.hasError('required')
  //     ? 'Este campo é obrigatório'
  //     : this.usernameFormControl.hasError('minlength')
  //     ? 'Mínimo 6 caracteres'
  //     : this.usernameFormControl.hasError('maxlength')
  //     ? 'Máximo 16 caracteres'
  //     : this.usernameFormControl.hasError('pattern')
  //     ? 'Este campo só aceita letras minúsculas'
  //     : '';
  // }

  // public getPasswordErrorMessage() {
  //   return this.passwordFormControl.hasError('required')
  //     ? 'Este campo é obrigatório'
  //     : this.passwordFormControl.hasError('minlength')
  //     ? 'Mínimo 8 caracteres'
  //     : this.passwordFormControl.hasError('maxlength')
  //     ? 'Máximo 16 caracteres'
  //     : '';
  // }

  public getNameErrorMessage() {
    return this.nameFormControl.hasError('required')
      ? 'Este campo é obrigatório'
      : '';
  }

  public getCpfErrorMessage() {
    return this.cpfFormControl.hasError('required')
      ? 'Este campo é obrigatório'
      : this.cpfFormControl.hasError('minlength')
      ? 'Há números faltando'
      : this.cpfFormControl.hasError('maxlength')
      ? 'Há números demais'
      : '';
  }

  public getBirthDateErrorMessage() {
    return this.phoneFormControl.hasError('required')
      ? 'Este campo é obrigatório'
      : '';
  }

  public getPostalCodeErrorMessage() {
    return this.postalCodeFormControl.hasError('required')
      ? 'Este campo é obrigatório'
      : this.postalCodeFormControl.hasError('minlength')
      ? 'Há números faltando'
      : this.postalCodeFormControl.hasError('maxlength')
      ? 'Há números demais'
      : '';
  }

  public getStreetErrorMessage() {
    return this.postalCodeFormControl.hasError('required')
      ? 'Este campo é obrigatório'
      : '';
  }

  public getNumberErrorMessage() {
    return this.numberFormControl.hasError('required') ? '*' : '';
  }

  public getDistrictErrorMessage() {
    return this.districtFormControl.hasError('required')
      ? 'Este campo é obrigatório'
      : '';
  }

  public getCityErrorMessage() {
    return this.cityFormControl.hasError('required')
      ? 'Este campo é obrigatório'
      : '';
  }

  public getStateErrorMessage() {
    return this.stateFormControl.hasError('required')
      ? 'Este campo é obrigatório'
      : '';
  }
}
