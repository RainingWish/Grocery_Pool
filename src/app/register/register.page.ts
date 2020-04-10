import { Component } from '@angular/core';
import { BaseUI } from '../common/baseui';
import { LoadingController } from '@ionic/angular';
import { Storage } from '@ionic/storage';
import { NavController } from '@ionic/angular';

@Component({
  selector: 'app-register',
  templateUrl: './register.page.html',
  styleUrls: ['./register.page.scss'],
})
export class RegisterPage extends BaseUI {

  email: any;
  password: any;
  Fname: any;
  Lname: any;

  constructor(
    public loadingController: LoadingController,
    public navCtrl: NavController,
    private storage: Storage
  ) {
    super(loadingController);
  }

  async register() {
    await super.presentLoading();
    this.storage.set('testname', 'register');
    this.navCtrl.navigateForward('tabs');
  }

}
