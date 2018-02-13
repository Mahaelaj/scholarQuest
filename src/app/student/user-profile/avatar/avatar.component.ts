import { Component, Output, EventEmitter, Input, AfterViewInit } from '@angular/core';

import { AvatarService } from '../avatar-service/avatar.service';

import { ApiService } from '../../../shared/utils/api.service';

@Component({
    selector: 'sq-avatar',
    templateUrl: './avatar.component.html',
    styleUrls: ['./avatar.component.css']
    })
        
export class AvatarComponent implements AfterViewInit{

    public hairImg: string = '';
    public faceImg: string = '';
    public eyesImg: string = '';
    public noseImg: string = '';
    public mouthImg: string = '';
    public neckImg: string = '';
    public shirtImg: string = '';
    public armsImg: string = '';
    public pantsImg: string = '';
    public shoesImg: string = '';
    public hairShapeId: number;

    public avatar = {};

    // when a menu is selected, tell the parent component so that it can update the menu displayed
    @Output() menuClicked = new EventEmitter<string>();

    @Output() avatarDataRetrieved = new EventEmitter<any>();

    constructor(public avatarService: AvatarService, public apiService: ApiService) {}

    ngAfterViewInit(){

        this.apiService.post('getAvatar',{})
            .subscribe(
            avatar => {
                if (!avatar.avatar) {
                    this.setDummyVariables();
                    return;
                }
                this.avatar = avatar.avatar;
                this.avatarDataRetrieved.emit(avatar.avatar);
                this.hairImg = this.avatarService.getHairByIndex({ normIndex: avatar.avatar.hairShapeId, miniIndex: avatar.avatar.hairColorId });
                this.faceImg = this.avatarService.getFaceByIndex(avatar.avatar.skinId);
                this.eyesImg = this.avatarService.getEyesByIndex({ normIndex: avatar.avatar.eyesShapeId, miniIndex: avatar.avatar.eyesColorId });
                this.noseImg = this.avatarService.getNoseByIndex(avatar.avatar.noseId);
                this.mouthImg = this.avatarService.getMouthByIndex(avatar.avatar.mouthId);
                this.neckImg = this.avatarService.getNeckByIndex(avatar.avatar.skinId);
                this.shirtImg = this.avatarService.getShirtByIndex(avatar.avatar.shirtId);
                this.armsImg = this.avatarService.getArmsByIndex(avatar.avatar.skinId); 
                this.pantsImg = this.avatarService.getPantsByIndex(avatar.avatar.pantsId);
                this.shoesImg = this.avatarService.getShoesByIndex(avatar.avatar.shoesId);
            },
            error => {
                this.setDummyVariables();
            }
        )
    }

    setDummyVariables() {
        this.avatar = {
            hairColorId: 3,
            hairShapeId: 3,
            skinId: 3,
            noseId: 3,
            eyesShapeId: 3,
            eyesColorId: 3,
            shoesId: 3,
            mouthId: 3,
            shirtId: 3,
            pantsId: 3
        }
        this.hairShapeId = 3;
        this.hairImg = this.avatarService.getHairByIndex({ normIndex: 3, miniIndex: 3 });
        this.faceImg = this.avatarService.getFaceByIndex(3);
        this.eyesImg = this.avatarService.getEyesByIndex({ normIndex: 3, miniIndex: 3 });
        this.noseImg = this.avatarService.getNoseByIndex(3);
        this.mouthImg = this.avatarService.getMouthByIndex(3);
        this.neckImg = this.avatarService.getNeckByIndex(3);
        this.shirtImg = this.avatarService.getShirtByIndex(3);
        this.armsImg = this.avatarService.getArmsByIndex(3); 
        this.pantsImg = this.avatarService.getPantsByIndex(3);
        this.shoesImg = this.avatarService.getShoesByIndex(3);

        this.avatarDataRetrieved.emit(this.avatar);
    }
}
