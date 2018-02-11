import { Injectable } from '@angular/core';

import * as _ from 'lodash';

@Injectable()
export class AvatarService {

    public faces = [
        { img: '../../../assets/avatars/face/face1.png', index: 1 },
        { img: '../../../assets/avatars/face/face2.png', index: 2 },
        { img: '../../../assets/avatars/face/face3.png', index: 3 },
        { img: '../../../assets/avatars/face/face4.png', index: 4 },
        { img: '../../../assets/avatars/face/face5.png', index: 5 },
        { img: '../../../assets/avatars/face/face6.png', index: 6 }
    ];

    public eyes = [
        { img: '../../../assets/avatars/eyes/eyes1/eyes1-amber.png', index: 1, color: 1, storeImg: '../../../assets/avatars/eyes/store/eyes1_amber_store.png' },
        { img: '../../../assets/avatars/eyes/eyes1/eyes1-blue.png', index: 1, color: 2, storeImg: '../../../assets/avatars/eyes/store/eyes1_blue_store.png' },
        { img: '../../../assets/avatars/eyes/eyes1/eyes1-brown.png', index: 1, color: 3, storeImg: '../../../assets/avatars/eyes/store/eyes1_brown_store.png' },
        { img: '../../../assets/avatars/eyes/eyes1/eyes1-green.png', index: 1, color: 4, storeImg: '../../../assets/avatars/eyes/store/eyes1_green_store.png' },
        { img: '../../../assets/avatars/eyes/eyes1/eyes1-grey.png', index: 1, color: 5, storeImg: '../../../assets/avatars/eyes/store/eyes1_grey_store.png' },
        { img: '../../../assets/avatars/eyes/eyes1/eyes1-hazel.png', index: 1, color: 6, storeImg: '../../../assets/avatars/eyes/store/eyes1_hazel_store.png' },
        { img: '../../../assets/avatars/eyes/eyes2/eyes2-amber.png', index: 2, color: 1, storeImg: '../../../assets/avatars/eyes/store/eyes2_amber_store.png' },
        { img: '../../../assets/avatars/eyes/eyes2/eyes2-blue.png', index: 2, color: 2, storeImg: '../../../assets/avatars/eyes/store/eyes2_blue_store.png' },
        { img: '../../../assets/avatars/eyes/eyes2/eyes2-brown.png', index: 2, color: 3, storeImg: '../../../assets/avatars/eyes/store/eyes2_brown_store.png' },
        { img: '../../../assets/avatars/eyes/eyes2/eyes2-green.png', index: 2, color: 4, storeImg: '../../../assets/avatars/eyes/store/eyes2_green_store.png' },
        { img: '../../../assets/avatars/eyes/eyes2/eyes2-grey.png', index: 2, color: 5, storeImg: '../../../assets/avatars/eyes/store/eyes2_grey_store.png' },
        { img: '../../../assets/avatars/eyes/eyes2/eyes2-hazel.png', index: 2, color: 6, storeImg: '../../../assets/avatars/eyes/store/eyes2_hazel_store.png' },
        { img: '../../../assets/avatars/eyes/eyes3/eyes3-amber.png', index: 3, color: 1, storeImg: '../../../assets/avatars/eyes/store/eyes3_amber_store.png' },
        { img: '../../../assets/avatars/eyes/eyes3/eyes3-blue.png', index: 3, color: 2, storeImg: '../../../assets/avatars/eyes/store/eyes3_blue_store.png' },
        { img: '../../../assets/avatars/eyes/eyes3/eyes3-brown.png', index: 3, color: 3, storeImg: '../../../assets/avatars/eyes/store/eyes3_brown_store.png' },
        { img: '../../../assets/avatars/eyes/eyes3/eyes3-green.png', index: 3, color: 4, storeImg: '../../../assets/avatars/eyes/store/eyes3_green_store.png' },
        { img: '../../../assets/avatars/eyes/eyes3/eyes3-grey.png', index: 3, color: 5, storeImg: '../../../assets/avatars/eyes/store/eyes3_grey_store.png' },
        { img: '../../../assets/avatars/eyes/eyes3/eyes3-hazel.png', index: 3, color: 6, storeImg: '../../../assets/avatars/eyes/store/eyes3_hazel_store.png' },
        { img: '../../../assets/avatars/eyes/eyes4/eyes4-amber.png', index: 4, color: 1, storeImg: '../../../assets/avatars/eyes/store/eyes4_amber_store.png' },
        { img: '../../../assets/avatars/eyes/eyes4/eyes4-blue.png', index: 4, color: 2, storeImg: '../../../assets/avatars/eyes/store/eyes4_blue_store.png' },
        { img: '../../../assets/avatars/eyes/eyes4/eyes4-brown.png', index: 4, color: 3, storeImg: '../../../assets/avatars/eyes/store/eyes4_brown_store.png' },
        { img: '../../../assets/avatars/eyes/eyes4/eyes4-green.png', index: 4, color: 4, storeImg: '../../../assets/avatars/eyes/store/eyes4_green_store.png' },
        { img: '../../../assets/avatars/eyes/eyes4/eyes4-grey.png', index: 4, color: 5, storeImg: '../../../assets/avatars/eyes/store/eyes4_grey_store.png' },
        { img: '../../../assets/avatars/eyes/eyes4/eyes4-hazel.png', index: 4, color: 6, storeImg: '../../../assets/avatars/eyes/store/eyes4_hazel_store.png' },
        { img: '../../../assets/avatars/eyes/eyes5/eyes5-amber.png', index: 5, color: 1, storeImg: '../../../assets/avatars/eyes/store/eyes5_amber_store.png' },
        { img: '../../../assets/avatars/eyes/eyes5/eyes5-blue.png', index: 5, color: 2, storeImg: '../../../assets/avatars/eyes/store/eyes5_blue_store.png' },
        { img: '../../../assets/avatars/eyes/eyes5/eyes5-brown.png', index: 5, color: 3, storeImg: '../../../assets/avatars/eyes/store/eyes5_brown_store.png' },
        { img: '../../../assets/avatars/eyes/eyes5/eyes5-green.png', index: 5, color: 4, storeImg: '../../../assets/avatars/eyes/store/eyes5_green_store.png' },
        { img: '../../../assets/avatars/eyes/eyes5/eyes5-grey.png', index: 5, color: 5, storeImg: '../../../assets/avatars/eyes/store/eyes5_grey_store.png' },
        { img: '../../../assets/avatars/eyes/eyes5/eyes5-hazel.png', index: 5, color: 6, storeImg: '../../../assets/avatars/eyes/store/eyes5_hazel_store.png' },
        { img: '../../../assets/avatars/eyes/eyes6/eyes6.png', index: 6, storeImg: '../../../assets/avatars/eyes/store/eyes6_store.png' }
    ]

    public eyeColors = [
        { img: '../../../assets/avatars/eyes-color/eyes-amber.png', index: 1 },
        { img: '../../../assets/avatars/eyes-color/eyes-blue.png', index: 2 },
        { img: '../../../assets/avatars/eyes-color/eyes-brown.png', index: 3 },
        { img: '../../../assets/avatars/eyes-color/eyes-green.png', index: 4 },
        { img: '../../../assets/avatars/eyes-color/eyes-grey.png', index: 5 },
        { img: '../../../assets/avatars/eyes-color/eyes-hazel.png', index: 6 }
    ]

    public noses = [
        { img: '../../../assets/avatars/nose/nose1.png', index: 1, storeImg: '../../../assets/avatars/nose/store/nose1_store.png' },
        { img: '../../../assets/avatars/nose/nose2.png', index: 2, storeImg: '../../../assets/avatars/nose/store/nose2_store.png' },
        { img: '../../../assets/avatars/nose/nose3.png', index: 3, storeImg: '../../../assets/avatars/nose/store/nose3_store.png' },
        { img: '../../../assets/avatars/nose/nose4.png', index: 4, storeImg: '../../../assets/avatars/nose/store/nose4_store.png' },
        { img: '../../../assets/avatars/nose/nose5.png', index: 5, storeImg: '../../../assets/avatars/nose/store/nose5_store.png' },
        { img: '../../../assets/avatars/nose/nose6.png', index: 6, storeImg: '../../../assets/avatars/nose/store/nose6_store.png' }
    ];

    public mouths = [ 
        { img: '../../../assets/avatars/mouth/mouth1.png', index: 1, storeImg: '../../../assets/avatars/mouth/store/mouth1_store.png' },
        { img: '../../../assets/avatars/mouth/mouth2.png', index: 2, storeImg: '../../../assets/avatars/mouth/store/mouth2_store.png' },
        { img: '../../../assets/avatars/mouth/mouth3.png', index: 3, storeImg: '../../../assets/avatars/mouth/store/mouth3_store.png' },
    ];

    public hair = [
        { img: '../../../assets/avatars/hair/hair1_cl1.png', index: 1, color: 1, storeImg: '../../../assets/avatars/hair/store/hair1_cl1_store.png' },
        { img: '../../../assets/avatars/hair/hair1_cl2.png', index: 1, color: 2, storeImg: '../../../assets/avatars/hair/store/hair1_cl2_store.png' },
        { img: '../../../assets/avatars/hair/hair1_cl3.png', index: 1, color: 3, storeImg: '../../../assets/avatars/hair/store/hair1_cl3_store.png' },
        { img: '../../../assets/avatars/hair/hair1_cl4.png', index: 1, color: 4, storeImg: '../../../assets/avatars/hair/store/hair1_cl4_store.png' },
        { img: '../../../assets/avatars/hair/hair1_cl5.png', index: 1, color: 5, storeImg: '../../../assets/avatars/hair/store/hair1_cl5_store.png' },
        { img: '../../../assets/avatars/hair/hair1_cl6.png', index: 1, color: 6, storeImg: '../../../assets/avatars/hair/store/hair1_cl6_store.png' },
        { img: '../../../assets/avatars/hair/hair2_cl1.png', index: 2, color: 1, storeImg: '../../../assets/avatars/hair/store/hair2_cl1_store.png' },
        { img: '../../../assets/avatars/hair/hair2_cl2.png', index: 2, color: 2, storeImg: '../../../assets/avatars/hair/store/hair2_cl2_store.png' },
        { img: '../../../assets/avatars/hair/hair2_cl3.png', index: 2, color: 3, storeImg: '../../../assets/avatars/hair/store/hair2_cl3_store.png' },
        { img: '../../../assets/avatars/hair/hair2_cl4.png', index: 2, color: 4, storeImg: '../../../assets/avatars/hair/store/hair2_cl4_store.png' },
        { img: '../../../assets/avatars/hair/hair2_cl5.png', index: 2, color: 5, storeImg: '../../../assets/avatars/hair/store/hair2_cl5_store.png' },
        { img: '../../../assets/avatars/hair/hair2_cl6.png', index: 2, color: 6, storeImg: '../../../assets/avatars/hair/store/hair2_cl6_store.png' },
        { img: '../../../assets/avatars/hair/hair3_cl1.png', index: 3, color: 1, storeImg: '../../../assets/avatars/hair/store/hair3_cl1_store.png' },
        { img: '../../../assets/avatars/hair/hair3_cl2.png', index: 3, color: 2, storeImg: '../../../assets/avatars/hair/store/hair3_cl2_store.png' },
        { img: '../../../assets/avatars/hair/hair3_cl3.png', index: 3, color: 3, storeImg: '../../../assets/avatars/hair/store/hair3_cl3_store.png' },
        { img: '../../../assets/avatars/hair/hair3_cl4.png', index: 3, color: 4, storeImg: '../../../assets/avatars/hair/store/hair3_cl4_store.png' },
        { img: '../../../assets/avatars/hair/hair3_cl5.png', index: 3, color: 5, storeImg: '../../../assets/avatars/hair/store/hair3_cl5_store.png' },
        { img: '../../../assets/avatars/hair/hair3_cl6.png', index: 3, color: 6, storeImg: '../../../assets/avatars/hair/store/hair3_cl6_store.png' }
    ];

    public hairColors = [
        { img: '../../../assets/avatars/hair/hair-cl/hair_cl1.jpg', index: 1 },
        { img: '../../../assets/avatars/hair/hair-cl/hair_cl2.jpg', index: 2 },
        { img: '../../../assets/avatars/hair/hair-cl/hair_cl3.jpg', index: 3 },
        { img: '../../../assets/avatars/hair/hair-cl/hair_cl4.jpg', index: 4 },
        { img: '../../../assets/avatars/hair/hair-cl/hair_cl5.jpg', index: 5 },
        { img: '../../../assets/avatars/hair/hair-cl/hair_cl6.jpg', index: 6 }
    ]

    public necks = [
        { img: '../../../assets/avatars/neck/neck-cl1.png', index: 1 },
        { img: '../../../assets/avatars/neck/neck-cl2.png', index: 2 },
        { img: '../../../assets/avatars/neck/neck-cl3.png', index: 3 },
        { img: '../../../assets/avatars/neck/neck-cl4.png', index: 4 },
        { img: '../../../assets/avatars/neck/neck-cl5.png', index: 5 },
        { img: '../../../assets/avatars/neck/neck-cl6.png', index: 6 }
    ];

    public shirts = [
        { img: '../../../assets/avatars/shirts/shirt_yellow.png', index: 1, storeImg: '../../../assets/avatars/shirts/store/shirt_yellow_store.png' },
        { img: '../../../assets/avatars/shirts/shirt_red.png', index: 2, storeImg: '../../../assets/avatars/shirts/store/shirt_red_store.png' },
        { img: '../../../assets/avatars/shirts/shirt_blue.png', index: 3, storeImg: '../../../assets/avatars/shirts/store/shirt_blue_store.png' }
    ];

    public arms = [
        { img: '../../../assets/avatars/arms/arms_cl1.png', index: 1 },
        { img: '../../../assets/avatars/arms/arms_cl2.png', index: 2 },
        { img: '../../../assets/avatars/arms/arms_cl3.png', index: 3 },
        { img: '../../../assets/avatars/arms/arms_cl4.png', index: 4 },
        { img: '../../../assets/avatars/arms/arms_cl5.png', index: 5 },
        { img: '../../../assets/avatars/arms/arms_cl6.png', index: 6 }
    ];

    public pants = [
        { img: '../../../assets/avatars/pants/pants_blue.png', index: 1 },
        { img: '../../../assets/avatars/pants/pants_dark_blue.png', index: 2 },
        { img: '../../../assets/avatars/pants/pants_brown.png', index: 3 }
    ];
    
    public shoes = [
        { img: '../../../assets/avatars/shoes/shoes_grey.png', index: 1, storeImg: '../../../assets/avatars/shoes/store/shoes_grey_store.png' },
        { img: '../../../assets/avatars/shoes/shoes_white.png', index: 2, storeImg: '../../../assets/avatars/shoes/store/shoes_white_store.png' },
        { img: '../../../assets/avatars/shoes/shoes_blue.png', index: 3, storeImg: '../../../assets/avatars/shoes/store/shoes_blue_store.png' }
     ];

    getEyesByColor(index: number) {
        return _.filter(this.eyes, { color: index })
    }

    getHairByColor(color){
        return _.filter(this.hair, { color: color });
    }

    getShirts(){
        return this.shirts;
    }

    getPants(){
        return this.pants;
    }

    getFaceByIndex(index: number) {
        return _.find(this.faces, { index: index }).img;
    }

    getEyesByIndex(eyes: any) {
       return _.find(this.eyes, { index: eyes.normIndex, color: eyes.miniIndex }).img;
    }
    
    getNoseByIndex(index: number) {
        return _.find(this.noses, { index: index }).img;
    }

    getMouthByIndex(index: number) {
        return _.find(this.mouths, { index: index }).img;
    }

    getHairByIndex(hair: any) {
        return _.find(this.hair, { index: hair.normIndex, color: hair.miniIndex }).img;
    }

    getNeckByIndex(index: number) {
        return _.find(this.necks, { index: index }).img;
    }

    getShirtByIndex(index: number) {
        return _.find(this.shirts, { index: index }).img;
    }

    getArmsByIndex(index: number) {
        return _.find(this.arms, { index: index }).img;
    }

    getPantsByIndex(index: number) {
        return _.find(this.pants, { index: index }).img;
    }

    getShoesByIndex(index: number) {
        return _.find(this.shoes, { index: index }).img;
    }
}
