#! /usr/bin/env node
import inquirer from "inquirer";
import chalk from "chalk";

// Define a Student Class.
class Student {
  static counter = 10000;
  name: string;
  id: number;
  courses: string[];
  balance: number;

  constructor(name: string) {
    this.name = name;
    this.id = Student.counter++;
    this.courses = [];
    this.balance = 100;
  }

  // Method to Enroll a Student in a Course.
  enrollCourse(course: string) {
    this.courses.push(course);
  }

  // Method to view a Student Balance.
  viewBalance() {
    console.log(`Balance for : ${this.name} : $${this.balance}.`);
  }

  // Method to pay Fees.
  payFees(amount: number) {
    this.balance -= amount;
    console.log(`$${amount} Fees has been paid Successfully from ${this.name}`);
    console.log(`Remaining Balance : $${this.balance}`);
    
  }

  // Method to Display Student Status.
  showStatus() {
    console.log(`Student Name: ${this.name}`);
    console.log(`Student ID: ${this.id}`);
    console.log(`Enrolled Courses: ${this.courses}`);
    console.log(`Balance: $${this.balance}`);
  }
}

// Define a ManageStudents Class to manage a Student.
class ManageStudents {
  students: Student[];

  constructor() {
    this.students = [];
  }

  // Method to Add a New Student
  addStudent(name: string) {
    let student = new Student(name);
    this.students.push(student);
    console.log(
      `Student: ${name} added Successfully. Student ID: ${student.id}`
    );
  }

  // Method to Enroll a student in a course.
  enrollStudent(studentId: number, course: string) {
    let student = this.findStudent(studentId);
    if (student) {
      student.enrollCourse(course);
      console.log(`${student.name} enrolled in ${course} Successfully.`);
    }
  }

  // Method to View a Student Balance.
  viewStudentBalance(studentId: number) {
    let student = this.findStudent(studentId);
    if (student) {
      student.viewBalance();
    } else {
      console.log("Student not found. Please Correct Student ID. ");
    }
  }

  // Method to Pay Fees.
  payStudentFees(studentId: number, amount: number) {
    let student = this.findStudent(studentId);
    if (student) {
      student.payFees(amount);
    } else {
      console.log("Student not found. Please Correct Student ID. ");
    }
  }

  // Method to Display Student Status.
  showStudentStatus(studentId: number) {
    let student = this.findStudent(studentId);
    if (student) {
      student.showStatus();
    }
  }

  // Method to find a Student by Student-ID
  findStudent(studentId: number) {
    return this.students.find((std) => std.id === studentId);
  }
}

// Main Function to run the Program

async function main() {
  console.log("Well Come To Student Management System");
  console.log("-".repeat(50));

  let manageStudents = new ManageStudents();

  // While loop to keep program running.
  while (true) {
    let choice = await inquirer.prompt([
      {
        name: "choice",
        type: "list",
        message: "Choose an option:",
        choices: [
          "Add Student",
          "Enroll Student",
          "View Student Balance",
          "Pay Fees",
          "Student Status",
          "Exit",
        ],
      },
    ]);

    // using switch case statement for user Choice.

    switch (choice.choice) {
      case "Add Student":
        let nameInput = await inquirer.prompt([
          {
            name: "name",
            type: "input",
            message: "Enter Student Name:",
          },
        ]);
        manageStudents.addStudent(nameInput.name);
        break;

      case "Enroll Student":
        let enrollInput = await inquirer.prompt([
          {
            name: "studentId",
            type: "number",
            message: "Enter Student ID:",
          },
          {
            name: "course",
            type: "input",
            message: "Enter Course Name:",
          },
        ]);
        manageStudents.enrollStudent(
          parseInt(enrollInput.studentId),
          enrollInput.course
        );
        break;

      case "View Student Balance":
        let balanceInput = await inquirer.prompt([
          {
            name: "studentId",
            type: "number",
            message: "Enter Student ID:",
          },
        ]);
        manageStudents.viewStudentBalance(parseInt(balanceInput.studentId));
        break;

      case "Pay Fees":
        let feesInput = await inquirer.prompt([
          {
            name: "studentId",
            type: "number",
            message: "Enter Student ID:",
          },
          {
            name: "amount",
            type: "number",
            message: "Enter Amount to Pay Fees:",
          },
        ]);
        manageStudents.payStudentFees(
          parseInt(feesInput.studentId),
          feesInput.amount
        );
        break;

      case "Student Status":
        let statusInput = await inquirer.prompt([
          {
            name: "studentId",
            type: "number",
            message: "Enter Student ID:",
          },
        ]);
        manageStudents.showStudentStatus(parseInt(statusInput.studentId));
        break;

      case "Exit":
        console.log("Exiting the Program...");
        process.exit(0);
        break;
    }
  }
}

// Run the main function
main();