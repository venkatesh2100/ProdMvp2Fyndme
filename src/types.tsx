
// types.ts
import { ReactNode } from 'react';

export type MenuItem = {
  title: string;
  content: ReactNode;
};

export type SidebarProps = {
  onMenuItemClick: (content: ReactNode) => void;
};