import { CanDeactivateFn } from '@angular/router';
import { RegisterComponent } from '../../features/auth/components/register/register.component';

export const unsavedChangesGuard: CanDeactivateFn<RegisterComponent> = (component, currentRoute, currentState, nextState) => {
  return component.hasUnsavedChanges();
};
