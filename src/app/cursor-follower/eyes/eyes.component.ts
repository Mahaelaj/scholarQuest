import { Component, ElementRef, ViewChild, Renderer, AfterViewInit, Input, trigger, style, state, transition, animate } from '@angular/core';

@Component({
  selector: 'sq-eyes',
  templateUrl: './eyes.component.html',
  styleUrls: ['./eyes.component.css'],

  animations: [
    trigger('move', [
          state('void', style({ 'opacity': 0 })),
          state('state1', style({ 'opacity': 1 })),
          state('state2', style({ 'opacity': 1 })),
          transition('state1 <=> state2', animate(1)),
          transition('void => state1', animate(1))])
      ]
})
export class EyesComponent implements AfterViewInit{
    private moveState = "state1";
    private eyesCenterX = 0;
    private eyesCenterY = 0;
    @ViewChild('lOEye') leftEye : ElementRef;
    @ViewChild('lIEye') leftEyeball: ElementRef;
    @ViewChild('rOEye') rightEye: ElementRef;
    @ViewChild('rIEye') rightEyeball: ElementRef;
    private xDormant = true;
    private lerpSpeed = 0.05;
    private eyeSize = 30;
    private eyeballSize = 8;
    private eyeballCen = 0;
    @Input() xPos = 900;
    @Input() yPos = 200;

    ngAfterViewInit() {
        //set the size of the outer eye
        this.renderer.setElementStyle(this.leftEye.nativeElement, 'height', this.eyeSize + 'px');
        this.renderer.setElementStyle(this.leftEye.nativeElement, 'width', this.eyeSize + 'px');
        this.renderer.setElementStyle(this.rightEye.nativeElement, 'height', this.eyeSize + 'px');
        this.renderer.setElementStyle(this.rightEye.nativeElement, 'width', this.eyeSize + 'px');

        //set the size of the eyeballs
        this.renderer.setElementStyle(this.leftEyeball.nativeElement, 'height', this.eyeballSize + 'px');
        this.renderer.setElementStyle(this.leftEyeball.nativeElement, 'width', this.eyeballSize + 'px');
        this.renderer.setElementStyle(this.rightEyeball.nativeElement, 'height', this.eyeballSize + 'px');
        this.renderer.setElementStyle(this.rightEyeball.nativeElement, 'width', this.eyeballSize + 'px');

        //begining position of the eyes
        this.renderer.setElementStyle(this.leftEye.nativeElement, 'left',
           this.xPos + 'px');
        this.renderer.setElementStyle(this.leftEye.nativeElement, 'top',
            this.yPos + 400 + 'px');
        this.renderer.setElementStyle(this.rightEye.nativeElement, 'left',
            this.xPos + 'px');
        this.renderer.setElementStyle(this.rightEye.nativeElement, 'top',
            this.yPos + 400 + 'px');

        //begining positions of the eyeblls
        this.eyeballCen = this.eyeSize / 2  -  this.eyeballSize + 1;
        this.renderer.setElementStyle(this.leftEyeball.nativeElement, 'left', this.eyeballCen + 'px');
        this.renderer.setElementStyle(this.leftEyeball.nativeElement, 'top', this.eyeballCen + 'px');
        this.renderer.setElementStyle(this.rightEyeball.nativeElement, 'left', this.eyeballCen + 'px');
        this.renderer.setElementStyle(this.rightEyeball.nativeElement, 'top', this.eyeballCen + 'px');
        
    }

    onDone($event) {
        this.moveEyes();
    }


    constructor(private renderer: Renderer) { }

    moveEyes() {
      
        var leftEyeLeftDist = parseFloat(this.leftEye.nativeElement.style.left);
            
            var leftEyeTopDist = parseFloat(this.leftEye.nativeElement.style.top);
            var leftOffset = - (this.eyeSize + this.eyeSize / 2)

            var topBottom = this.yPos - leftEyeTopDist;
            if (topBottom < 0) {
                topBottom = 50;
            }
            else {
                topBottom = -80;
            }

            var distance = Math.sqrt(Math.pow(this.xPos + leftOffset - leftEyeLeftDist, 2) + Math.pow(this.yPos + topBottom - leftEyeTopDist, 2));
            var xNorm = (this.xPos + leftOffset - leftEyeLeftDist) / distance;
            var yNorm = (this.yPos + topBottom - leftEyeTopDist) / distance;
            var xSpeed = Math.abs(xNorm);
            var ySpeed = Math.abs(yNorm);

            this.renderer.setElementStyle(this.leftEye.nativeElement, 'left', leftEyeLeftDist + (xSpeed * this.lerpSpeed * (this.xPos + leftOffset - leftEyeLeftDist)) + 'px');
            this.renderer.setElementStyle(this.leftEye.nativeElement, 'top', leftEyeTopDist + (ySpeed * this.lerpSpeed * (this.yPos + topBottom - leftEyeTopDist)) + 'px');
            this.renderer.setElementStyle(this.rightEye.nativeElement, 'left',
                parseFloat(this.leftEye.nativeElement.style.left) + 2 * this.eyeSize + 'px');
            this.renderer.setElementStyle(this.rightEye.nativeElement, 'top',
                leftEyeTopDist + (ySpeed * this.lerpSpeed * (this.yPos + topBottom - leftEyeTopDist)) + 'px');

            this.moveEyeballs(leftOffset, leftEyeLeftDist, leftEyeTopDist);
            this.moveState == 'state1' ? this.moveState = 'state2' : this.moveState = 'state1'; 
        }

    moveEyeballs(leftOffset: number, leftEyeLeftDist: number, leftEyeTopDist: number) {
        var eyeballDist = Math.sqrt(Math.pow(this.xPos + leftOffset - leftEyeLeftDist, 2) + Math.pow(this.yPos - leftEyeTopDist, 2));
        var xEBNorm = (this.xPos + leftOffset - leftEyeLeftDist) / eyeballDist;
        var yEBNorm = (this.yPos - leftEyeTopDist) / eyeballDist;

        this.renderer.setElementStyle(this.leftEyeball.nativeElement, 'left', this.eyeballCen + (this.eyeSize / 2 - this.eyeballSize / 2) * xEBNorm + 'px');
        this.renderer.setElementStyle(this.leftEyeball.nativeElement, 'top', this.eyeballCen + (this.eyeSize / 2 - this.eyeballSize / 2) * yEBNorm + 'px');
        this.renderer.setElementStyle(this.rightEyeball.nativeElement, 'left', this.eyeballCen + (this.eyeSize / 2 - this.eyeballSize / 2) * xEBNorm + 'px');
        this.renderer.setElementStyle(this.rightEyeball.nativeElement, 'top', this.eyeballCen + (this.eyeSize / 2 - this.eyeballSize / 2) * yEBNorm + 'px');
    }
}
