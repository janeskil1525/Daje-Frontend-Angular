import{ ResponseBase } from '../../../core/response/response.interface'


export interface ParameterValuesInterface extends ResponseBase {
    tools_parameter_values_pkey:number,
    tools_parameters_fkey:number,
    tools_projects_fkey:number,
    value:string,
    description:string,
    active:boolean,
}
