export interface IMessages {
    id: number;
    data: {
        uid: string;
        photoURL: string;
        text: string;
        displayName: string;
    };
}
