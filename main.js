// ===============================
// Mon: Ngon ngu phat trien moi
// Ngon ngu: JavaScript (main.js)
// Sinh vien: Nguyen Khac Huy
// Lop: 22DTHC1
// MSSV: 2280601183
// ===============================

// De bai: Lop Person co cac thuoc tinh:
// name, age, email
// Lop Student ke thua Person, bo sung: studentId, major, gpa
// Lop Employee ke thua Person, bo sung: employeeId, department, salary

// ---------- Cau 1: Khai bao class Person ----------
class Person {
  constructor(name, age, email) {
    this.name = name;       // ho ten
    this.age = age;         // tuoi
    this.email = email;     // email
  }

  // Phuong thuc hien thi thong tin
  getInfo() {
    return `Ho ten: ${this.name} | Tuoi: ${this.age} | Email: ${this.email}`;
  }

  // Phuong thuc tinh ky (phuong thuc static)
  static greet() {
    return "Chao mung ban den voi he thong quan ly!";
  }
}

// ---------- Cau 2: Khai bao class Student ke thua Person ----------
class Student extends Person {
  constructor(name, age, email, studentId, major, gpa) {
    super(name, age, email);
    this.studentId = studentId; // ma sinh vien
    this.major = major;         // chuyen nganh
    this.gpa = gpa;             // diem trung binh tich luy
  }

  // Ghi de phuong thuc getInfo
  getInfo() {
    return `${super.getInfo()} | MSSV: ${this.studentId} | Chuyen nganh: ${this.major} | GPA: ${this.gpa}`;
  }

  // Xep loai hoc luc dua tren GPA
  getAcademicRank() {
    if (this.gpa >= 3.6) return "Xuat sac";
    if (this.gpa >= 3.2) return "Gioi";
    if (this.gpa >= 2.5) return "Kha";
    if (this.gpa >= 2.0) return "Trung binh";
    return "Yeu";
  }
}

// ---------- Cau 3: Khai bao class Employee ke thua Person ----------
class Employee extends Person {
  constructor(name, age, email, employeeId, department, salary) {
    super(name, age, email);
    this.employeeId = employeeId; // ma nhan vien
    this.department = department; // phong ban
    this.salary = salary;         // luong
  }

  // Ghi de phuong thuc getInfo
  getInfo() {
    return `${super.getInfo()} | MNV: ${this.employeeId} | Phong ban: ${this.department} | Luong: ${formatVND(this.salary)}`;
  }

  // Tinh thuong theo % luong
  calculateBonus(percent) {
    return this.salary * (percent / 100);
  }
}

// Ham tien ich dinh dang tien VND
function formatVND(value) {
  try {
    return new Intl.NumberFormat("vi-VN", { style: "currency", currency: "VND" }).format(value);
  } catch {
    return value.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ".") + " VND";
  }
}

console.log("===== BAI TAP JS - Classes & Inheritance =====");

// ---------- Cau 4: Khoi tao mang persons gom ca Person, Student, Employee ----------
const persons = [
  new Person("Tran Van An", 45, "an.tran@gmail.com"),
  new Student("Nguyen Thi Bich", 20, "bich.nguyen@student.edu.vn", "SV001", "Cong nghe thong tin", 3.7),
  new Student("Le Van Cuong", 21, "cuong.le@student.edu.vn", "SV002", "Ky thuat phan mem", 2.8),
  new Student("Pham Thi Dung", 22, "dung.pham@student.edu.vn", "SV003", "He thong thong tin", 3.4),
  new Employee("Hoang Van Em", 35, "em.hoang@company.vn", "NV001", "IT", 25000000),
  new Employee("Vu Thi Phuong", 28, "phuong.vu@company.vn", "NV002", "HR", 18000000),
];

console.log("\n(Cau 4) Mang persons:");
persons.forEach(p => console.log(p.getInfo()));

// ---------- Cau 5: Loc ra cac doi tuong la Student ----------
const students = persons.filter(p => p instanceof Student);
console.log("\n(Cau 5) Danh sach Student:");
students.forEach(s => console.log(s.getInfo()));

// ---------- Cau 6: Loc ra cac doi tuong la Employee ----------
const employees = persons.filter(p => p instanceof Employee);
console.log("\n(Cau 6) Danh sach Employee:");
employees.forEach(e => console.log(e.getInfo()));

// ---------- Cau 7: In xep loai hoc luc cho tung sinh vien ----------
console.log("\n(Cau 7) Xep loai hoc luc sinh vien:");
students.forEach(s => {
  console.log(`${s.name} - GPA: ${s.gpa} - Xep loai: ${s.getAcademicRank()}`);
});

// ---------- Cau 8: Tinh tong quy luong cua nhan vien ----------
const totalSalary = employees.reduce((sum, e) => sum + e.salary, 0);
console.log(`\n(Cau 8) Tong quy luong nhan vien: ${formatVND(totalSalary)}`);

// ---------- Cau 9: Tinh thuong 10% cho tung nhan vien ----------
console.log("\n(Cau 9) Thuong 10% cho tung nhan vien:");
employees.forEach(e => {
  const bonus = e.calculateBonus(10);
  console.log(`${e.name} - Thuong: ${formatVND(bonus)}`);
});

// ---------- Cau 10: Su dung phuong thuc static va kiem tra instanceof ----------
console.log(`\n(Cau 10) Static method: ${Person.greet()}`);
console.log(`persons[1] la Student? => ${persons[1] instanceof Student}`);
console.log(`persons[1] la Person?  => ${persons[1] instanceof Person}`);
console.log(`persons[4] la Employee? => ${persons[4] instanceof Employee}`);
console.log(`persons[4] la Student?  => ${persons[4] instanceof Student}`);

// Ket thuc
console.log("\n===== END =====");
