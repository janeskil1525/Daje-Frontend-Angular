import { WorkflowInterface } from '../../core/workflow/workflow.interface';

export interface NewprojectInterface extends WorkflowInterface {
    state: string,
    project:string
}
