import { createContext, useState } from 'react';


interface UiProviderProps {
  children: JSX.Element | JSX.Element[];
}

interface UiContextProps {
  isMenuHide: boolean;
  showMenu: () => void;
  hideMenu: () => void;
}

export const UiContext = createContext<UiContextProps>({} as UiContextProps);

export const UiProvider = ({ children }: UiProviderProps) => {

  const [isMenuHide, setIsMenuHide] = useState(false);

  const showMenu = () => {
    setIsMenuHide(false);
  }

  const hideMenu = () => {
    setIsMenuHide(true);
  }

  return (
    <UiContext.Provider value={ {
      isMenuHide,
      showMenu,
      hideMenu,
    } }>
      { children }
    </UiContext.Provider>
  );
};
