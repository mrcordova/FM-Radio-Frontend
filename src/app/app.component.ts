import { Component, ViewChild, HostListener, AfterViewInit, OnInit, OnDestroy, ElementRef } from '@angular/core';
import {ControlPanelComponent} from './control-panel/control-panel.component';
import { DisplayPanelComponent } from './display-panel/display-panel.component';
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})


// Design and implement a web-based FM radio frontend:

// To be operated by an untrained user.

// Runs on desktop and mobile devices.

// Use any CSS and/or Javascript framework of your choice.

// Minimum requirements:

// The user interface composes of at least 2 draggable panels:

// Display Panel

// Display the current FM channel frequency

// Control Panel

// A rotary knob to control the volume: 0 to 10, step size = 1

// A slider to control the channel frequency: 87.9 MHz to 107.9 MHz, step size = 200 kHz

// Buttons to save/restore 6 channel frequencies

// Dragging one panel over the other swaps their positions.
export class AppComponent implements OnInit, AfterViewInit, OnDestroy {

  @ViewChild("controlPanel") public controlPanel: ControlPanelComponent | undefined;
  @ViewChild("displayPanel") public displayPanel: DisplayPanelComponent | undefined;
  public displayPosition: { left: number , top: number} | undefined;
  public controlPosition: { left: number , top: number} | undefined;
  public stopListening: any;
  title = 'FM-Radio';


  ngOnInit(){
   
    
  }

  ngAfterViewInit() {
    this.setPos();
    
   
    this.controlPanel!.slider!.nativeElement.oninput = ( ) => {
      this.displayPanel!.currentFreq!.nativeElement.textContent =  `${this.controlPanel?.slider?.nativeElement.value} MHz`;
    }
  
  }
ngOnDestroy(){
  this.stopListening();
}
  

 @HostListener('touchstart', ['$event'])
 onTouchClick(event: TouchEvent){
  const topPanel = 1000;
  const bottomPanel = 0;
  
  this.setPos();
  
  if(this.displayPanel?.box?.nativeElement.contains(event.target)){
    this.displayPanel?.updateZindex(topPanel);
    this.controlPanel?.updateZindex(bottomPanel);
    
  } else if (this.controlPanel?.box?.nativeElement.contains(event.target)){
    this.displayPanel?.updateZindex(bottomPanel);
    this.controlPanel?.updateZindex(topPanel);
  }
 }
  @HostListener('mousedown', ['$event'])
  onMouseClick(event : MouseEvent){
    const topPanel = 1000;
    const bottomPanel = 0;
    
    this.setPos();
    
    if(this.displayPanel?.box?.nativeElement.contains(event.target)){
      this.displayPanel?.updateZindex(topPanel);
      this.controlPanel?.updateZindex(bottomPanel);
      
    } else if (this.controlPanel?.box?.nativeElement.contains(event.target)){
      this.displayPanel?.updateZindex(bottomPanel);
      this.controlPanel?.updateZindex(topPanel);
    }
  }


  @HostListener('touchend', ['$event'])
  onTouchMove(){
    const displayBox = this.displayPanel?.box!.nativeElement.getBoundingClientRect();
    const controlBox = this.controlPanel?.box!.nativeElement.getBoundingClientRect();
  

    if(displayBox.top + displayBox.height > controlBox.top
      && displayBox.left + displayBox.width > controlBox.left
      && displayBox.bottom - displayBox.height < controlBox.bottom
      && displayBox.right - displayBox.width < controlBox.right) {
       
        this.swapPos();
        
      } 
  }
  @HostListener('mouseup', ['$event'])
  onMouseMove(event: MouseEvent){
  
   

      const displayBox = this.displayPanel?.box!.nativeElement.getBoundingClientRect();
      const controlBox = this.controlPanel?.box!.nativeElement.getBoundingClientRect();
    
  
      if(displayBox.top + displayBox.height > controlBox.top
        && displayBox.left + displayBox.width > controlBox.left
        && displayBox.bottom - displayBox.height < controlBox.bottom
        && displayBox.right - displayBox.width < controlBox.right) {
         
          this.swapPos();
          
        } 
  
  }

  swapPos() {
    this.displayPanel?.setBoxPos({left: this.controlPosition?.left!, top: this.controlPosition?.top!})
    this.controlPanel?.setBoxPos({left: this.displayPosition?.left!, top: this.displayPosition?.top!})
  }

  setPos(){
    const displayBox = this.displayPanel?.box!.nativeElement.getBoundingClientRect();
    const controlBox = this.controlPanel?.box!.nativeElement.getBoundingClientRect();

    this.displayPosition = {left: displayBox.left, top: displayBox.top}
    this.controlPosition = {left: controlBox.left, top: controlBox.top}

 
  }
 

}
