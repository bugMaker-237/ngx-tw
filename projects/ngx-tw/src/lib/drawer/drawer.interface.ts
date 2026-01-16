export interface DrawerMenuItem {
  label: string;
  icon?: string; // Raw SVG or icon name
  route?: string | string[];
  children?: DrawerMenuItem[];
  active?: boolean;
  expanded?: boolean;
}

export interface DrawerMenuSection {
  title?: string; // Optional header like "Settings"
  items: DrawerMenuItem[];
}
