/**
 * Represents a task in the task management system.
 */
export interface Task {
  /**
   * Unique identifier for the task.
   */
  id: number;

  /**
   * Name of the task.
   */
  name: string;

  /**
   * Detailed description of the task.
   */
  description: string;

  /**
   * Optional property indicating the status of the task.
   */
  status?: 'pending' | 'in-progress' | 'completed';

  /**
   * Optional property indicating the priority of the task.
   */
  priority?: 'low' | 'medium' | 'high';

  /**
   * Optional property for the due date of the task.
   */
  dueDate?: Date;

  /**
   * Optional property for the creation date of the task.
   */
  createdDate?: Date;

  /**
   * Optional property for the last updated date of the task.
   */
  updatedDate?: Date;
}
