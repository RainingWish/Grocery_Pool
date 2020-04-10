import { Component } from '@angular/core';
import { NavController } from '@ionic/angular';
import { Storage } from '@ionic/storage';


@Component({
  selector: 'app-more',
  templateUrl: './more.page.html',
  styleUrls: ['./more.page.scss'],
})
export class MorePage {

  public Logined = false;
  public notLogin = true;

  constructor(
    public navCtrl: NavController,
    private storage: Storage) { }

  ionViewDidEnter() {
    this.loadUserPage();
  }

  loadUserPage() {
    this.storage.get('testname').then((val) => {
      if (val != null) {
        this.Logined = true;
        this.notLogin = false;
      } else {
        this.Logined = false;
        this.notLogin = true;
      }
    });

  }

}
