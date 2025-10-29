import { environment } from '../../../environments/environment';

export enum EndPoints {
    View = 'objects/view/',
    Projects = 'projects'
}

export enum BaseEndpoint {
    Base = 'tools/api/',
    Version01 = 'v1/',
}

export class EndPoint {
    private url = environment.apiUrl;

    load_record_endpoint(path:string, key:number, version:string = 'Version01'){
        let url = this.url + BaseEndpoint['Base'] + BaseEndpoint[version as keyof typeof BaseEndpoint] + EndPoints[path as keyof typeof EndPoints] + key
        return url;
    }

    load_all_records_endpoint(path:string, version:string = 'Version01'){
    let url = this.url + BaseEndpoint['Base'] + BaseEndpoint[version as keyof typeof BaseEndpoint] + EndPoints[path as keyof typeof EndPoints]
    return url;
    }
}