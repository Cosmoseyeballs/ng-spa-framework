import { Directive, Input, TemplateRef, ViewContainerRef, OnDestroy } from '@angular/core';
import { ScreenService } from '../services/screen.service';
import { Subscription } from "rxjs/Subscription";


@Directive({ selector: '[screenBelowLarge]' })
export class ScreenBelowLarge implements OnDestroy {
  

    private hasView = false;
        private screenSubscription: Subscription;

    constructor(private viewContainer: ViewContainerRef,
        private template: TemplateRef<Object>,
        private screenService: ScreenService) {
       this.screenSubscription =  screenService.resize$.subscribe(() => this.onResize())
    }
    @Input()
    set screenBelowLarge(condition) {
        condition = this.screenService.screenWidth < this.screenService.lageBreakpoint;

        if (condition && !this.hasView) {
            this.hasView = true;
            this.viewContainer.createEmbeddedView(this.template);
        } else if (!condition && this.hasView) {
            this.hasView = false;
            this.viewContainer.clear();

        }

    }
          ngOnDestroy(): void {
            this.screenSubscription.unsubscribe();
        }

    onResize() {
        this.screenBelowLarge = false;
    }
}