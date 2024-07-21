import React from 'react';

interface NavigationContextType {
  currentPath: string;
  navigate: (to: string) => void;
}

const NavigationContext = React.createContext<NavigationContextType | undefined>(undefined);

export default NavigationContext;