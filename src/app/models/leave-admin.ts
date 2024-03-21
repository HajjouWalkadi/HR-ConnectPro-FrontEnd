export interface LeaveAdmin {
    id : number;
    typeConge : string;
    dateDebut : string;
    dateFin : string;
    status : string;
    description : string;
    leaveDays : number;
    employeeId : number;
    employeeFullName? : string;
    
}

export interface Employee {
    id : number;
    firstName : string;
    lastName : string;
    email : string;
    phone : string;
    address : string;
}