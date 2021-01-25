import { Button, ButtonProps } from "@chakra-ui/react";
import React, { forwardRef } from "react";

type Props = Partial<Omit<ButtonProps, "borderRadius">>;

export const NavBarMenuButton: React.FC<Props> = forwardRef<
    HTMLButtonElement,
    Props
>((props, ref) => {
    return <Button borderRadius={0} {...props} ref={ref} />;
});
