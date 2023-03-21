// CREATED BY PHILIP DROUBI

export class User {
    static user;
    // static #dashUser = [];
    constructor(name, email, id) {
        this.id = id;
        this.name = name;
        this.email = email;
        User.user = this;
    }
    getUser() {
        return User.user;
    }
    getUserName() {
        return User.user.name;
    }
    getUserEmal() {
        return User.user.email;
    }
    // getDashUsers() {
    //     return User.#dashUser;
    // }
    // addDashUser(users) {
    //     users.forEach(ele => {
    //         User.#dashUser.push(ele);
    //     });
    //     console.log(Users);
    // }
}