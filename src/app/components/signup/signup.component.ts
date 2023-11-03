import { Component } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css']
})
export class SignupComponent {
  signupData = { username: '', email:'',password: '' };
  apiUrl = 'https://todoapplication20231102110016.azurewebsites.net/'+'/api/authentication/register'; // Replace with your login API endpoint
  //router: any;

  constructor(private http: HttpClient,private router: Router) {}

  signup() {
    this.http.post<any>(this.apiUrl, this.signupData).subscribe(
      (response: any) => {
        // Handle the successful login response here
        console.log(response);
        this.router.navigate(["login"])
      },
      (error) => {
        // Handle login error (e.g., show an error message)
        console.error('Signup failed', error);
      }
    );
  }
}

