export interface WorkflowInterface {
    workflow: string,
    workflow_pkey: number,
    activity: string,
    connector: string,
};

export interface WorkflowPayloadInterface {
    workflow: WorkflowInterface,
    payload: any
};