import { D, da } from "@fullcalendar/core/internal-common";

export interface Employee {
    id?: number;
    lastName?: string;
    firstName?: string;
    username?: string;
    email?: string;
    telephone?: string;
    dateNaissance?: Date;
    dateEmbauche?: Date;
    dateDepart?: Date;
    poste?: number;
    department?: string;
    designationId?: number;
    role?: string;
    designationNom?: string;
    departmentNom?: string;
}