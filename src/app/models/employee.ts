import { da } from "@fullcalendar/core/internal-common";

export interface Employee {
    id?: number;
    lastName?: string;
    firstName?: string;
    email?: string;
    telephone?: string;
    dateNaissance?: string;
    dateEmbauche?: Date;
    dateDepart?: Date;
    poste?: number;
    department?: string;
    designationId?: number;
    role?: string;
}