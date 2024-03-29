import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup } from '@angular/forms';

@Component({
  selector: 'app-form-builder',
  templateUrl: './form-builder.component.html',
  styleUrls: ['./form-builder.component.css']
})
export class FormBuilderComponent implements OnInit {
userForm!:FormGroup;
userData:any[]=[];
id!: number;
name!: string;
username!: string;
email!: string;
constructor(private fb:FormBuilder,private http:HttpClient) {
  
}
ngOnInit(): void {
  this.userForm=this.fb.group({
    id:[''],
    name:[''],
    username:[''],
    email:['']
  })
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
  // debugger;
  const obj = this.userForm.value;
  this.http.post('https://jsonplaceholder.typicode.com/users', obj).subscribe(
    (res: any) => {
      console.log('res', res);
      this.userData.push(res);
      this.userForm.reset();
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
