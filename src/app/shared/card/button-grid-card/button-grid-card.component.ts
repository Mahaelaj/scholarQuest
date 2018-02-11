import { Component, Input, Output, EventEmitter, ViewChild, Renderer, ElementRef, AfterViewInit } from '@angular/core';
import { MatGridList } from '@angular/material';
import { ApiService } from '../../utils/api.service';

import * as _ from 'lodash';

@Component({
  selector: 'sq-button-grid-card',
  templateUrl: './button-grid-card.component.html',
  styleUrls: ['./button-grid-card.component.css']
})
export class ButtonGridCardComponent implements AfterViewInit {
  
    @Input('hoverColor') hoverColor: string = 'blue';
    @Input('selectedColor') selectedColor: string = 'green';
    @Input('backgroundColor') backgroundColor: string = 'grey';

    @Input('title') title: string;
    @Input('columns') columns: number = 4;
    @Input('options') options: any[];
    @Input('miniOptions') miniOptions: any[];
    @Input('patchValue') patchValue: string;
    @Input('initApi') initApi: string;
    @Input('selectedNorm') selectedNorm = 1;
    @Input('selectedMini') selectedMini: number;

    @Output() normButtonClicked = new EventEmitter<any>();
    @Output() miniButtonClicked = new EventEmitter<any>();

    @ViewChild('miniList') miniList: any;
    @ViewChild('normList') normList: any;

    public normTiles: any[];
    public miniTiles: any[]

    constructor(public apiService: ApiService, public renderer: Renderer){}

    ngAfterViewInit(){
      this.normTiles = this.normList._element.nativeElement.children[0].children;
      if(this.miniList) this.miniTiles = this.miniList._element.nativeElement.children[0].children;
  }

    /*
     * called when a button is clicked
     */  
    clicked(index: number){
      this.selectedNorm = index;
      let selection: any = { normIndex: this.selectedNorm };
      if (this.selectedMini) selection.miniIndex = this.selectedMini 
      this.normButtonClicked.emit(selection);
    }

    miniClicked(index: number){
      this.selectedMini = index;
       for(var i = 0; i < this.options.length; i++){
        if (this.miniOptions[i].index == index) this.renderer.setElementStyle(this.miniTiles[i], 'background-color', this.selectedColor);
        else this.renderer.setElementStyle(this.miniTiles[i], 'background-color', null);
       }
      this.miniButtonClicked.emit({ miniIndex: index, normIndex: this.selectedNorm });
    }

    onMouseOverTile(index: string){
      for(var i = 0; i < this.options.length; i++){
        if (this.options[i].index == index){
          if(this.normTiles[i].style['background-color'] != this.selectedColor) this.renderer.setElementStyle(this.normTiles[i], 'background-color', this.hoverColor);
        }
      }
    }

    onMouseLeaveTile(index: string){
      for(var i = 0; i < this.options.length; i++){
        if (this.options[i].index == index){
          if(this.normTiles[i].style['background-color'] != this.selectedColor) this.renderer.setElementStyle(this.normTiles[i], 'background-color', null);
        }
      }
    }

    onMouseOverMiniTile(index: string){
      for(var i = 0; i < this.miniOptions.length; i++){
        if (this.miniOptions[i].index == index){
          if(this.miniTiles[i].style['background-color'] != this.selectedColor) this.renderer.setElementStyle(this.miniTiles[i], 'background-color', this.hoverColor);          
       }
      }
    }

    onMouseLeaveMiniTile(index: string){
      for(var i = 0; i < this.miniOptions.length; i++){
        if (this.miniOptions[i].index == index){
          if(this.miniTiles[i].style['background-color'] != this.selectedColor) this.renderer.setElementStyle(this.miniTiles[i], 'background-color', null);
        }
      }
    }
}
