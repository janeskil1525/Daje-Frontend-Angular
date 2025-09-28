import { WorkflowPayloadInterface,  WorkflowInterface} from './workflow.interface';

export class WorkflowPayload {

    builCall(
        workflow:string, workflow_pkey:number, 
        activity:string, payload:any, 
        connector: string) {
        
            let workflowparams: WorkflowInterface = {
                workflow: workflow,
                workflow_pkey: workflow_pkey,
                activity: activity,
                connector: connector,
            }

            let workflowdata: WorkflowPayloadInterface = {
                workflow: workflowparams,
                payload: payload,

            };

            return workflowdata;
    }

};