export interface VersionsInterface {
    tools_version_pkey:number,
    editnum: number,
    insby: string,
    insdatetime: string,
    modby: string,
    moddatetime : string,
    tools_projects_fkey:number,
    version:number,
    locked:number,
    name:string,
    workflow_fkey:number,
    
}
