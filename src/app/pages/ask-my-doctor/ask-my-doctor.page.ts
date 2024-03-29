import { Component, OnInit, ViewChild } from '@angular/core';
import { StatusBar } from '@ionic-native/status-bar/ngx';
import { IonContent, Platform } from '@ionic/angular';
import { ToastService } from 'src/app/providers/toast.service';
import { AuthenticationService } from 'src/app/services/authentication.service';
import { HttpService } from 'src/app/services/http.service';
import * as moment from 'moment';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-ask-my-doctor',
  templateUrl: './ask-my-doctor.page.html',
  styleUrls: ['./ask-my-doctor.page.scss'],
})
export class AskMyDoctorPage implements OnInit {

  @ViewChild(IonContent, { static: false }) content: IonContent;

  showProgress   = false;
  newMsg         = '';
  scrollToBottom = false;
  scrollShow     = false;
  interval;
  user;
  params;
  currentUser = {
    senderId  : '',
    receiverId: '',
    chatPerson: '',
  };

  messages = [];

  constructor(
    private authService   : AuthenticationService,
    private activatedRoute: ActivatedRoute,
    private http          : HttpService,
    private toast         : ToastService,
    private platform      : Platform,
    private statusBar     : StatusBar
  ) {
    this.platform.ready().then(() => {
      this.statusBar.overlaysWebView(false);
      this.statusBar.backgroundColorByHexString('#6ab2fc');
      this.statusBar.styleLightContent();
    });
    this.activatedRoute.queryParams.subscribe((beneficiary)=>{
      this.params = beneficiary;
    });
  }

  ngOnInit() {
    this.user = this.authService.getUser().then((data) => {  
      this.user = data; 
    });
    this.scrollToBottom = true;
  }

  ionViewDidEnter() {
    this.currentUser = {
      senderId  : this.user.userType == 'doctor'?this.user.doctorId:this.user.beneficiaryId,
      receiverId: this.user.userType == 'doctor'?this.params.beneficiary_id:this.user.doctorId,
      chatPerson: this.user.userType == 'doctor'?this.params.beneficiary_name: `Dr.${this.user.doctorAssigned}`,
    }
    this.interval = setInterval(() => {
      this.getMessages();
    }, 1000);
  }

  ionViewWillLeave() {
    try {
      clearInterval(this.interval);
    } catch(error) {}
  }

  getMessages() {
    this.showProgress = true;

    let  data           = [];
    data['token']       = this.user.token;
    data['sender_id']   = this.currentUser.senderId;
    data['receiver_id'] = this.currentUser.receiverId;

    this.http.getMessages(data).subscribe((response) => {
      if(response['status'] == 200) {         
        this.messages = response['data']; 
        if(this.scrollToBottom) {
          setTimeout(() => {
            this.content.scrollToBottom(200);
            this.scrollToBottom = false;
          },500);
        }
      }
    },async (error) => {}
    );   
    this.showProgress = false;
  }

  sendMessage() {
    let  data                = [];
    data['token']            = this.user.token;
    data['message_datetime'] = new Date().toUTCString();
    data['message']          = this.newMsg;
    data['receiver_id']      = this.currentUser.receiverId;
    data['sender_id']        = this.currentUser.senderId;

    this.http.sendMessage(data).subscribe((response) => {
      if(response['status'] == 200) {  
        this.newMsg = '';
      } else if(response['status'] == 202) {
        this.toast.errorToast(response['message']);
      } else {
        this.toast.errorToast('Failed!, please try again later')
      }
    },async (error) => {  
        this.toast.errorToast('Failed, Please try again later');      
      }
    );
  }

  trackByFn(index, item) {
    return index; // or item.id
  }

  relativeTime(dateTime) {
    return moment.unix(dateTime).format('lll');
  }

  logScrolling($event) {
    const scrollTop = $event.detail.scrollTop;
    const deltaY    = $event.detail.deltaY;
    const startY    = $event.detail.startY;
    console.log(scrollTop,deltaY,startY); 
    if(deltaY < 0)  {
      this.scrollShow = true;
    } else {
      this.scrollShow = false;
    }
  }

  goToBottom() {
    this.content.scrollToBottom(300);
  }

}
