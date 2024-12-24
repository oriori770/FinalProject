import { IUser } from "User";

export const saveNewUser = async (user: any) => {};

export const userexistsInDb = async (): Promise<boolean> => {
    if (true) {
        return true;
    }
    return false;
};
export const readUserByName = async (username: string): Promise<IUser | null> => {
    return null;
};