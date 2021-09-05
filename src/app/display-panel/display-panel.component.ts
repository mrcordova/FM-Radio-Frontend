import { Component, OnInit, Input, ViewChild, ElementRef, HostListener, AfterViewInit, ContentChild, HostBinding } from '@angular/core';

@Component({
  selector: 'app-display-panel',
  templateUrl: './display-panel.component.html',
  styleUrls: ['./display-panel.component.css']
})
export class DisplayPanelComponent implements OnInit, AfterViewInit {

  @Input('width') public width: number | undefined;
  @Input('height') public height: number | undefined;
  @Input('left') public left: number | undefined;
  @Input('top') public top: number | undefined;
  @ViewChild("box") public box: ElementRef | undefined;
  @ContentChild('currentFreq') public currentFreq:ElementRef | undefined;
  public zIndex: any;


  private boxPosition: { left: number , top: number} | undefined;
  private containerPos: { left: number, top: number, right: number, bottom: number } | undefined;

  private drag: boolean | undefined;
  public mouse: {x: number, y: number} | undefined;
 
  private mouseClick: {x: number, y: number, left: number, top: number} | undefined;

  constructor() { }

  ngOnInit(): void {
   this.zIndex = "-1";
  }

  ngAfterViewInit(){
  
    this.loadBox();
    this.loadContainer();
  }
  private loadBox(){
    const {left, top} = this.box?.nativeElement.getBoundingClientRect();
    this.boxPosition = {left, top};
  }

  private loadContainer(){

    const left = this.boxPosition?.left! - this.left!;
    const top = this.boxPosition?.top! - this.top!;
    const right = left + 600;
    const bottom = top + 450;
    this.containerPos = { left, top, right, bottom };
  }


  @HostListener('window:mousemove', ['$event'])
  onMouseMove(event: MouseEvent){
    this.mouse = { x: event.clientX, y: event.clientY };
   
    if(this.drag){
      this.left = this.mouseClick?.left! + (this.mouse.x - this.mouseClick?.x!);
      this.top = this.mouseClick?.top! + (this.mouse.y - this.mouseClick?.y!);
    }
    
  }


  onMouseRelease(event: MouseEvent) { 
    this.drag = false;
  }
  onMouseClick(event: MouseEvent){
    
    this.drag = true;
    this.mouseClick = { 
      x: event.clientX, 
      y: event.clientY, 
      left: this.left!, 
      top: this.top!
   };

  }
   updateZindex(zIndex: number){
     this.zIndex = zIndex;
 
   }

   getBoxPos(){
    
     return this.boxPosition
   }

   setBoxPos(boxPos : { left: number , top: number  } | undefined){
    
    this.left = boxPos?.left
    this.top = boxPos?.top;
    this.drag = false;
  }

}
