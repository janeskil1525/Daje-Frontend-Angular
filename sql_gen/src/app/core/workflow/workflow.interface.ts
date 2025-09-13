export interface WorkflowInterface {
    workflow: string,
    workflow_pkey: number,
    activity: string,
};

export interface WorkflowPayloadInterface {
    workflow: WorkflowInterface,
    payload: any,

};