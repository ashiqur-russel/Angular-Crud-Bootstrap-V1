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

}
