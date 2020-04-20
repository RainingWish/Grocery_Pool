import { Component, OnInit } from '@angular/core';
import { BaseUI } from '../common/baseui';
import { Storage } from '@ionic/storage';
import { NavController } from '@ionic/angular';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { LoadingController, AlertController } from '@ionic/angular';
import { FirestoreService } from '../services/data/firestore.service';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-register',
  templateUrl: './register.page.html',
  styleUrls: ['./register.page.scss'],
})
export class RegisterPage extends BaseUI implements OnInit {

  public RegForm: FormGroup;
  public regList;

  constructor(
    public loadingController: LoadingController,
    public navCtrl: NavController,
    private storage: Storage,
    public alertCtrl: AlertController,
    public firestoreService: FirestoreService,
    formBuilder: FormBuilder
  ) {
    super(loadingController);
    this.RegForm = formBuilder.group({
      Fname: ['', Validators.required],
      Lname: ['', Validators.required],
      Email: ['', Validators.required],
      Password: ['', Validators.required]
    });
  }

  ngOnInit() {

  }

  async register() {
    const loading = await this.loadingController.create();
    const Fname = this.RegForm.value.Fname;
    const Lname = this.RegForm.value.Lname;
    const Email = this.RegForm.value.Email;
    const Password = this.RegForm.value.Password;
    const check = this.firestoreService.getRegDetail(Email).valueChanges.toString;
    console.log(check);
    this.firestoreService
      .Reg(Fname, Lname, Email, Password)
      .then(
        () => {
          super.presentLoading();
          loading.dismiss().then(() => {
            this.storage.set('testname', 'Fname');
            this.navCtrl.navigateForward('tabs');
          });
        },
        error => {
          console.error(error);
          this.navCtrl.navigateForward('tabs');
        }
      );
  }

}
