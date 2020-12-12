import { Component, OnInit } from '@angular/core';
import { StatusBar } from '@ionic-native/status-bar/ngx';
import { AlertController, ModalController, Platform } from '@ionic/angular';
import { ToastService } from 'src/app/providers/toast.service';
import { AuthenticationService } from 'src/app/services/authentication.service';
import { HttpService } from 'src/app/services/http.service';

@Component({
  selector: 'app-search-dietary',
  templateUrl: './search-dietary.page.html',
  styleUrls: ['./search-dietary.page.scss'],
})
export class SearchDietaryPage implements OnInit {

  public user;
  public keyword = '';
  public dietItemsList;
  public showProgress = false;

  constructor(
    private authService: AuthenticationService,
    private toast      : ToastService,
    private http       : HttpService,
    private alert      : AlertController,
    public  modal      : ModalController,
    private platform   : Platform,
    private statusBar  : StatusBar
  ) {
    this.platform.ready().then(() => {
      this.statusBar.overlaysWebView(false);
      this.statusBar.backgroundColorByHexString('#6ab2fc');
      this.statusBar.styleLightContent();
    });
  }

  ngOnInit() {
    this.user = this.authService.getUser().then((data) => {  
      this.user = data;
    });
  }

  getdietItemsData() {
    let  data       = [];
    data['token']   = this.user.token;
    data['keyword'] = this.keyword;

    this.showProgress = true;
    this.http.getDietaryItems(data).subscribe((response) => {
      if(response['status'] == 200) { 
        let data = response['data'];
        if(data.length>0) {
          this.dietItemsList = data;
        } else {
          this.dietItemsList = [];
        }
      } 
    },(error) => {
        this.dietItemsList = [];
        this.toast.errorToast('Failed, Please try again later');
      }
    );
    this.showProgress = false;
  }

  async addDietItems(item) {
    const alert = await this.alert.create({
      header: `Add ${item.food_item.toLowerCase()} to diet `,
      message: `How many ${item.food_item.toLowerCase()} did you eat. Please add in ${item.food_item_measure_type.toLowerCase()}`,
      inputs: [
        {
          name: 'dietary_quantity',
          type: 'number',
          placeholder: `${item.food_item_measure_type.toLowerCase()}: (e.g. 1)`
        },
      ],
      buttons: [
        {
          text: 'Cancel',
          role: 'cancel',
          cssClass: 'secondary',
          handler: () => {}
        }, {
          text: 'Add',
          handler: (quantity) => {
            if(quantity && quantity.dietary_quantity>0) {
              item.dietary_quantity = quantity.dietary_quantity;
              this.dismissModal(item);
            }
          }
        }
      ]
    });
    await alert.present();
  }

  dismissModal(item: any={}) {
    this.modal.dismiss(item);
  }

}
