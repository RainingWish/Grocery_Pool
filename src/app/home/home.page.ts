import { Component } from '@angular/core';
import { Geolocation } from '@ionic-native/geolocation/ngx';
import { LoadingController } from '@ionic/angular';
import { AlertController } from '@ionic/angular';
import {  OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { User } from '../models/user.interface';
import { FirestoreService } from '../services/data/firestore.service';
import { Router } from '@angular/router'; 

@Component({
  selector: 'app-home',
  templateUrl: './home.page.html',
  styleUrls: ['./home.page.scss'],
})
export class HomePage {
  lat: any = '';
  lng: any = '';
  public userList;
  constructor(private geolocation: Geolocation, public loadingController: LoadingController, public alertController: AlertController,
    private firestoreService: FirestoreService,
    private router: Router
    ) {
  }
  ngOnInit() {
    this.userList = this.firestoreService.getUserList().valueChanges();
    console.log(this.userList);
  }
  async getLoc() {
    const loading = await this.loadingController.create({
      message: 'Please wait...',
    });
    await loading.present();

    this.geolocation.getCurrentPosition({ maximumAge: 1000, timeout: 5000, enableHighAccuracy: true }).then((resp) => {

      loading.dismiss();
      this.lat = resp.coords.latitude;
      this.lng = resp.coords.longitude;
    }, er => {
      loading.dismiss();
      this.showLoader('Can not retrieve Location');
    }).catch((error) => {
      loading.dismiss();
      this.showLoader('Error getting location - ' + JSON.stringify(error));
    });
    console.info("here!!!");
    console.info(this.userList);
  }


  async showLoader(msg) {
    const alert = await this.alertController.create({
      message: msg,
      buttons: ['OK']
    });

    await alert.present();
  }




}
