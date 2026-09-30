const loginForm = document.getElementById("loginForm");
const loginMessage = document.getElementById("loginMessage");

loginForm.addEventListener("submit", async (event) => {

    event.preventDefault();

    const email =
        document.getElementById("email").value.trim();

    const password =
        document.getElementById("password").value;

    loginMessage.textContent = "Logging in...";

    try {

        const response = await fetch(
            "http://127.0.0.1:5000/api/auth/login",
            {
                method: "POST",

                headers: {
                    "Content-Type": "application/json"
                },

                body: JSON.stringify({
                    email,
                    password
                })
            }
        );

        const data = await response.json();

        if (!response.ok) {

            loginMessage.textContent =
                data.message || "Login failed.";

            return;
        }

        localStorage.setItem(
            "adminToken",
            data.token
        );

        window.location.href = "dashboard.html";

    } catch (error) {

        console.error(error);

        loginMessage.textContent =
            "Unable to connect to the server.";
    }
});