import{ ResponseBase } from '../../core/response/response.interface'

export interface ProjectsInterface extends ResponseBase{

    tools_projects_pkey: number,
    name: string,
    state: string,
    workflow_fkey: number,
}
