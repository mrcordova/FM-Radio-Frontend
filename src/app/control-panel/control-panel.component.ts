import { Component, OnInit, Input, ViewChild, ElementRef, HostListener, AfterViewInit, ContentChild } from '@angular/core';
@Component({
  selector: 'app-control-panel',
  templateUrl: './control-panel.component.html',
  styleUrls: ['./control-panel.component.css']
})
export class ControlPanelComponent implements OnInit, AfterViewInit{

  @Input('width') public width: number | undefined;
  @Input('height') public height: number | undefined;
  @Input('left') public left: number | undefined;
  @Input('top') public top: number | undefined;
  @ViewChild("box") public box: ElementRef | undefined;
  @ViewChild('slider') slider:ElementRef | undefined;
  @ViewChild('volumeKnob') volumeKnob: ElementRef | undefined;
  @ViewChild('channels') channels: ElementRef | undefined;
  @ViewChild('save') save: ElementRef | undefined;
  @ContentChild('currentFreq') public currentFreq:ElementRef | undefined;


  private boxPosition: { left: number , top: number } | undefined;
  private containerPos: { left: number, top: number, right: number, bottom: number } | undefined;

  private drag: boolean | undefined;
  public mouse: {x: number, y: number} | undefined;
 
  private mouseClick: {x: number, y: number, left: number, top: number} | undefined;

  public zIndex: any;
  public saveModeOn: Boolean = false;
  constructor() { }

  ngOnInit(): void {
  }

  ngAfterViewInit(){
    
    
    let channels = this.channels!.nativeElement.children;
    for(let i = 0; i < channels.length; i++){
      channels[i].addEventListener('click', (event: MouseEvent) => {
        if(this.saveModeOn){
          channels[i].value = this.slider!.nativeElement.value;
          this.saveMode();
          alert(`FM Frequency ${channels[i].value} saved to Channel Preset: ${channels[i].textContent}`);
        } else {
          if (channels[i].value){
            this.slider!.nativeElement.value = channels[i].value;
            this.slider!.nativeElement.oninput();
          } else {
            alert(`Channel ${channels[i].textContent} is not set`)
          }
        }
      })
    }

  
    this.loadBox();
    this.loadContainer();
    this.volumeKnob!.nativeElement.addEventListener("click", this.volumeTune );

    this.volumeKnob!.nativeElement.addEventListener('mousedown', (event: MouseEvent) => {

      this.volumeKnob!.nativeElement.onmousemove = (event: MouseEvent) =>  {
    
        if (event.buttons == 1 || event.buttons == 3){
         
          this.volumeTune(event)
        }
      }
    })
  
    
  }

  volumeTune(event: MouseEvent){
    let element = event.target as HTMLElement;
   
    let eventDoc = (element && element.ownerDocument) || document, doc = eventDoc.documentElement, body = eventDoc.body;

    

	let output = document.getElementById('selection') as HTMLDivElement,
		text = document.getElementById('volumeNumber') as HTMLLabelElement,
		styleafter = document.head.appendChild(document.createElement("style")),
		elpos = element.getBoundingClientRect(),
		cX = elpos.width / 2,
		cY = elpos.height / 2,
		eX = event.pageX- elpos.left,
		eY = event.pageY - elpos.top,
		dX = 0,
		dY = 0,
		angle = Math.atan2(cX - eX, cY - eY) * (180 / Math.PI),
		value = 10;

  
	if (Math.abs(eX - cX) >= Math.abs(eY - cY)) { 
		dX = 150 / 2 + Math.sign(eX - cX) * 150 / 2;
		dY = 150 / 2 + (eY - cY) / Math.abs(eX - cX) * 150 / 2;
	} else {
		dX = 150 / 2 + (eX - cX) / Math.abs(eY - cY) * 150 / 2;
		dY = 150 / 2 + Math.sign(eY - cY) * 150 / 2;
	}
	dX = Math.round(dX / 150 * 100)
	dY = Math.round(dY / 150 * 100)

 
	if (0 <= dX && dX < 50 && dY == 0) {
		(output as any).style = "clip-path: polygon(" + dX + "% " + dY + "%, 50% 0%, 50% 50%);";
		value = Math.round((5 - (dX *.1)) / 5 * 1.25);
	} else if (dX == 0 && 0 <= dY && dY <= 100) {
		(output as any).style = "clip-path: polygon(" + dX + "% " + dY + "%, 0% 0%, 50% 0%, 50% 50%);";
		value = Math.round(1.25 + (dY * .1) / 10 * 2.5);
	} else if (0 <= dX && dX <= 100 && dY == 100) {
		(output as any).style = "clip-path: polygon(" + dX + "% " + dY + "%, 0% 100%, 0% 0%, 50% 0%, 50% 50%);";
		value = Math.round(3.75 + (dX * .1) / 10 * 2.5);
	} else if (dX == 100 && 0 <= dY && dY <= 100) {
		(output as any).style = "clip-path: polygon(" + dX + "% " + dY + "%, 100% 100%, 0% 100%, 0% 0%, 50% 0%, 50% 50%);";
		value = Math.round(6.25 + (10 - (dY * .1)) / 10 * 2.5);
	} else if (50 <= dX && dX <= 100 && dY == 0) {
		(output as any).style = "clip-path: polygon(" + dX + "% " + dY + "%, 100% 0%, 100% 100%, 0% 100%, 0% 0%, 50% 0%, 50% 50%);";
		value = Math.round(8.75 + (10 - (dX * .1)) / 5 * 1.25);
	}
  
	styleafter.innerHTML = ".round-slider .selection:after {transform: rotate(" + -angle + "deg);}";
	let hue = Math.floor((value * 10) / 100 * 120),
		saturation = Math.abs((value * 10) - 50);
	text.textContent = `${value}`;
  (text as any).style = "color: hsl(" + hue + ", 100%, " + saturation + "%);";



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
 
    let slider = document.getElementById('myRange');
    let volumeKnob = document.getElementById('volumeKnob');

  
    if(!(slider === event.target) && !(volumeKnob === event.target)){
      this.drag = true;
      this.mouseClick = { 
        x: event.clientX, 
        y: event.clientY, 
        left: this.left!, 
        top: this.top!
     };
    }
   

  }

  updateZindex(zIndex: number){
    this.zIndex = zIndex;
  }

  getBoxPos(){
    return this.boxPosition
  }

  setBoxPos(boxPos : { left: number , top: number} | undefined){
    this.left = boxPos?.left
    this.top = boxPos?.top;
    this.drag = false;
  }
  saveMode() {
    
    if( !this.saveModeOn){
      this.saveModeOn = true

    } else {
      this.saveModeOn = false;
    }
    this.updateSaveBtn();
  }
  updateSaveBtn(){
    this.save!.nativeElement.textContent = this.saveModeOn ? "Exit" : "Set Channel";
    document.getElementById('channelsTitle')!.textContent = this.saveModeOn ? 'Save Channel Mode' : 'Preset Channels';
    
    let channels = this.channels!.nativeElement.children;
    
    let replace = this.saveModeOn ? 'notSaveModeButton': 'saveModeButton';
    for(let i = 0; i < channels.length; i++){
      let mode = this.saveModeOn && !(channels[i].value) ? 'saveModeButton' : 'notSaveModeButton';
     
     channels[i].classList.remove(replace);
     channels[i].classList.add(mode);
  
    }
  }

}
