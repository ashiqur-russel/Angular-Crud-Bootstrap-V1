import { ApiService } from './../shared/api.service';
import { EmployeeModel } from './employee-dashboard.model';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms'

@Component({
  selector: 'app-employee-dashboard',
  templateUrl: './employee-dashboard.component.html',
  styleUrls: ['./employee-dashboard.component.css']
})
export class EmployeeDashboardComponent implements OnInit {
  formValue !: FormGroup;

  // CREATE EMPLOYEE OBJECT
  employeeModelObj: EmployeeModel = new EmployeeModel();
  //Property
  emplyoeeData!: any;
  showAddButton!: boolean;
  showUpdateButton!: boolean


  //Constructor for dependency injection
  constructor(private formbuilder: FormBuilder, private api: ApiService) { }

  ngOnInit(): void {
    //BIND THE FORM VALUE
    this.formValue = this.formbuilder.group({
      firstName: [''],
      lastName: [''],
      email: [''],
      phone: [''],
      salary: [''],
    })

    //call getEmployee method for fecth All Employee Data from Server
    this.getAllEmployee();

  }
  //Add employee method
  postEmployeeDetails() {
    this.employeeModelObj.firstName = this.formValue.value.firstName;
    this.employeeModelObj.lastName = this.formValue.value.lastName;
    this.employeeModelObj.email = this.formValue.value.email;
    this.employeeModelObj.phone = this.formValue.value.phone;
    this.employeeModelObj.salary = this.formValue.value.salary;


    this.api.postEmployee(this.employeeModelObj)
      .subscribe(res => {
        console.log(res);
        alert("Employee Added Successfully");
        let ref = document.getElementById('cancel');
        ref?.click();
        this.formValue.reset();
        this.getAllEmployee();
      },
        (err) => {
          alert("something went wrong")

        }
      )
  }

  //Get all employee method
  getAllEmployee() {
    this.api.getEmployee()
      .subscribe(res => {
        this.emplyoeeData = res
      })
  }

  //Delete employee with id
  deleteEmployee(row: any) {

    this.api.deleteEmployee(row.id).subscribe(res => {
      alert("Employee deleted")
      this.getAllEmployee(); // after delete button press page will refresh and load data
    })

  }

  // Click method for  appearing prevoius Employee value on form input

  onEdit(row: any) {
    this.showAddButton = false;
    this.showUpdateButton = true
    this.employeeModelObj.id = row.id;  // store id when click 
    this.formValue.controls['firstName'].setValue(row.firstName);
    this.formValue.controls['lastName'].setValue(row.lastName);
    this.formValue.controls['email'].setValue(row.email);
    this.formValue.controls['phone'].setValue(row.phone);
    this.formValue.controls['salary'].setValue(row.salary);
  }
  //Method for updating employee data
  updateEmployeeDetails() {
    this.employeeModelObj.firstName = this.formValue.value.firstName;
    this.employeeModelObj.lastName = this.formValue.value.lastName;
    this.employeeModelObj.email = this.formValue.value.email;
    this.employeeModelObj.phone = this.formValue.value.phone;
    this.employeeModelObj.salary = this.formValue.value.salary;

    this.api.updateEmployee(this.employeeModelObj, this.employeeModelObj.id)
      .subscribe(res => {
        alert("Updated Succedfully")

        let ref = document.getElementById('cancel');
        ref?.click();
        this.formValue.reset();
        this.getAllEmployee();
      })
  }

  // Method for resetting Form value when << Add Employee >> button click
  clickAddEmployee() {
    this.formValue.reset();
    this.showAddButton = true;
    this.showUpdateButton = false
  }

}
