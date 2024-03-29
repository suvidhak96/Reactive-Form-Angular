import { HttpClient } from '@angular/common/http';
import { Component } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';

@Component({
  selector: 'app-form',
  templateUrl: './form.component.html',
  styleUrls: ['./form.component.css'],
})
export class FormComponent {
  userData: any[] = [];
  id!: any;
  name!: string;
  username!: string;
  email!: string;
  userForm: FormGroup = new FormGroup({
    id: new FormControl('0'),
    name: new FormControl(''),
    username: new FormControl(''),
    email: new FormControl(''),
  });

  constructor(private http: HttpClient) {
    this.getdata();
  }

  getdata() {
    this.http
      .get('https://jsonplaceholder.typicode.com/users')
      .subscribe((res: any) => {
        this.userData = res;
        console.log('user res', this.userData);
      });
  }
  save() {
    debugger;
    const obj = this.userForm.value;
    this.http.post('https://jsonplaceholder.typicode.com/users', obj).subscribe(
      (res: any) => {
        console.log('res', res);
      },
      (err) => {
        console.log('error', err);
      }
    );
  }

  edit(id: any) {
    this.http.get('https://jsonplaceholder.typicode.com/users/' + id).subscribe(
      (res: any) => {
        this.userForm = new FormGroup({
          id: new FormControl(res.id),
          name: new FormControl(res.name),
          username: new FormControl(res.username),
          email: new FormControl(res.email),
        });
        // console.log("res",res)
      },
      (err) => {
        console.log('error', err);
      }
    );
  }
}
