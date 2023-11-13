import { IFetchUserResponse } from "types/User";

interface MockifyTableTypes {
    data: any ;
    columns: any[];
    classes: Array<string>;
    expandable?: Object;
    expandRowByClick?: boolean;
}

export default MockifyTableTypes;