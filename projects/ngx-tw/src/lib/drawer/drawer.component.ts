import { Overlay, OverlayModule, OverlayRef } from '@angular/cdk/overlay';
import { TemplatePortal } from '@angular/cdk/portal';
import { NgTemplateOutlet } from '@angular/common';
import {
  Component,
  HostListener,
  Input,
  OnDestroy,
  TemplateRef,
  ViewChild,
  ViewContainerRef,
} from '@angular/core';
import { RouterModule } from '@angular/router';
import { TwIcon } from '../icon/icon.component';
import { DrawerMenuItem, DrawerMenuSection } from './drawer.interface';

@Component({
  selector: 'tw-drawer',
  standalone: true,
  imports: [NgTemplateOutlet, RouterModule, OverlayModule, TwIcon],
  templateUrl: './drawer.component.html',
  styleUrls: ['./drawer.component.scss'],
  host: { class: 'block h-full' },
})
export class TwDrawer implements OnDestroy {
  @Input() sections: DrawerMenuSection[] = [];
  @Input() title: string = '';

  @ViewChild('sidebarContent') sidebarTemplate!: TemplateRef<any>;

  isMobileMenuOpen = false;
  isCollapsed = false;
  isManuallyToggled = false;
  isMobile = false;

  private overlayRef?: OverlayRef;

  constructor(
    private overlay: Overlay,
    private viewContainerRef: ViewContainerRef,
  ) {
    this.checkScreenSize();
  }

  ngOnDestroy(): void {
    this.disposeOverlay();
  }

  @HostListener('window:resize')
  onResize() {
    this.checkScreenSize();
  }

  checkScreenSize() {
    const w = window.innerWidth;
    const wasMobile = this.isMobile;
    this.isMobile = w < 768;

    if (this.isMobile !== wasMobile) {
      // Screen mode changed
      if (this.isMobile) {
        // Switched to mobile
        // Close overlay if it was open (or handle state)
        this.isMobileMenuOpen = false;
        this.disposeOverlay();
        this.isCollapsed = false; // Reset collapse state for mobile
      } else {
        // Switched to desktop
        this.disposeOverlay();
        this.isMobileMenuOpen = false;

        if (!this.isManuallyToggled) {
          // Automatic responsive behavior
          this.isCollapsed = w >= 768 && w < 1024;
        }
      }
    } else {
      // Just resizing within same category
      if (!this.isMobile && !this.isManuallyToggled) {
        this.isCollapsed = w >= 768 && w < 1024;
      }
    }
  }

  toggleMobileMenu() {
    this.isMobileMenuOpen = !this.isMobileMenuOpen;

    if (this.isMobile) {
      if (this.isMobileMenuOpen) {
        this.openOverlay();
      } else {
        this.closeOverlay();
      }
    }
  }

  private openOverlay() {
    if (this.overlayRef?.hasAttached()) {
      return;
    }

    const positionStrategy = this.overlay
      .position()
      .global()
      .left('0')
      .top('0')
      .bottom('0');

    // Create overlay with backdrop
    this.overlayRef = this.overlay.create({
      positionStrategy,
      hasBackdrop: true,
      backdropClass: 'cdk-overlay-dark-backdrop',
      scrollStrategy: this.overlay.scrollStrategies.block(),
      height: '100%',
      maxHeight: '100vh',
      panelClass: [], // We can add classes here if needed
    });

    const portal = new TemplatePortal(
      this.sidebarTemplate,
      this.viewContainerRef,
    );
    this.overlayRef.attach(portal);

    // Handle backdrop click
    this.overlayRef.backdropClick().subscribe(() => {
      this.toggleMobileMenu();
    });
  }

  private closeOverlay() {
    if (this.overlayRef) {
      this.overlayRef.detach();
    }
  }

  private disposeOverlay() {
    if (this.overlayRef) {
      this.overlayRef.dispose();
      this.overlayRef = undefined;
    }
  }

  toggleSidebarSize() {
    this.isCollapsed = !this.isCollapsed;
    this.isManuallyToggled = true;

    if (this.isCollapsed) {
      // ... existing code ...
      this.closeAllSubmenus();
    }
  }

  toggleSubmenu(item: DrawerMenuItem) {
    // If sidebar is collapsed, expand it to show submenu
    if (this.isCollapsed) {
      this.toggleSidebarSize();
    }

    const wasExpanded = item.expanded;

    // Accordion behavior: Close all other submenus
    // Note: We might want to only close submenus in the same section or all?
    // Prototype: "Close other submenus" (all).
    this.closeAllSubmenus();

    if (!wasExpanded) {
      item.expanded = true;
    }
  }

  private closeAllSubmenus() {
    this.sections.forEach((section) => {
      section.items.forEach((item) => {
        if (item.children) {
          item.expanded = false;
        }
      });
    });
  }
}
