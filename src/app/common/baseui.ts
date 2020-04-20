import { LoadingController } from '@ionic/angular';

export abstract class BaseUI {

    constructor(public loadingController: LoadingController) {
    }

    async presentLoading() {
        const loading = await this.loadingController.create({
            message: 'Please wait...',
            duration: 1500
        });
        await loading.present();

        const { role, data } = await loading.onDidDismiss();
        console.log('Loading dismissed!');
    }
}
