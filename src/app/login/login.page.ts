import { Component, OnInit } from '@angular/core';
import { BaseUI } from '../common/baseui';
import { LoadingController } from '@ionic/angular';
import { Storage } from '@ionic/storage';
import { NavController } from '@ionic/angular';


@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage extends BaseUI {

  email: any;
  password: any;

  constructor(
    public loadingController: LoadingController,
    public navCtrl: NavController,
    private storage: Storage
    ) {
    super(loadingController);
  }

  async login() {
    await super.presentLoading();
    this.storage.set('testname', 'login');
    this.navCtrl.navigateForward('tabs');
  }

}
