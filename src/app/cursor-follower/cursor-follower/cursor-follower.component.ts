import { Component, OnInit, ViewChild, ViewContainerRef, ComponentFactoryResolver, AfterViewInit, HostListener, ElementRef, Input, OnChanges,  OnDestroy, trigger, style, state, transition, animate} from '@angular/core';
import { Subscription } from 'rxjs/Subscription';
import { CursorFollowerService } from '../cursor-follower.service';

@Component({
  selector: 'sq-cursor-follower',
  templateUrl: './cursor-follower.component.html',
  styleUrls: ['./cursor-follower.component.css'],
    animations: [
      trigger('show', [
          state('invisible', style({ 'opacity': 0 })),
          state('visible', style({ 'opacity': 1 })),
          transition('invisible => visible', animate(2000)),
          transition('visible => invisible', animate(1000))])
      ]
})
export class CursorFollowerListComponent implements AfterViewInit{
    @ViewChild('cursorFollower', { read: ViewContainerRef }) cursorFollower;
    private componentRef;
    private cursorFollowers;
    private cursorFollowerIndex = 1;
    @Input() xPos;
    @Input() yPos;
    private cursorFollowerReady = false;
    private studentServiceIndex;
    displayedCursorFollower: any;
    show = 'invisible';
    
    constructor(private viewContainerRef: ViewContainerRef, private componentFactoryResolver: ComponentFactoryResolver, private cursorFollowerService: CursorFollowerService, private elementRef: ElementRef) {}

    ngAfterViewInit(){
        this.cursorFollowerService.selectedCursorFollower.subscribe((value) => {
            if (value != 1) { 
                this.show = 'visible';
            }
            else {
                this.show = 'invisible';
            }
        })
    }
}
