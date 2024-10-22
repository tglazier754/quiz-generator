
export type Resource = {
    id?: string;
    image_url?: File | string | null;
    value: string;
    name: string;
    description: string;
    created_at?: Date;
    last_modified?: Date;
    type: "LIBRARY" | "GENERATED";
};