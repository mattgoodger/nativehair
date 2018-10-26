import { Component, OnInit } from '@angular/core';
import { BackendService } from 'src/app/services/backend.service';
import { AngularFireAuth } from '@angular/fire/auth';


@Component({
  selector: 'login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  userloggedin: boolean = false;
  error: boolean = false;
  errorMessage: String = "";
  dataLoading: boolean = false;

  constructor(public afAuth : AngularFireAuth, private _backendService : BackendService) { }

  ngOnInit() {
   // this.userloggedin = false;
   this.getAuthStatus();
  }

  login(loginType, formData?) {
    this.dataLoading = true;
    return this._backendService.login(loginType, formData).catch(
      (err) => {
        this.error = true;
        this.errorMessage = err.message;
        console.log(err);
        this.dataLoading = false;
      }
    );
  }

  logout() {
    this.dataLoading = true;
    return this._backendService.logout().then((success) =>
    {
      this.userloggedin = false;
      this.dataLoading = false;
    });
  }

  getAuthStatus() {
    this.dataLoading = true;
    this._backendService.redirectLogin().then(function(result){
      if (result.credential["accessToken"] != "") {
        console.log(result.credential);{ 
          return this.userloggedin = true;
        }
        this.dataLoading = false;
      }
    }).catch(
      (err) => {
        this.error= true;
        this.errorMessage = err.message;
        console.log(err);
        this.userloggedin = false;
        this.dataLoading = false;
      }
    );
    this.dataLoading = false;
  }

}
