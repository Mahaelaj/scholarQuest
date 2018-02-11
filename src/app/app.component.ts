import { Component, Renderer } from '@angular/core';
import { CursorService } from './cursor/cursor.service';
import { CursorFollowerService } from './cursor-follower/cursor-follower.service';
import { ApiService } from './shared/utils/api.service';
import { CoinsService } from './shared/utils/coins.service';

@Component({
    selector: 'sq-app',
    templateUrl: './app.component.html',
    styleUrls: ['./app.component.css']
})
export class AppComponent  {
    public xPos = 0;
    public yPos = 0;
    public cursorFollower = '0';
    public test = false;

    constructor(public cursorService: CursorService, public apiService: ApiService, public coinsService: CoinsService, public cursorFollowerService: CursorFollowerService, public renderer: Renderer) {
        
        this.cursorService.selectedCursor.subscribe(cursorIndex => {
            this.setCursor(cursorIndex);
        });
        
        this.apiService.post('getStudent', {}).subscribe(
        student => {
            if (student.status != 'Success') return;
            this.cursorFollowerService.selectedCursorFollower.next(student.cursorFollowerId);
            this.setCursor(student.cursorId);
            this.coinsService.coins.next(student.coins);
        });
    }

    mouseMove(event) {
        let xOffset = Math.max(document.documentElement.scrollLeft, document.body.scrollLeft);
        let yOffset = Math.max(document.documentElement.scrollTop, document.body.scrollTop);
        this.xPos = event.clientX + xOffset;
        this.yPos = event.clientY + yOffset;
    }

    /**
     * renderer cannot be used in a service, which is why this function is in this 
     */ 
    setCursor(cursorIndex: number) {
        if (cursorIndex == 1) this.renderer.setElementStyle(document.body, 'cursor', null);
        else this.renderer.setElementStyle(document.body, 'cursor', `url(${this.cursorService.getCursorByIndex(cursorIndex)}), pointer`);
    }
}