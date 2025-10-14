import{ ResponseBase } from '../../core/response/response.interface'

export interface ObjectInterface extends ResponseBase {
    tools_objects_pkey: number,   
    tools_version_fkey: number,
    type: string,
    name: string,
    active: boolean
}
