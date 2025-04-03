import { FormControl } from "@angular/forms";

export type REGISTER_FORM_CONTROLS = {
    username: FormControl<string>,
    email: FormControl<string>,
    password: FormControl<string>
};

export type REGISTER_FORM_VALUES = {
    username: string,
    email: string,
    password: string
}; 
