import React from "react";

type Props = {
    test: string
};

export const Test: React.FunctionComponent<Props> = ({test}) => {
  return (
    <div>
      Sample component: {test}
    </div>
  );
};