import { environment } from "../../../environments/environment.development";
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
        {
          icon: 'assets/icons/heroicons/outline/convert-card-svgrepo-com.svg',
          label: 'Data Converter',
          route: '/converter',
          children: [
            { 
              label: 'JSON <-> XML',
              route: '/data-conversion/json-xml',
              title: 'JSON ↔ XML Converter',
              description: 'Convert between JSON and XML formats with ease'
            },
            { 
              label: 'CSV <-> JSON',
              route: '/data-conversion/csv-json',
              title: 'CSV ↔ JSON Converter',
              description: 'Convert between CSV and JSON formats with custom delimiter support'
            },
            
          ],
        },
        {
          icon: 'assets/icons/heroicons/outline/convert-svgrepo-com.svg',
          label: 'Auth',
          route: '/auth',
          children: [
            { label: 'Sign up', route: '/auth/sign-up' },
            { label: 'Sign in', route: '/auth/sign-in' },
            { label: 'Forgot Password', route: '/auth/forgot-password' },
            { label: 'New Password', route: '/auth/new-password' },
            { label: 'Two Steps', route: '/auth/two-steps' },
          ],
        },
        {
          icon: 'assets/icons/heroicons/outline/lock-closed.svg',
          label: 'Auth',
          route: '/auth',
          children: [
            { label: 'Sign up', route: '/auth/sign-up' },
            { label: 'Sign in', route: '/auth/sign-in' },
            { label: 'Forgot Password', route: '/auth/forgot-password' },
            { label: 'New Password', route: '/auth/new-password' },
            { label: 'Two Steps', route: '/auth/two-steps' },
          ],
        },
        {
          icon: 'assets/icons/heroicons/outline/exclamation-triangle.svg',
          label: 'Errors',
          route: '/errors',
          children: [
            { label: '404', route: '/errors/404' },
            { label: '500', route: '/errors/500' },
          ],
        },
        {
          icon: 'assets/icons/heroicons/outline/cube.svg',
          label: 'Components',
          route: '/components',
          children: [{ label: 'Table', route: '/components/table' }],
        },
      ],
    },
    {
      group: 'Collaboration',
      separator: true,
      items: [
        {
          icon: 'assets/icons/heroicons/outline/download.svg',
          label: 'Download',
          route: '/download',
        },
        {
          icon: 'assets/icons/heroicons/outline/gift.svg',
          label: 'Gift Card',
          route: '/gift',
        },
        {
          icon: 'assets/icons/heroicons/outline/users.svg',
          label: 'Users',
          route: '/users',
        },
      ],
    },
    {
      group: 'Config',
      separator: false,
      items: [
        {
          icon: 'assets/icons/heroicons/outline/cog.svg',
          label: 'Settings',
          route: '/settings',
        },
        {
          icon: 'assets/icons/heroicons/outline/bell.svg',
          label: 'Notifications',
          route: '/gift',
        },
        {
          icon: 'assets/icons/heroicons/outline/folder.svg',
          label: 'Folders',
          route: '/folders',
          children: [
            { label: 'Current Files', route: '/folders/current-files' },
            { label: 'Downloads', route: '/folders/download' },
            { label: 'Trash', route: '/folders/trash' },
          ],
        },
      ],
    },
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

export const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
export const passwordRegex = '^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#$%^&*])[A-Za-z\d!@#$%^&*]{8,}$';
export const tablePageSizes = [5, 10, 15, 20, 25, 30]
export const googleClientId = environment.googleClientId;
export const googleScopeId = environment.scopeId;
export const metaClientId = environment.metaClientId;
export const metaAppId = environment.metaAppId;
export const contactEmail = environment.contactEmail;
export const contactPhone = environment.contactPhone;
