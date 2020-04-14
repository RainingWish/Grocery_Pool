import { Component } from '@angular/core';
import { NavController } from '@ionic/angular';
import { Storage } from '@ionic/storage';
import { ThemeService } from '../services/setting.service';


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
    private storage: Storage,
    private themeSwitcher: ThemeService
  ) {
  }

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

  ThemeSwitcher() {
    // 0 = day mode
    // 1 = night mode
    if (this.themeSwitcher.currentTheme === 0) {
      this.themeSwitcher.setTheme('night');
      this.themeSwitcher.currentTheme = 1;
    } else {
      this.themeSwitcher.setTheme('day');
      this.themeSwitcher.currentTheme = 0;
    }
  }

}
