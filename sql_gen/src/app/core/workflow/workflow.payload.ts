import { WorkflowPayloadInterface,  WorkflowInterface, WorkflowIdentificationData} from './workflow.interface';

export class WorkflowPayload {

    builCall(
        workflow:string, 
        activity:string, 
        payload:any, 
        connector_data: WorkflowIdentificationData,
    ) {
        
            let workflowparams: WorkflowInterface = {
                workflow: workflow,
                activity: activity,
                connector_data: connector_data,
            }

            let workflowdata: WorkflowPayloadInterface = {
                workflow: workflowparams,
                payload: payload,

            };

            return workflowdata;
    }

};