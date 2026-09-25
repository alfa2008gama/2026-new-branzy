export type NavItem = 'Home' | 'About us' | 'Services' | 'Work' | 'Pricing' | 'Review' | 'Contact';

export interface ModalState {
  isOpen: boolean;
  title: string;
  type: 'contact' | 'services' | 'work' | 'info';
  content?: string;
}

export interface ChatMessage {
  id: string;
  role: 'user' | 'assistant';
  text: string;
  timestamp: string;
  isError?: boolean;
}

export type ChatModelMode = 'gemini-3.5-flash' | 'gemini-3.1-flash-lite' | 'gemini-3.1-pro-preview';

