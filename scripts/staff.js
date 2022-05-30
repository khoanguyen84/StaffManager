class Staff {
  constructor(id, fullname, email, salary, avatar, dob, status) {
    this.id = id;
    this.fullname = fullname;
    this.email = email;
    this.salary = salary;
    this.avatar = avatar;
    this.dob = dob;
    this.status = status;
  }
}

class Helper {
  static formatCurrency(number) {
    return number.toLocaleString("vi-VN", {
      style: "currency",
      currency: "VND",
    });
  }
}

let staffs = [];

const staff_data = "staff_data";
function init() {
  if (localStorage.getItem(staff_data) === null) {
    staffs = [
      new Staff(
        1,
        "Thành",
        "thanh@gmail.com",
        10000000,
        "https://i.pravatar.cc/150?img=1",
        "2000-10-10",
        true
      ),
      new Staff(
        2,
        "Trung",
        "trung@gmail.com",
        10500000,
        "https://i.pravatar.cc/150?img=2",
        "2000-10-10",
        true
      ),
      new Staff(
        3,
        "Linh",
        "linh@gmail.com",
        9000000,
        "https://i.pravatar.cc/150?img=3",
        "2000-10-10",
        true
      ),
      new Staff(
        4,
        "Quý",
        "quý@gmail.com",
        11000000,
        "https://i.pravatar.cc/150?img=4",
        "2000-10-10",
        true
      ),
      new Staff(
        5,
        "Pháp",
        "phap@gmail.com",
        20000000,
        "https://i.pravatar.cc/150?img=5",
        "2000-10-10",
        true
      ),
      new Staff(
        6,
        "Dương",
        "duong@gmail.com",
        21000000,
        "https://i.pravatar.cc/150?img=7",
        "2000-10-10",
        true
      ),
    ];
    localStorage.setItem(staff_data, JSON.stringify(staffs));
  } else {
    staffs = JSON.parse(localStorage.getItem(staff_data));
  }
}

function renderStaff(data) {
//   data.sort(function (staff_1, staff_2) {
//     return staff_2.id - staff_1.id;
//   });
  let htmls = data.map(function (staff) {
    return `
        <tr>
        <td class="text-center"><input type="checkbox"></td>
        <td class="text-center">S-${staff.id}</td>
        <td>${staff.fullname}</td>
        <td>
            <img class="avatar" src="${staff.avatar}" alt="">
        </td>
        <td class="text-right">${staff.dob}</td>
        <td class="text-center">${staff.email}</td>
        <td class="text-right">${Helper.formatCurrency(staff.salary)}</td>
        <td class="text-center">${staff.status ? "Active" : "Inactive"}</td>
        <td class="text-center">
            <button class="btn btn-success btn-sm" onclick="getStaff(${
              staff.id
            })">Edit</button>
            <button class="btn ${
              staff.status ? "btn-secondary" : "btn-warning"
            } btn-sm" onclick="changeStatus(${staff.id}, ${staff.status})">${staff.status ? "Inactive" : "Active"}</button>
            <button class="btn btn-danger btn-sm" onclick='remove(${
              staff.id
            })'>Remove</button>
        </td>
    </tr>
        `;
  });
  document.querySelector(".table>tbody").innerHTML = htmls.join("");
}

function createStaff() {
  let fullname = document.querySelector("#fullname").value;
  let avatar = document.querySelector("#avatar").value;
  let dob = document.querySelector("#dob").value;
  let email = document.querySelector("#email").value;
  let salary = Number(document.querySelector("#salary").value);
  let status = document.querySelector("input[name=status]").checked;
  let id = findMaxId() + 1;

  let staff = new Staff(id, fullname, email, salary, avatar, dob, status);

  staffs.push(staff);
  localStorage.setItem(staff_data, JSON.stringify(staffs));
  renderStaff(staffs);
  clearForm();
}

function updateStaff() {
  let fullname = document.querySelector("#fullname").value;
  let avatar = document.querySelector("#avatar").value;
  let dob = document.querySelector("#dob").value;
  let email = document.querySelector("#email").value;
  let salary = Number(document.querySelector("#salary").value);
  let status = document.querySelector("input[name=status]").checked;
  let id = Number(document.querySelector("#staffId").value);

  let staff = staffs.find(function (staff) {
    return staff.id == id;
  });

  staff.fullname = fullname;
  staff.avatar = avatar;
  staff.dob = dob;
  staff.email = email;
  staff.salary = salary;
  staff.status = status;

  localStorage.setItem(staff_data, JSON.stringify(staffs));
  renderStaff(staffs);
  cancel();
}

function clearForm() {
  document.querySelector("#fullname").value = "";
  document.querySelector("#avatar").value = "";
  document.querySelector("#dob").value = "";
  document.querySelector("#email").value = "";
  document.querySelector("#salary").value = "";
  document.querySelector("input[name=status]").checked = true;
  document.querySelector("#staffId").value = "0";
}

function remove(staffId) {
  let confirmed = window.confirm("Are you sure to want to remove this staff?");
  if (confirmed) {
    let posistion = staffs.findIndex(function (staff) {
      return staff.id == staffId;
    });
    staffs.splice(posistion, 1);
    localStorage.setItem(staff_data, JSON.stringify(staffs));
    renderStaff(staffs);
  }
}

function findMaxId() {
  let max = 0;
  for (let staff of staffs) {
    if (staff.id > max) {
      max = staff.id;
    }
  }
  return max;
}

function search(searchInput) {
  let result = staffs.filter(function (staff) {
    return (
      staff.fullname.toLowerCase().indexOf(searchInput.value.toLowerCase()) !=
        -1 ||
      staff.email.toLowerCase().indexOf(searchInput.value.toLowerCase()) !=
        -1 ||
      staff.salary == Number(searchInput.value)
    );
  });
  renderStaff(result);
}

function getStaff(staffId) {
  let staff = staffs.find(function (staff) {
    return staff.id == staffId;
  });

  document.querySelector("#fullname").value = staff.fullname;
  document.querySelector("#avatar").value = staff.avatar;
  document.querySelector("#dob").value = staff.dob;
  document.querySelector("#email").value = staff.email;
  document.querySelector("#salary").value = staff.salary;
  staff.status
    ? (document.querySelector("#radioActive").checked = true)
    : (document.querySelector("#radioInactive").checked = true);
  document.querySelector("#staffId").value = staff.id;
  document.querySelector("#create-btn").classList.add("d-none");
  document.querySelector("#update-btn").classList.remove("d-none");
  document.querySelector("#cancel-btn").classList.remove("d-none");
}

function cancel() {
  clearForm();
  document.querySelector("#create-btn").classList.remove("d-none");
  document.querySelector("#update-btn").classList.add("d-none");
  document.querySelector("#cancel-btn").classList.add("d-none");
}

function changeStatus(staffId, status) {
  let confirmed = window.confirm(
    "Are you sure to want to change staff's status?"
  );
  if (confirmed) {
    let staff = staffs.find(function (staff) {
      return staff.id == staffId;
    });
    staff.status = !status;
    localStorage.setItem(staff_data, JSON.stringify(staffs));
    renderStaff(staffs);
  }
}

function sort(direction, field){
    if(direction === "asc"){
        staffs.sort(function(staff_1, staff_2){
            console.log(staff_1[field] + " - " + staff_2[field])
            if(staff_1[field] > staff_2[field]){
                return 1;
            }
            if(staff_1[field] < staff_2[field]){
                return -1;
            }
            return 0;
        })
    }
    else{
        staffs.sort(function(staff_1, staff_2){
            console.log(staff_1[field] + " - " + staff_2[field])
            if(staff_2[field] > staff_1[field]){
                return 1;
            }
            if(staff_2[field] < staff_1[field]){
                return -1;
            }
            return 0;
        })
    }
    renderStaff(staffs);
}
function main() {
  init();
  renderStaff(staffs);
}

main();
