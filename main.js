let btn1 = document.getElementById("btn1");
let show = document.querySelector(".show");
let close = document.querySelector(".btn3 i");
let form = document.querySelector(".form");
btn1.addEventListener('click', () => {
    removedatd();
    show.classList.add("overlay");
    form.style.display = "block";
})
close.addEventListener('click', () => {
    show.classList.remove("overlay");
    form.style.display = "none";
})
/* the calling array from the values of form*/
let getstore = localStorage.getItem("store");
let datas = [];
datas = JSON.parse(getstore) || [];
let user = document.getElementById("user_name");
let phone = document.getElementById("phone");
let email = document.getElementById("email");
let home = document.getElementById("home");
let newid = datas.length;
let addtoarratname = () => {
    datas.push({
        idnumber: newid += 1,
        username: user.value,
        phonenumber: phone.value,
        emailnumber: email.value,
        homeaddress: home.value
    });
    localStorage.setItem("store", JSON.stringify(datas));
}
/* the doing of btnsave */
let btnsave = document.querySelector(".btn2");
let save = () => {
    show.classList.remove("overlay");
    form.style.display = "none";
    addtoarratname();
    valueoftable();
    localStorage.setItem("store", JSON.stringify(datas));
}
btnsave.addEventListener('click', save);

/* this function to show data fom array to table*/
let tbody = document.getElementById("tbody");
let valueoftable = () => {
    let tr = "";
    datas.forEach(element => {
        tr += ` <tr data-id=${element.idnumber}>
  <td>${element.idnumber}</td>
  <td>${element.username}</td>
  <td>${element.phonenumber}</td>
  <td>${element.emailnumber}</td>
  <td>${element.homeaddress}</td>
  <td class="red">edit</td>
  <td class="green">delete</td>
  </tr>
  `
        localStorage.setItem("store", JSON.stringify(datas));
    });
    tbody.innerHTML = tr
}
valueoftable();
let removedatd = () => {
    user.value = "";
    phone.value = "";
    email.value = "";
    home.value = "";
}
/*the edit of data*/
let x = document.getElementById("tbody");
let editaction = (e) => {
    if (e.target.classList.contains("red")) {
        let child = e.target.parentElement;
        let id = child.dataset.id;
        let index = id - 1;
        user.value = datas[index].username;
        phone.value = datas[index].phonenumber;
        email.value = datas[index].emailnumber;
        home.value = datas[index].homeaddress;
        show.classList.add("overlay");
        form.style.display = "block";

        localStorage.setItem("store", JSON.stringify(datas));

        let update = () => {

            /*the new values of modifying inputs*/
            let newobject = {
                idnumber: parseInt(id),
                username: user.value,
                phonenumber: phone.value,
                emailnumber: email.value,
                homeaddress: home.value
            }
            datas[index] = newobject;
            valueoftable();
            localStorage.setItem("store", JSON.stringify(datas));

            btnsave.removeEventListener('click', update);
            show.classList.remove("overlay");
            form.style.display = "none";
            btnsave.addEventListener('click', save);

        }
        btnsave.removeEventListener('click', save);
        btnsave.addEventListener('click', update);
    }

    if (e.target.classList.contains("green")) {
        let child = e.target.parentElement;
        let id = child.dataset.id;
        let index = parseInt(id) - 1;
        datas.splice(index, 1);
        valueoftable();
        localStorage.setItem("store", JSON.stringify(datas));
    }
}
x.addEventListener('click', editaction);


let ooo = document.getElementById("for");
ooo.addEventListener('submit', (e) => {
    e.preventDefault();
});
let search = document.getElementById("search");
let trs = document.querySelectorAll("tbody tr")

search.addEventListener('keyup', () => {
    let searchvalue = search.value.toLowerCase();
    trs.forEach(tr => {
        ooo = tr.children[1].textContent.toLowerCase();
        if (ooo.includes(searchvalue)) {
            tr.style.display = "";
        }
        else {
            tr.style.display = "none";
        }
    })
})