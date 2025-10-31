import { environment } from '../../../environments/environment';

export enum EndPoints {
    View = 'objects/view/',
    Projects = 'projects/',
    Treelist = 'treelist/',
    ParameterTreelist = 'parameters/treelist/',
    Object = 'object/',
    ObjectTypes = 'objects/types/',
    TableObjectDatatypes = 'table/obj/datatypes/',
    TableObjects = 'table/objects/',
    TableObject = 'table/object/',
    ObjectIndex = 'objects/index/',
    ObjectSQL = 'objects/sql/',
    ObjectView = 'object/view/',
    Versions = 'versions/',
    ParamTreelist = 'parameters/treelist/',
}

export enum BaseEndpoint {
    Base = 'tools/api/',
    V01 = 'v1/',
}

export class EndPoint {
    private url = environment.apiUrl;

    load_record_endpoint(path:string, key:number, version:string = 'V01'){
        return this.url + BaseEndpoint['Base'] + BaseEndpoint[version as keyof typeof BaseEndpoint] + EndPoints[path as keyof typeof EndPoints] + key        
    }

    load_all_records_endpoint(path:string, version:string = 'V01'){
        return this.url + BaseEndpoint['Base'] + BaseEndpoint[version as keyof typeof BaseEndpoint] + EndPoints[path as keyof typeof EndPoints]

    }
}