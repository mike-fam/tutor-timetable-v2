import React, {
    Children,
    cloneElement,
    isValidElement,
    useContext,
} from "react";
import { ContextMenuContext } from "./ContextMenu";

type Props = {};

export const ContextMenuTrigger: React.FC<Props> = ({ children }) => {
    const { openMenu, setPosition } = useContext(ContextMenuContext);
    const child = Children.only(children);
    return isValidElement(child)
        ? cloneElement(child, {
              onContextMenu: (e: MouseEvent) => {
                  e.preventDefault();
                  setPosition({ x: e.clientX, y: e.clientY });
                  openMenu();
              },
          })
        : null;
};
