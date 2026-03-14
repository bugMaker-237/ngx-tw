import {
  animate,
  AnimationEvent,
  state,
  style,
  transition,
  trigger,
} from '@angular/animations';
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
import { Router, RouterModule } from '@angular/router';
import { TwIcon } from '../icon/icon.component';
import { DrawerMenuItem, DrawerMenuSection } from './drawer.interface';

@Component({
  selector: 'tw-drawer',
  standalone: true,
  imports: [NgTemplateOutlet, RouterModule, OverlayModule, TwIcon],
  templateUrl: './drawer.component.html',
  styleUrls: ['./drawer.component.scss'],
  host: { class: 'block h-full' },
  animations: [
    trigger('drawerAnimation', [
      state('void', style({ transform: 'translateX(-100%)' })),
      state('open', style({ transform: 'translateX(0)' })),
      state('closed', style({ transform: 'translateX(-100%)' })),
      transition('void => open', animate('300ms ease-in-out')),
      transition('open => closed', animate('300ms ease-in-out')),
    ]),
  ],
})
export class TwDrawer implements OnDestroy {
  @Input() sections: DrawerMenuSection[] = [];

  @Input() useAsAppShell = false;
  @ViewChild('sidebarContent') sidebarTemplate!: TemplateRef<any>;

  isMobileMenuOpen = false;
  isCollapsed = false;
  isManuallyToggled = false;
  isMobile = false;
  drawerAnimationState: 'open' | 'closed' = 'closed';

  private overlayRef?: OverlayRef;

  constructor(
    private overlay: Overlay,
    private viewContainerRef: ViewContainerRef,
    private router: Router,
  ) {
    this.checkScreenSize();
  }

  isActive(route: string | any[]): boolean {
    return this.router.isActive(
      Array.isArray(route) ? this.router.createUrlTree(route) : route,
      {
        paths: 'exact',
        matrixParams: 'ignored',
        queryParams: 'ignored',
        fragment: 'ignored',
      },
    );
  }

  isAbsolute(route: string | any[]): boolean {
    const url = Array.isArray(route)
      ? this.router.createUrlTree(route).toString()
      : route;
    return (
      url.startsWith('http://') ||
      url.startsWith('https://') ||
      url.startsWith('//') ||
      url.startsWith('mailto:') ||
      url.startsWith('tel:')
    );
  }

  hasActiveChild(children: DrawerMenuItem[]): boolean {
    const currentUrl = this.router.url;

    return children.some((child) => {
      const targetUrl = Array.isArray(child.route)
        ? this.router.createUrlTree(child.route).toString()
        : child.route;

      const isChildActive = !!targetUrl && currentUrl.startsWith(targetUrl);

      return (
        isChildActive ||
        (child.children ? this.hasActiveChild(child.children) : false)
      );
    });
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
    if (this.isMobile) {
      if (this.isMobileMenuOpen) {
        // Closing: Trigger exit animation
        this.isMobileMenuOpen = false;
        this.drawerAnimationState = 'closed';
      } else {
        // Opening
        this.isMobileMenuOpen = true;
        this.drawerAnimationState = 'open';
        this.openOverlay();
      }
    } else {
      // Should not happen on desktop if hidden logic is correct,
      // but just in case:
      this.isMobileMenuOpen = !this.isMobileMenuOpen;
    }
  }

  onAnimationDone(event: AnimationEvent) {
    if (event.toState === 'closed' && this.isMobile) {
      this.closeOverlay();
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
      backdropClass: 'acrylic-backdrop',
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
