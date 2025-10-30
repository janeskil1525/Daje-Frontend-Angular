import { DatabaseService } from './database.service';
import { ResponseService } from '../response/response.service';
import { Observable }  from 'rxjs';
import { ResponseInterface } from '../response/response.interface';

export class RecordLoader {

    private data: any;
    constructor(
        private responseservice: ResponseService,
        private dbservice: DatabaseService,
    ) {}


/*     load_record(endpoint:string, load_pkey:number ) {
        this.dbservice.load_record(endpoint, load_pkey).subscribe((response)=> {
          this.responseservice.sendResponse(response);
          let access = (key: string) => {
            return response[key as keyof typeof response];
          };
          this.data = Object.assign({}, access("data")) ;
      });
    }
 */
    get_data() {
        return this.data;
    }
}