export interface WorkflowInterface {
    workflow: string,
    workflow_pkey: number,
    activity: string,
    connector: string,
    connector_fkey: number
};

export interface WorkflowPayloadInterface {
    workflow: WorkflowInterface,
    payload: any
};