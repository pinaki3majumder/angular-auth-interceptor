import { FormControl } from "@angular/forms";


export type LOGIN_RESPONSE = {
    id: number;
    username: string;
    email: string;
    firstName: string;
    lastName: string;
    gender: string;
    image: string;
} & TOKEN;

export type TOKEN = {
    accessToken: string;
    refreshToken: string;
}

export type LOGIN_FORM_CONTROLS = {
    username: FormControl<string>,
    password: FormControl<string>
};

export type LOGIN_FORM_VALUES = {
    username: string,
    password: string,
    expiresInMins?: number
}; 