import { FormGroup } from '@angular/forms';

export class PasswordMatchValidator {
    static validate(passwordFormGroup: FormGroup) {
        const password = passwordFormGroup.value['password'];
        const repeatPassword = passwordFormGroup.value['repeatPassword'];

        if (repeatPassword.length <= 0) {
            return null;
        }

        if (repeatPassword !== password) {
            return {
                doesMatchPassword: true
            };
        }

        return null;

    }
}
