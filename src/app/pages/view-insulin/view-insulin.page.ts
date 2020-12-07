import { Component, OnInit } from '@angular/core';
import { ModalController } from '@ionic/angular';
import { ToastService } from 'src/app/providers/toast.service';
import { AuthenticationService } from 'src/app/services/authentication.service';
import { HttpService } from 'src/app/services/http.service';

@Component({
  selector: 'app-view-insulin',
  templateUrl: './view-insulin.page.html',
  styleUrls: ['./view-insulin.page.scss'],
})
export class ViewInsulinPage implements OnInit {

  public user;
  public insulinLogList;

  constructor(
    private authService: AuthenticationService,
    private toast      : ToastService,
    private http       : HttpService,
    public  modal      : ModalController
  ) { }

  ngOnInit() {
    this.user = this.authService.getUser().then((data) => {  
      this.user = data;
      this.getInsulinLogData();
    });
  }

  getInsulinLogData() {
    let  data     = [];
    data['token'] = this.user.token;
    
    this.http.getInsulinLog(data).subscribe((response) => {
      if(response['status'] == 200) { 
        let data = response['data'];
        if(data.length>0) {
          this.insulinLogList = data.slice().reverse();
        } else {
          this.insulinLogList = [];
        }
      } 
    },(error) => {
        this.insulinLogList = [];
        this.toast.errorToast('Failed, Please try again later');
      }
    );
  }

  toggleAccordian(event, index) {
    var element = event.target;
    element.classList.toggle("active");
    if(this.insulinLogList[index].isActive) {
      this.insulinLogList[index].isActive = false;
    } else {
      this.insulinLogList[index].isActive = true;
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
