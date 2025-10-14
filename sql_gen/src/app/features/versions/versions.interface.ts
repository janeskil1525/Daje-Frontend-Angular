import{ ResponseBase } from '../../core/response/response.interface';

export interface VersionsInterface extends ResponseBase {
    tools_version_pkey:number,
    tools_projects_fkey:number,
    version:number,
    locked:number,
    name:string,
    workflow_fkey:number,

}
