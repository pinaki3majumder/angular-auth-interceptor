// src/app/core/services/http-error-handler.util.ts
import { HttpErrorResponse } from '@angular/common/http';
import { throwError } from 'rxjs';

export function httpErrorHandler(error: HttpErrorResponse) {
    let errorMessage = 'Unknown error!';

    if (error.error instanceof ErrorEvent) {
        errorMessage = `Client Error: ${error.error.message}`;
    } else {
        switch (error.status) {
            case 400:
                errorMessage = 'Bad Request';
                break;
            case 401:
                errorMessage = 'Unauthorized - Please login again.';
                break;
            case 403:
                errorMessage = 'Forbidden - You do not have permission.';
                break;
            case 404:
                errorMessage = 'Not Found - The resource does not exist.';
                break;
            case 500:
                errorMessage = 'Internal Server Error';
                break;
            default:
                errorMessage = `Error Code: ${error.status}\nMessage: ${error.message}`;
        }
    }

    return throwError(() => new Error(errorMessage));
}
