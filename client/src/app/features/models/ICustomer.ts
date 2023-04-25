export interface Customer {
    avatarUrl?: string;
    firstName?: string;
    lastName?: string;
    email?: string;
    phone?: any| null | undefined;
    address?: {
        streetAddress?: string,
        city?: string,
        state?: string,
        zipCode?: any | null | undefined
    };
    _id: string;
}