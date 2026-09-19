import React from 'react';

export interface ResourceCategory {
  title: string;
  description: string;
  icon: React.ReactNode;
  href: string;
}

export interface ExternalResource {
  title: string;
  description: string;
  href: string;
}
