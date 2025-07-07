import { CdkObserveContent } from '@angular/cdk/observers';
import { HttpClient } from '@angular/common/http';
import {
  AfterViewInit,
  ChangeDetectionStrategy,
  Component,
  ElementRef,
  Input,
  OnDestroy,
} from '@angular/core';
import { Subscription } from 'rxjs';

@Component({
    selector: 'tw-icon',
    template: `<ng-content></ng-content>`,
    imports: [CdkObserveContent],
    styles: [
        `
      :host {
        display: block;
        width: var(--c-icon-width) !important;
        height: var(--c-icon-height) !important;
        min-width: var(--c-icon-width) !important;
        min-height: var(--c-icon-height) !important;
      }
      :host svg {
        width: var(--c-icon-width) !important;
        height: var(--c-icon-height) !important;
        min-width: var(--c-icon-width) !important;
        min-height: var(--c-icon-height) !important;
      }
    `,
    ],
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class TwIcon implements AfterViewInit, OnDestroy {
  private static _iconRegistry = new Map<string, string>();
  private _retrievalSubscription$?: Subscription;
  private _svgIcon?: string;
  private _size = 20;

  @Input() set size(value: number) {
    this._size = value;
    this._setStyles();
  }
  get size() {
    return this._size;
  }

  @Input() set svgIcon(value: string | undefined) {
    this._svgIcon = value;
    this._setIcon();
  }
  get svgIcon() {
    return this._svgIcon!;
  }

  constructor(
    private readonly _host: ElementRef<HTMLElement>,
    private readonly _httpClient: HttpClient
  ) {}

  ngAfterViewInit(): void {
    const nativeElement = this._host.nativeElement;

    if (!nativeElement) return;

    this._setStyles();

    if (!this.svgIcon) this.svgIcon = nativeElement.innerHTML;

    this._setIcon();
  }

  private _setStyles() {
    const nativeElement = this._host.nativeElement;

    if (!nativeElement) return;

    nativeElement.style.setProperty('--c-icon-width', this.size + 'px');
    nativeElement.style.setProperty('--c-icon-height', this.size + 'px');
  }

  private _setIcon() {
    const iconName = this.svgIcon;

    const nativeElement = this._host.nativeElement;

    if (!nativeElement) return;

    if (!iconName) throw new Error('tw-icon: invalid icon-name ' + iconName);

    const [namespace, name] = iconName.split(':');

    if (!namespace || !name)
      throw new Error(
        'tw-icon: Could not determine icon namespace and name from ' + iconName
      );

    if (!TwIcon._iconRegistry.has(iconName))
      this._retriveIcon(nativeElement, iconName, namespace, name);
    else {
      const icon = TwIcon._iconRegistry.get(iconName)!;
      nativeElement.innerHTML = icon;
    }
  }

  ngOnDestroy(): void {
    this._retrievalSubscription$?.unsubscribe();
  }

  private _retriveIcon(
    elt: Element,
    iconName: string,
    namespace: string,
    name: string
  ) {
    this._retrievalSubscription$ = this._httpClient
      .get<string>(`/assets/icons/${namespace}/${name}.svg`, {
        responseType: 'text' as any,
      })
      .subscribe((v) => {
        TwIcon._iconRegistry.set(iconName, v);
        elt.innerHTML = v;
        const svg = elt.firstElementChild as SVGElement;
        svg.classList.value = '';
        svg.style.cssText = `width: ${this.size}px!important; height: ${this.size}px!important;`;
      });
  }
}
