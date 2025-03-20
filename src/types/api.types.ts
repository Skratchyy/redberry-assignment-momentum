export interface Status {
  id: number;
  name: string;
}

export interface Priority {
  id: number;
  name: string;
  icon: string;
}

export interface Department {
  id: number;
  name: string;
}

export interface Employee {
  id: number;
  name: string;
  surname: string;
  avatar: string;
  department_id: number;
}

export interface Comment {
  id: number;
  text: string;
  task_id: number;
  parent_id: number | null;
  author_avatar: string;
  author_nickname: string;
  sub_comments?: Comment[];
}

export interface Task {
  id: number;
  name: string;
  description: string;
  due_date: string;
  status: Status;
  priority: Priority;
  department: Department;
  employee: Employee;
}

export interface CreateEmployeeRequest {
  name: string;
  surname: string;
  avatar?: File;
  department_id: number;
}

export interface CreateCommentRequest {
  text: string;
  parent_id?: number | null;
}

export interface CreateTaskRequest {
  name: string;
  description: string;
  due_date: string;
  status_id: number;
  employee_id: number;
  priority_id: number;
}

export interface UpdateTaskStatusRequest {
  status_id: number;
}

export interface TaskFilters {
  department_id?: number[];
  employee_id?: number[];
  priority_id?: number[];
}