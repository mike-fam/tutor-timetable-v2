export class Tree<T> {
    private root: TreeNode<T>;

    public getRoot(): TreeNode<T> {
        return this.root;
    }

    public constructor(root: TreeNode<T>) {
        this.root = root;
    }
}

export class TreeNode<T> {
    private children: TreeNode<T>[];
    private parent?: TreeNode<T>;
    private height?: number;
    private depth?: number;
    private element: T;

    public constructor(element: T, parent?: TreeNode<T>) {
        this.element = element;
        this.parent = parent;
        this.children = [];
    }

    public isLeaf(): boolean {
        return this.children.length === 0;
    }

    public isRoot(): boolean {
        return this.parent === undefined;
    }

    public getElement(): T {
        return this.element;
    }

    public getHeight(): number | undefined {
        return this.height;
    }

    public getDepth(): number | undefined {
        return this.depth;
    }

    public getChildren(): TreeNode<T>[] {
        return [...this.children];
    }

    public getParent(): TreeNode<T> | undefined {
        return this.parent;
    }

    public addChild(newChild: TreeNode<T>): void {
        this.children.push(newChild);
        newChild.setParent(this);
    }

    private setParent(newParent: TreeNode<T>) {
        this.parent = newParent;
    }

    public setHeight(newHeight: number) {
        this.height = newHeight;
    }

    public setDepth(newDepth: number) {
        this.depth = newDepth;
    }

    public setElement(newElement: T) {
        this.element = newElement;
    }
}

export const postOrderTraversal = <T>(tree: Tree<T>): TreeNode<T>[] => {
    const traversal: TreeNode<T>[] = [];
    const postOrderRecursive = (node: TreeNode<T>) => {
        for (const child of node.getChildren()) {
            postOrderRecursive(child);
        }
        traversal.push(node);
    };
    postOrderRecursive(tree.getRoot());
    return traversal;
};

export const preOrderTraversal = <T>(tree: Tree<T>): TreeNode<T>[] => {
    const traversal: TreeNode<T>[] = [];
    const preOrderRecursive = (node: TreeNode<T>) => {
        traversal.push(node);
        for (const child of node.getChildren()) {
            preOrderRecursive(child);
        }
    };
    preOrderRecursive(tree.getRoot());
    return traversal;
};

export const populateTreeHeight = <T>(tree: Tree<T>) => {
    for (const node of postOrderTraversal(tree)) {
        if (node.isLeaf()) {
            node.setHeight(0);
        } else {
            node.setHeight(
                Math.max(
                    ...node.getChildren().map((child) => child.getHeight()!)
                ) + 1
            );
        }
    }
};

export const populateTreeDepth = <T>(tree: Tree<T>) => {
    for (const node of preOrderTraversal(tree)) {
        node.setDepth(node.isRoot() ? 0 : node.getParent()!.getDepth()! + 1);
    }
};
