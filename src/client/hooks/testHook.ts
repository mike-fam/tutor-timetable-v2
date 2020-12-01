import { useState } from "react";

export const useTestHook = () => {
    return useState("test");
}