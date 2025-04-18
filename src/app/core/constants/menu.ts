import { MenuItem, SubMenuItem } from "../models/menu.model";

export class Menu {
  public static pages: MenuItem[] = [
    {
      group: 'Base',
      separator: false,
      items: [
        {
          icon: 'assets/icons/heroicons/outline/chart-pie.svg',
          label: 'Dashboard',
          route: '/dashboard',
          children: [{ label: 'Nfts', route: '/dashboard/nfts' }],
        },
       
      ],
    }
  ];

  public static findByRoute(route: string): SubMenuItem | undefined {
    const searchRecursive = (items: Array<SubMenuItem>): SubMenuItem | undefined => {
      for (const item of items) {
        if (item.route === route) {
          return item;
        }
        if (item.children) {
          const found = searchRecursive(item.children);
          if (found) {
            return found;
          }
        }
      }
      return undefined;
    };

    for (const group of Menu.pages) {
      const result = searchRecursive(group.items);
      if (result) {
        return result;
      }
    }
    return undefined;
  }



}
