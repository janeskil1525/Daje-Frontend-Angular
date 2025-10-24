import{ ResponseBase } from '../../core/response/response.interface';

export interface TableObjectIndexInterface extends ResponseBase  {
    tools_object_index_pkey:number,
    tools_version_fkey:number,
    tools_objects_fkey:number,
    table_name:string,
    fields:string,
    index_unique:boolean
}
