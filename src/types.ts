export type NavItem = 'Home' | 'About us' | 'Services' | 'Work' | 'Pricing' | 'Review' | 'Contact';

export interface ModalState {
  isOpen: boolean;
  title: string;
  type: 'contact' | 'services' | 'work' | 'info';
  content?: string;
}
