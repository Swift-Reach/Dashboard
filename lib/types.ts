interface Lead {
    id: number;

    status: 'New' | 'Attempted_Contact' | 'Connected';

    name?: string;
    number?: string;
    email?: string;
    company?: string;
    position?: string;

    ownerId: number;
}

interface Action {
    id: number;
    done: boolean;
    type: 'Call' | 'Email';
    note: string;
    due: Date;
    priority: 'High' | 'Medium' | 'Low';
    lead: Lead;
}

interface User {
    id: number;
    name: string;
    email: string;
}