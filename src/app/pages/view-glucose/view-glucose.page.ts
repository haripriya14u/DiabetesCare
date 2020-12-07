import { Component, OnInit } from '@angular/core';
import { ModalController } from '@ionic/angular';
import { ToastService } from 'src/app/providers/toast.service';
import { AuthenticationService } from 'src/app/services/authentication.service';
import { HttpService } from 'src/app/services/http.service';

@Component({
  selector: 'app-view-glucose',
  templateUrl: './view-glucose.page.html',
  styleUrls: ['./view-glucose.page.scss'],
})
export class ViewGlucosePage implements OnInit {

  public user;
  public glucoseLogList;

  constructor(
    private authService: AuthenticationService,
    private toast      : ToastService,
    private http       : HttpService,
    public  modal      : ModalController
  ) { }

  ngOnInit() {
    this.user = this.authService.getUser().then((data) => {  
      this.user = data;
      this.getClinicalPorfileData();
    });
  }

  getClinicalPorfileData() {
    let  data     = [];
    data['token'] = this.user.token;
    
    this.http.getGlucoseLog(data).subscribe((response) => {
      if(response['status'] == 200) { 
        let data = response['data'];
        if(data.length>0) {
          this.glucoseLogList = data.slice().reverse();
        } else {
          this.glucoseLogList = [];
        }
      } 
    },(error) => {
        this.glucoseLogList = [];
        this.toast.errorToast('Failed, Please try again later');
      }
    );
  }

  toggleAccordian(event, index) {
    var element = event.target;
    element.classList.toggle("active");
    if(this.glucoseLogList[index].isActive) {
      this.glucoseLogList[index].isActive = false;
    } else {
      this.glucoseLogList[index].isActive = true;
    }      
    var panel = element.nextElementSibling;
    if (panel.style.maxHeight) {
      panel.style.maxHeight = null;
    } else {
      panel.style.maxHeight = panel.scrollHeight + "px";
    }
  }

  dismissModal() {
    this.modal.dismiss({
      'dismissed': true
    });
  }

}
