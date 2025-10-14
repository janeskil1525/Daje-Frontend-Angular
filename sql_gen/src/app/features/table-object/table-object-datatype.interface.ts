import{ ResponseBase } from '../../core/response/response.interface';

export interface TableObjectDatatypeInterface extends ResponseBase {

    tools_objects_tables_datatypes_pkey: number,
    name: string,
    length: number,
    scale: number
}
