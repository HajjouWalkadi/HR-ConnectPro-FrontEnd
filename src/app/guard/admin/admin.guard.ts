import { CanActivateFn, Router } from '@angular/router';

export const adminGuard: CanActivateFn = (route, state) => {

  
  const router = new Router;
   // Get the role from local storage
   const storedRole = localStorage.getItem('role');

   if ( storedRole === 'ADMIN') {
      return true; 
   } else {
     return false;
   }
   
};
