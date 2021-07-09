import { useCallback, useState } from "react";
import { Map } from "immutable";
import { v4 as uuid } from "uuid";

export const useModificationMap = <T>() => {
    const [unchanged, setUnchanged] = useState<Map<string, T>>(Map());
    const [modified, setModified] = useState<Map<string, T>>(Map());
    const [deleted, setDeleted] = useState<Map<string, T>>(Map());
    const [deleteModified, setDeleteModified] = useState<Map<string, T>>(Map());
    const [created, setCreated] = useState<Map<string, T>>(Map());

    const deleteItem = useCallback(
        (id: string) => {
            if (unchanged.has(id)) {
                const item = unchanged.get(id)!;
                setUnchanged((prev) => prev.remove(id));
                setDeleted((prev) => prev.set(id, item));
            } else if (modified.has(id)) {
                const item = modified.get(id)!;
                setModified((prev) => prev.remove(id));
                setDeleteModified((prev) => prev.set(id, item));
            } else if (created.has(id)) {
                setCreated((prev) => prev.remove(id));
            }
        },
        [unchanged, modified, created]
    );

    const restoreItem = useCallback(
        (id: string) => {
            if (deleted.has(id)) {
                const item = deleted.get(id)!;
                setDeleted((prev) => prev.remove(id));
                setUnchanged((prev) => prev.set(id, item));
            } else if (deleteModified.has(id)) {
                const item = deleteModified.get(id)!;
                setDeleteModified((prev) => prev.remove(id));
                setModified((prev) => prev.set(id, item));
            }
        },
        [deleted, deleteModified]
    );

    const createItem = useCallback((item: T, id?: string) => {
        setCreated((prev) => prev.set(id || uuid(), item));
    }, []);

    const updateItem = useCallback(
        (id: string, newFields: Partial<T>) => {
            const item = unchanged.get(id);
            if (!item) {
                return;
            }
            const newItem = { ...item, ...newFields };
            setModified((prev) => prev.set(id, newItem));
        },
        [unchanged]
    );

    const clearItems = useCallback(() => {
        setUnchanged((prev) => prev.clear());
        setModified((prev) => prev.clear());
        setCreated((prev) => prev.clear());
        setDeleted((prev) => prev.clear());
        setDeleteModified((prev) => prev.clear());
    }, []);

    const resetItems = useCallback(
        (newKeys: Array<[string, T]>) => {
            clearItems();
            newKeys.forEach(([id, obj]) => {
                setUnchanged((prev) => prev.set(id, obj));
            });
        },
        [clearItems]
    );

    return {
        unchanged,
        modified,
        deleted,
        deleteModified,
        created,
        deleteItem,
        restoreItem,
        createItem,
        updateItem,
        clearItems,
        resetItems
    };
};
