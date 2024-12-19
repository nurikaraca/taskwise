
export type UserRole = "ADMIN" | "USER";
import { LucideIcon } from 'lucide-react';
import { ReactNode } from 'react';

export interface SidebarItems {
  links: Array<{
    label: string;
    href: string;
    icon?: LucideIcon;
  }>;
  extras?: ReactNode;
}


export  type User = {
  id: string;
  name?: string | null;
  email?: string | null;
  hashedPassword?: string | null;
  emailVerified?: Date | null;
  image?: string | null;
  role?: UserRole | null;
  ownedGroups: Group[];
  memberships: UserGroup[];
  tasks: Task[];
  files: File[];
  statuses: UserTaskStatus[];
  createdAt: Date;
  updatedAt: Date;

};
export  type UserTaskStatus = {
  id: string;
  userId: string;
  taskId: string;
  isCompleted: boolean;
  createdAt: Date;
  updatedAt: Date;

  
  user: User;
  task: Task;
};

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
    ownerId : string;
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