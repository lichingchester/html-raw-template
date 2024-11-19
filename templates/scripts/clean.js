import { deleteAsync } from "del";

/**
 * delete dist folder first
 */
const clean = async () => await deleteAsync(DEST.default, { force: true });

export { clean };
