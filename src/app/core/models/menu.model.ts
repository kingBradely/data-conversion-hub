export interface MenuItem {
    group: string;
    separator?: boolean;
    selected?: boolean;
    active?: boolean;
    items: Array<SubMenuItem>;
    title?: string;
    description? : string;
  }
  
  export interface SubMenuItem {
    icon?: string;
    label?: string;
    route?: string | null;
    expanded?: boolean;
    active?: boolean;
    children?: Array<SubMenuItem>;
    title?: string;
    description? : string;
  }
  