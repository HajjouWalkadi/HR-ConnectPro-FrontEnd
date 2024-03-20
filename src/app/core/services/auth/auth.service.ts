import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';
import { AuthenticationRequestDTO } from 'src/app/dto/requests/auth-request.dto';
import { RegisterRequestDTO } from 'src/app/dto/requests/register-request.dto';
import { AuthenticationResponseDTO } from 'src/app/dto/responses/auth-response.dto';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root',
})
export class AuthService  {
  private apiUrl = `${environment.apiUrl}/auth`;

  constructor(
    private http: HttpClient
  ) {}

  register(registerRequest: RegisterRequestDTO): Observable<AuthenticationResponseDTO> {
    return this.http.post<AuthenticationResponseDTO>(`${this.apiUrl}/register`, registerRequest);
  }

  authenticate(authenticationRequest: AuthenticationRequestDTO): Observable<AuthenticationResponseDTO> {
    return this.http.post<AuthenticationResponseDTO>(`${this.apiUrl}/authenticate`, authenticationRequest);
  }
}
