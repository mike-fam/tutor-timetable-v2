import { DataLoaders } from "../types/dataloaders";

export class Utils {
    public static loaders: DataLoaders;

    public static setLoaders(loaders: DataLoaders) {
        this.loaders = loaders;
    }
}
