export interface TableObjectInterface {

    tools_object_tables_pkey:number,
    tools_version_fkey: number,
    tools_objects_fkey: number,
    fieldname: string,
    tools_objects_tables_datatypes_fkey: number,
    length: number,
    scale: number,
    active: number,
    visible: number,
}
