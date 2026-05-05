const USERS = "users";

function getUsers() {
    return JSON.parse(localStorage.getItem(USERS)) || [];
}

function saveUsers(users) {
    localStorage.setItem(USERS, JSON.stringify(users));
}

// default admin
if (!getUsers().find(u => u.username === "admin")) {
    saveUsers([{username:"admin", password:"admin123"}]);
}

// signup
signupForm.onsubmit = e => {
    e.preventDefault();

    let users = getUsers();

    users.push({
        username: signupUsername.value,
        password: signupPassword.value
    });

    saveUsers(users);
    alert("Account created");
};

// login
loginForm.onsubmit = e => {
    e.preventDefault();

    let users = getUsers();

    let user = users.find(u =>
        u.username === loginUsername.value &&
        u.password === loginPassword.value
    );

    if (user) {
        window.location.href = "dashboard.html";
    } else {
        alert("Wrong login");
    }
};