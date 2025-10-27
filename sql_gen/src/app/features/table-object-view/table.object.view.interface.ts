import{ ResponseBase } from '../../core/response/response.interface'

export interface TableObjectViewInterface extends ResponseBase {
    tools_object_view_pkey:number,
    tools_version_fkey:number,
    tools_objects_fkey:number, 
    name:string,
    fields:string,
    conditions:string
}
