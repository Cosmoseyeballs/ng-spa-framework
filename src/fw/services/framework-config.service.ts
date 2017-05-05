import { Injectable } from '@angular/core';

export interface IconFiles{
  imageFile:string,
  alt: string,
  link:string
}
export interface FrameworkConfigSettings{
  showLanguageSelector?: boolean,
  showUserControls?:boolean,
  showStatusBar?:boolean,
  showStatusBarBreakpoint? : number,
  socalIcons?: Array<IconFiles>;
}


@Injectable()
export class FrameworkService {
  showLanguageSelector = true;
  showUserControls = true;
  showStatusBar = true;
  showStatusBarBreakpoint = 0;
  socalIcons = new Array<IconFiles>();
  configure(settings:FrameworkConfigSettings){
    Object.assign(this,settings);
  }

}
