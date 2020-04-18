import {Component, EventEmitter, Inject, OnInit, Output, ViewChild} from '@angular/core';
import {pages, permissions} from "../../settings/routing";
import {MatTableDataSource} from "@angular/material/table";
import {MatSort} from "@angular/material/sort";
import {MatPaginator} from "@angular/material/paginator";
import {User} from "../interfaces/User";
import LoginManager from "../../login/LoginManager";
import {MAT_DIALOG_DATA, MatDialog, MatDialogRef} from "@angular/material/dialog";
import {normalizePermission} from "../utility/sharedFunctions";

const users: UserData[] = [
    {
        username: "Bette",
        name: "Britney Stanton",
        permissions: ['cassa']
    },
    {
        username: "Aisha",
        name: "Myra Sharpe",
        permissions: ['cassa', 'magazzino', 'magazzino_write']
    },
    {
        username: "Fowler",
        name: "Ophelia Parrish",
        permissions: ['cassa']
    },
    {
        username: "Gena",
        name: "Annabelle Mccarthy",
        permissions: ['cassa']
    },
    {
        username: "Hampton",
        name: "Sonja Webster",
        permissions: ['cassa', 'utenti']
    },
    {
        username: "Beasley",
        name: "Stephenson York",
        permissions: ['cassa']
    },
    {
        username: "Butler",
        name: "Hensley Grimes",
        permissions: ['root']
    },
    {
        username: "Myrtle",
        name: "Cline Dillon",
        permissions: ['magazzino']
    },
    {
        username: "Summer",
        name: "Alexandria Moses",
        permissions: ['cassa', 'magazzino', 'magazzino_read', 'utenti']
    },
    {
        username: "Sykes",
        name: "Corine Walton",
        permissions: ['cassa']
    },
    {
        username: "Rosa",
        name: "Earlene Chaney",
        permissions: ['cassa']
    },
    {
        username: "Ford",
        name: "Michael Hamilton",
        permissions: ['cassa']
    },
    {
        username: "Barron",
        name: "Goodman Powell",
        permissions: ['cassa', 'magazzino']
    },
    {
        username: "Hall",
        name: "Macias Melendez",
        permissions: ['cassa']
    }
];

interface UserData {
    username: string,
    name: string,
    permissions: string[]
}

@Component({
    selector: 'app-gestione-utenti',
    templateUrl: '../models/gestione-utenti.component.html',
    styleUrls: ['../../styles/gestione-utenti.component.sass']
})

export class GestioneUtentiComponent implements OnInit {
    @Output() _hasSidenav: EventEmitter<any> = new EventEmitter();

    displayedColumns: string[] = ['username', 'nome', 'permissions'];
    dataSource = new MatTableDataSource(users);

    @ViewChild(MatSort, {static: true}) sort: MatSort;
    @ViewChild(MatPaginator, {static: true}) paginator: MatPaginator;

    private _user: User;

    constructor(public editUserDialog: MatDialog) {

    }

    ngOnInit(): void {
        this._hasSidenav.emit({
            hasSideNav: pages.gestioneUtenti.hasSideNav,
            toolbarFrom: pages.gestioneUtenti.path
        });

        this.dataSource.sort = this.sort;
        this.dataSource.paginator = this.paginator;

        this._user = LoginManager.getEnvLoginSync().current_user;
    }

    applyFilter(event: Event) {
        const filterValue = (event.target as HTMLInputElement).value;
        this.dataSource.filter = filterValue.trim().toLowerCase();
    }

    getPermissions(permissions: string[]): string {
        let toReturn = "";

        for (let permesso of permissions)
            toReturn += ', ' + normalizePermission(permesso);

        return toReturn.slice(2);
    }

    editUser(user: UserData): void {
        const dialogRef = this.editUserDialog.open(EditUserDialog, {
            width: '40vw',
            data: user
        });

        dialogRef.afterClosed().subscribe(result => {
            console.log('The dialog was closed');
        });
    }

}

@Component({
    selector: 'edit-user-dialog',
    templateUrl: '../dialogs/editUserDialog.html',
    styleUrls: ['../dialogs/userDialog.sass']
})

export class EditUserDialog {

    private _rootForm = {
        permission: 'root',
        yes: 'Si',
        no: 'No'
    };

    private _typesOfPermissions = {
        nessuno: 'Nessuno',
        completo: 'Completo',
        lettura: 'Sola lettura'
    };

    isRoot = this._rootForm.no;
    newPermissions = {};

    private writePermission = {
        word: "write",
        divider: "_"
    };

    constructor(public dialogRef: MatDialogRef<EditUserDialog>, @Inject(MAT_DIALOG_DATA) public user: UserData) {
        this.isRoot = this.user.permissions.includes(this._rootForm.permission) ? this._rootForm.yes : this._rootForm.no;

        Object.keys(permissions).forEach(e =>
            this.newPermissions[e.toLowerCase()] =
                (this.user.permissions.includes(e)
                    || this.user.permissions.includes(this._rootForm.permission))
                    ? (this.isPermissionComplete(e) ? this._typesOfPermissions.completo : this._typesOfPermissions.lettura)
                    : this._typesOfPermissions.nessuno);
    }

    isPermissionComplete(permission: string): boolean {
        let isComplete = false;

        if (!permissions[permission].onlyRead || this.user.permissions.includes(this._rootForm.permission))
            return true;

        for (let e of this.user.permissions)
            if (e.slice(e.indexOf(this.writePermission.divider) + 1) === this.writePermission.word) {
                isComplete = true;
                break;
            }

        return isComplete;
    }

    onNoClick(): void {
        this.dialogRef.close();
    }

    getRootPermissions() {
        return [this._rootForm.no, this._rootForm.yes];
    }

    getAllPermissions(): string[] {
        let perm = [];

        Object.keys(permissions).forEach(e => perm.push(normalizePermission(e)));

        return perm;
    }

    getTypesOfPermission(perm: string): string[] {
        let toReturn = [this._typesOfPermissions.nessuno, this._typesOfPermissions.completo];

        if (permissions[perm.toLowerCase()].onlyRead)
            toReturn.push(this._typesOfPermissions.lettura);

        return toReturn;
    }

    onRadioChange(event: any) {
        if (event.value === this._rootForm.yes)
            Object.keys(this.newPermissions).forEach(e => this.newPermissions[e] = this._typesOfPermissions.completo)
    }

    get rootForm(): { no: string; yes: string; permission: string } {
        return this._rootForm;
    }
}
