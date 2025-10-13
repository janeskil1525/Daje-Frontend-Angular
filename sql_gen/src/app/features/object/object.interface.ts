export interface ObjectInterface {
    tools_objects_pkey: number,
    editnum: number,
    insby:string,
    insdatetime: string,
    modby: string,
    moddatetime: string,
    tools_version_fkey: number,
    type: string,
    name: string,
    active: boolean
}
