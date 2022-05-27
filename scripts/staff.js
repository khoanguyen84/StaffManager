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

let staffs = [
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

function renderStaff() {
    let htmls = staffs.map(function (staff) {
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
            <button class="btn btn-success btn-sm">Edit</button>
            <button class="btn btn-secondary btn-sm">Inactive</button>
            <button class="btn btn-danger btn-sm" onclick='remove(${staff.id
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
    renderStaff();
    clearForm();
}

function clearForm() {
    document.querySelector("#fullname").value = "";
    document.querySelector("#avatar").value = "";
    document.querySelector("#dob").value = "";
    document.querySelector("#email").value = "";
    document.querySelector("#salary").value = "";
    document.querySelector("input[name=status]").checked = true;
}

function remove(staffId) {
    let confirmed = window.confirm("Are you sure to want to remove this staff?");
    if (confirmed) {
        let posistion = staffs.findIndex(function (staff) {
            return staff.id == staffId;
        });
        staffs.splice(posistion, 1);
        renderStaff();
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
function main() {
    renderStaff();
}

main();
