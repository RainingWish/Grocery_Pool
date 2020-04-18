import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { LoadingController, AlertController } from '@ionic/angular';
import { FirestoreService } from '../../services/data/firestore.service'
import { Router } from '@angular/router'; 
import { Observable } from 'rxjs';

@Component({
  selector: 'app-create',
  templateUrl: './create.page.html',
  styleUrls: ['./create.page.scss'],
})
export class CreatePage implements OnInit {
  public createUserForm: FormGroup;

  constructor(
    public loadingCtrl: LoadingController,
    public alertCtrl: AlertController,
    public firestoreService: FirestoreService,
    formBuilder: FormBuilder,
    private router: Router
  ) { 
    this.createUserForm = formBuilder.group({
      userName: ['', Validators.required],
      email: ['', Validators.required],
      location: ['', Validators.required],
      title: ['', Validators.required],
      description: ['', Validators.required]
    });

  }

  ngOnInit() {
  }
  async createUser() {
    const loading = await this.loadingCtrl.create();
  
    const userName = this.createUserForm.value.userName;
    const email = this.createUserForm.value.email;
    const location = this.createUserForm.value.location;
    const title = this.createUserForm.value.title;
    const description = this.createUserForm.value.description;
    console.log(email);
    console.log(title);
    console.log(description);  
    this.firestoreService
      .createUser(userName, email, location,title, description)
      .then(
        () => {
          loading.dismiss().then(() => {
            this.router.navigateByUrl('');
          });
        },
        error => {
          console.error(error);
        }
      );
    }



}
