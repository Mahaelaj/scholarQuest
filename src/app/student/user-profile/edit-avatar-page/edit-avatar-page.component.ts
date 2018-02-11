import { Component, ViewChild, AfterViewInit } from '@angular/core';

import { AvatarService } from '../avatar-service/avatar.service';
import { AvatarComponent } from '../avatar/avatar.component';
import { ButtonGridCardComponent } from '../../../shared/card/button-grid-card/button-grid-card.component';

import { ApiService } from '../../../shared/utils/api.service';

@Component({
  templateUrl: './edit-avatar-page.component.html',
  styleUrls: ['./edit-avatar-page.component.css']
})
export class EditAvatarPageComponent {

  public faceOptions: any;
  public eyesOptions: any;
  public hairOptions: any;
  public hairColors: any;
  public menuDisplayed = 'face';

  @ViewChild('avatar') avatar: AvatarComponent;
  constructor(public avatarService: AvatarService, public apiService: ApiService) {}

  avatarDataRetrieved(avatar) {
    this.hairOptions = this.avatarService.getHairByColor(avatar.hairColorId);
    this.eyesOptions = this.avatarService.getEyesByColor(avatar.eyesColorId);
  }

  updateHairColor(event) {
    this.avatar.hairImg = this.avatarService.getHairByIndex(event);
    this.hairOptions = this.avatarService.getHairByColor(event.miniIndex);
    this.updateDatabase({ hairColorId: event.miniIndex });
  }

  /*
   * change the eyes that are displayed when a new eye color is chosen
   */
  changeEyesList(event){
      this.eyesOptions = this.avatarService.getEyesByColor(event);
  }

 /*
  * change the displayed face when a face is selected
  */
  updateFace(event) {
    this.avatar.faceImg = this.avatarService.getFaceByIndex(event.normIndex);
    this.avatar.neckImg = this.avatarService.getNeckByIndex(event.normIndex);
    this.avatar.armsImg = this.avatarService.getArmsByIndex(event.normIndex);
    this.updateDatabase({'skinId': event.normIndex});
  }

  updateEyesColor(event) {
    this.eyesOptions = this.avatarService.getEyesByColor(event.miniIndex);
    this.avatar.eyesImg = this.avatarService.getEyesByIndex(event);
    this.updateDatabase({'eyesColorId': event.miniIndex});
  }
 
 /*
  * change the displayed eyes when eyes are selected
  */
  updateEyesShape(event){
    this.avatar.eyesImg = this.avatarService.getEyesByIndex(event);
    this.updateDatabase({'eyesShapeId': event.normIndex});
  }

 /*
  * change the displayed nose when a nose is selected
  */
  updateNose(event){
    this.avatar.noseImg = this.avatarService.getNoseByIndex(event.normIndex);
    this.updateDatabase({'noseId': event.normIndex});
  }
 
 /*
  * change the displayed lips when lips are is selected
  */
  updateMouth(event){
    this.avatar.mouthImg = this.avatarService.getMouthByIndex(event.normIndex);
    this.updateDatabase({'mouthId': event.normIndex});
  }

  changeMenu(event){
    this.menuDisplayed = event;
  }

  updateHairShape(event){
    this.avatar.hairImg = this.avatarService.getHairByIndex(event);
    this.updateDatabase({hairShapeId: event.normIndex});
  }

  updatePants(event){
    this.avatar.pantsImg = this.avatarService.getPantsByIndex(event.normIndex);
    this.updateDatabase({'pantsId': event.normIndex});
  }

  updateShirt(event){
    this.avatar.shirtImg = this.avatarService.getShirtByIndex(event.normIndex);
    this.updateDatabase({'shirtId': event.normIndex});
  }

  updateShoes(event){
    this.avatar.shoesImg = this.avatarService.getShoesByIndex(event.normIndex);
    this.updateDatabase({'shoesId': event.normIndex});
  }

  updateDatabase(params: any){
   this.apiService.post('updateAvatar', params)
      .subscribe()
  }
}
