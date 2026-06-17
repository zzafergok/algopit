export interface NavItem {
  label: string;
  href: string;
  children?: NavItem[];
  description?: string;
  difficulty?: "Kolay" | "Orta" | "Zor" | string;
  category?: string;
  isExternal?: boolean;
}

export interface AlgorithmCardItem {
  name: string;
  path: string;
  description: string;
  difficulty?: "Kolay" | "Orta" | "Zor" | string;
  category?: string;
}

export interface NavigationConfig {
  mainNavItems: NavItem[];
  footerSections: FooterSection[];
}

export interface FooterSection {
  title: string;
  links: NavItem[];
}
