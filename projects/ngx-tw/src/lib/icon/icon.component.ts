import { HttpClient } from '@angular/common/http';
import {
  AfterViewInit,
  ChangeDetectionStrategy,
  Component,
  ElementRef,
  Input,
  OnDestroy,
} from '@angular/core';
import { Subscription, finalize, shareReplay, tap } from 'rxjs';

@Component({
  selector: 'tw-icon',
  template: `<ng-content></ng-content>`,
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
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class TwIcon implements AfterViewInit, OnDestroy {
  private static ICON_REGISTRY = new Map<string, string>();
  private static PENDING_ICON_REQUESTS = new Map<
    string,
    ReturnType<typeof TwIcon.prototype._createIconRequest>
  >();
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

    if (TwIcon.ICON_REGISTRY.has(iconName)) {
      const icon = TwIcon.ICON_REGISTRY.get(iconName)!;
      nativeElement.innerHTML = icon;
      return;
    }

    this._retrieveIcon(nativeElement, iconName, namespace, name);
  }

  ngOnDestroy(): void {
    this._retrievalSubscription$?.unsubscribe();
  }

  private _retrieveIcon(
    elt: Element,
    iconName: string,
    namespace: string,
    name: string
  ) {
    const existingRequest = TwIcon.PENDING_ICON_REQUESTS.get(iconName);

    const request$ =
      existingRequest ?? this._createIconRequest(iconName, namespace, name);

    if (!existingRequest) TwIcon.PENDING_ICON_REQUESTS.set(iconName, request$);

    this._retrievalSubscription$ = request$.subscribe((v) => {
      elt.innerHTML = v;
      const svg = elt.firstElementChild as SVGElement;
      svg.classList.value = '';
      svg.style.cssText = `width: ${this.size}px!important; height: ${this.size}px!important;`;
    });
  }

  private _createIconRequest(
    iconName: string,
    namespace: string,
    name: string
  ) {
    return this._httpClient
      .get<string>(`/assets/icons/${namespace}/${name}.svg`, {
        responseType: 'text' as any,
      })
      .pipe(
        tap((v) => TwIcon.ICON_REGISTRY.set(iconName, v)),
        finalize(() => TwIcon.PENDING_ICON_REQUESTS.delete(iconName)),
        shareReplay(1)
      );
  }
}
