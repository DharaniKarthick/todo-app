import { Component } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {
  loginData = { username: '', password: '' };
  apiUrl = 'https://todoapplication20231102110016.azurewebsites.net/'+'api/authentication/login'; // Replace with your login API endpoint
  token: string = ''

  constructor(private http: HttpClient,private router: Router) {}

  login() {
    this.http.post<any>(this.apiUrl, this.loginData).subscribe(
      (response: any) => {
        // Handle the successful login response here
        console.log(response);
        if(response.token != null){
          this.token = response.token;
        }

        this.router.navigate(["home",{ 'token': this.token }])
      },
      (error) => {
        // Handle login error (e.g., show an error message)
        console.error('Login failed', error);
      }
    );
  }
}
