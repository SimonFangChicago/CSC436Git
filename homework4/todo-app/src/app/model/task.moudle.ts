export interface Task {
    id: string;
    description: string;
}

export const config = {
   collection_endpoint: 'tasks'
};