import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';

import * as _ from 'lodash'

@Injectable()
export class CursorService {

    public selectedCursor = new Subject<number>();
    private cursors = [
        { img: '../assets/clip-art/None.png', index: 1 },
        { img: '../assets/cursors/cursor_green.png', storeImg: '../assets/cursors/cursor_green_store.png', index: 2 },
        { img: '../assets/cursors/cursor_red.png', storeImg: '../assets/cursors/cursor_red_store.png', index: 3 },
        { img: '../assets/cursors/cursor_yellow.png', storeImg: '../assets/cursors/cursor_yellow_store.png', index: 4 },
        { img: '../assets/cursors/cursor_blue.png', storeImg: '../assets/cursors/cursor_blue_store.png', index: 5 }
    ];

  getCursors() {
    return this.cursors;
  }

  getCursorByIndex(index: number) {
    return _.find(this.cursors, { index: index }).img;
  }
}
