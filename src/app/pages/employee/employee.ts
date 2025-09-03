import {
  Component,
  ElementRef,
  Inject,
  OnInit,
  PLATFORM_ID,
  ViewChild,
  inject,
} from '@angular/core';
import { AsyncPipe, isPlatformBrowser } from '@angular/common';
import { EmployeeService } from '../../services/employee';
import { APIResponseModel, EmployeeInfo, EmployeeModel } from '../model/Employee.model';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { Observable } from 'rxjs';
declare const bootstrap: any;

@Component({
  selector: 'app-employee',
  imports: [ReactiveFormsModule, AsyncPipe],
  templateUrl: './employee.html',
  styleUrls: ['./employee.scss'],
})
export class Employee implements OnInit {
  employeeService = inject(EmployeeService);
  employeeList: EmployeeInfo[] = [];
  departments: { deptId: number; deptName: string }[] = [];
  roleList: Observable<any[]> = new Observable<any[]>();
  addEmployeeForm: FormGroup;

  @ViewChild('addEmployeeModal') addModalRef!: ElementRef;

  isBrowser: boolean;

  constructor(private fb: FormBuilder, @Inject(PLATFORM_ID) private platformId: Object) {
    //Need to do this for SSR, document does not exist on server
    this.isBrowser = isPlatformBrowser(this.platformId);

    this.addEmployeeForm = this.fb.group({
      employeeName: ['', Validators.required],
      deptId: ['', Validators.required],
      contactNo: ['', Validators.required],
      emailId: ['', [Validators.required, Validators.email]],
      role: ['', Validators.required],
      gender: ['male', Validators.required], //default to male
    });
  }

  ngOnInit(): void {
    this.getEmployees();
    this.loadDepartments();
    this.roleList = this.employeeService.GetAllRoles();
  }

  getEmployees() {
    this.employeeService.getAllEmployees().subscribe({
      next: (res: APIResponseModel) => {
        this.employeeList = res.data;
      },
      error: (err) => console.log(err),
    });
  }
  loadDepartments() {
    this.employeeService.GetAllDepartments().subscribe({
      next: (res: APIResponseModel) => {
        // assuming res.data is an array of { id, name }
        this.departments = res.data;
        // optionally set default to first department
        if (this.departments.length) {
          this.addEmployeeForm.patchValue({ deptName: this.departments[0].deptId });
        }
      },
      error: (err) => console.log(err),
    });
  }

  addEmployee() {
    if (this.addEmployeeForm.valid) {
      let newEmployee: EmployeeModel = Object.assign(
        new EmployeeModel(),
        this.addEmployeeForm.value
      );
      this.employeeService.addEmployee(newEmployee).subscribe({
        next: (res) => {
          alert('Employee added successfully');
        },
        error: (err) => alert('Failed to add employee' + err.message),
      });
      // Reset the form
      this.addEmployeeForm.reset();

      // Close the modal only on the client
      if (this.isBrowser && this.addModalRef) {
        const modalEl = this.addModalRef.nativeElement;
        const modal = bootstrap.Modal.getInstance(modalEl) || new bootstrap.Modal(modalEl);
        modal.hide();
      }
    } else {
      alert('Form data invalid');
    }
  }

  viewEmployee(id: number) {
    console.log('View', id);
  }
  editEmployee(id: number) {
    console.log('Edit', id);
  }
  deleteEmployee(id: number) {
    console.log('Delete', id);
  }
}
