import{ ResponseBase } from '../../core/response/response.interface';

export interface ObjectTypeInterface extends ResponseBase {
    tools_object_types_pkey:number,
    name:string,
    type:number,
}
