export class LoginModel {
  emailId: string = '';
  password: string = '';
}

export interface APIResponseModel {
  message: string;
  result: boolean;
  data: any;
}

export interface EmployeeInfo {
  employeeId: number;
  employeeName: string;
  deptId: number;
  deptName: string;
  contactNo: string;
  emailId: string;
  role: string;
  gender: string;
}

export class EmployeeModel {
  employeeId: number = 0;
  employeeName: string = '';
  deptId: number = 0;
  deptName: string = '';
  contactNo: string = '';
  emailId: string = '';
  role: string = '';
  gender: string = 'male';
  password: string = 'test';
}
