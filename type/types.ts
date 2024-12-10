
export type UserRole = "ADMIN" | "USER";

export interface Task {
    id: string;
    title: string;
    description: string;
    status: string;
    groupId: string;
    assignedToId: string;
    dueDate: Date;
  }
  
  export interface Group {
    id: string;
    name: string;
    description?:string;
    inviteLink?: string;
    role: string; 
    tasks: Task[];
  }

  export interface Member {
    id: string;
    name: string;
    email: string;
    role: string;
    image: string; 
  }
  
  export interface UserGroup {
    id: string;
    userId: string;
    groupId: string;
    role: UserRole;
    createdAt: Date;
    updatedAt: Date;
  }