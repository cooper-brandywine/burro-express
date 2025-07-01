const AES_KEY = CryptoJS.enc.Utf8.parse("A9fD3bG7Xz2LqP1VwK6YsN5T8MhJ0C4R");

async function fetchEncryptedCSV() {
    const response = await fetch("users.csv.enc");
    const encryptedData = await response.text();

    if (!encryptedData.includes(":")) {
        throw new Error("Encrypted file format is incorrect. Expected 'IV:CIPHERTEXT'");
    }
    const [ivHex, ciphertextHex] = encryptedData.split(":");
    const iv = CryptoJS.enc.Hex.parse(ivHex);
    const ciphertext = CryptoJS.enc.Hex.parse(ciphertextHex);
    const bytes = CryptoJS.AES.decrypt(
        { ciphertext }, 
        AES_KEY, 
        { iv: iv, mode: CryptoJS.mode.CBC, padding: CryptoJS.pad.Pkcs7 }
    );

    const csvData = bytes.toString(CryptoJS.enc.Utf8);
    if (!csvData) {
        throw new Error("Decryption failed. Check your AES key, IV, or encryption mode.");
    }

    return csvData.split("\n").map(row => row.split(","));
}

async function login() {
    const username = document.getElementById("username").value.trim();
    const password = document.getElementById("password").value;

    if (!username || !password) {
        document.getElementById("login-error").innerText = "Please enter both fields.";
        return;
    }

    const hashedPassword = CryptoJS.SHA256(password).toString();
    const credentials = await fetchEncryptedCSV();

    for (const [storedUser, storedPass] of credentials) {
        if (storedUser === username && storedPass === hashedPassword) {
            localStorage.setItem("authToken", btoa(username));
            localStorage.setItem("username", username);
            document.getElementById("login-container").style.display = "none";
            document.getElementById("private-content").style.display = "block";
            return;
        }
    }

    document.getElementById("login-error").innerText = "Invalid login.";
}

function checkLogin() {
    if (localStorage.getItem("authToken")) {
        document.getElementById("login-container").style.display = "none";
        document.getElementById("private-content").style.display = "block";
    }
}

function logout() {
    localStorage.removeItem("authToken");
    localStorage.removeItem("username");
    location.reload();
}

function displayLoggedInUser() {
    const username = localStorage.getItem("username");
    if (username) {
        document.getElementById("logged-in-user").innerText = username;
    }
}

document.addEventListener("DOMContentLoaded", () => {
    checkLogin();
    displayLoggedInUser();
});
