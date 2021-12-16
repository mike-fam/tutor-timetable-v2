import { FC } from "react";
import { Link, LinkProps } from "react-router-dom";

type Props = LinkProps & {
    fullWidth?: boolean;
    fullHeight?: boolean;
};

export const RouterLink: FC<Props> = ({
    children,
    fullWidth,
    fullHeight,
    ...props
}) => {
    return (
        <Link
            {...props}
            style={{
                width: fullWidth ? "100%" : undefined,
                height: fullHeight ? "100%" : undefined,
            }}
        >
            {children}
        </Link>
    );
};
