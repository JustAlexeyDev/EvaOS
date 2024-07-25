export default class PasswordChecker {
    private storedPassword: string | null;

    constructor() {
        this.storedPassword = localStorage.getItem("password");
    }

    checkPassword(password: string): boolean {
        return password === this.storedPassword;
    }
}