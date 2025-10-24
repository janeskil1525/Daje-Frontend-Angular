import{ ResponseBase } from '../../core/response/response.interface';

export interface TableObjectSqlInterface extends ResponseBase {
    tools_object_sql_pkey:number,
    tools_version_fkey:number,
    tools_objects_fkey:number,
    sql_string:string,
}
