import { useDisclosure } from "@chakra-ui/react";
import {
    createContext,
    FC,
    ReactNode,
    RefObject,
    useCallback,
    useRef,
    useState,
} from "react";

type Props = {
    children: ReactNode | ((contextMenu: ContextMenuState) => ReactNode);
};

type MousePosition = {
    x: number;
    y: number;
};

type ContextMenuState = {
    isOpen: boolean;
    closeMenu: Function;
    openMenu: (x: number, y: number) => void;
    menuRef?: RefObject<HTMLDivElement>;
    position: MousePosition;
};

export const ContextMenuContext = createContext<ContextMenuState>({
    isOpen: false,
    closeMenu: () => {},
    openMenu: () => {},
    menuRef: undefined,
    position: { x: 0, y: 0 },
});

export const ContextMenu: FC<Props> = ({ children }) => {
    const { isOpen, onClose: closeMenu, onOpen } = useDisclosure();
    const [position, setPosition] = useState<MousePosition>({ x: 0, y: 0 });
    const menuRef = useRef<HTMLDivElement>(null);
    const openMenu = useCallback(
        (x: number, y: number) => {
            setPosition({ x, y });
            onOpen();
        },
        [onOpen]
    );
    const contextMenuState = {
        isOpen,
        closeMenu,
        openMenu,
        menuRef,
        position,
    };
    return (
        <ContextMenuContext.Provider value={contextMenuState}>
            {typeof children === "function"
                ? children(contextMenuState)
                : children}
        </ContextMenuContext.Provider>
    );
};
