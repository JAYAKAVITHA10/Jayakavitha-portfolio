const token = localStorage.getItem("adminToken");


// ===============================
// CHECK LOGIN
// ===============================

if (!token) {
    window.location.href = "index.html";
}


// ===============================
// ELEMENTS
// ===============================

const messageList =
    document.getElementById("messageList");

const messageCount =
    document.getElementById("messageCount");

const logoutBtn =
    document.getElementById("logoutBtn");


// ===============================
// LOAD MESSAGES
// ===============================

async function loadMessages() {

    try {

        const response = await fetch(
            "https://jayakavitha-portfolio-api.onrender.com/api/contact",
            {
                method: "GET",

                headers: {
                    Authorization: `Bearer ${token}`
                }
            }
        );

        if (response.status === 401) {

            localStorage.removeItem("adminToken");

            window.location.href = "index.html";

            return;
        }

        const data = await response.json();

        if (!data.success) {

            messageList.innerHTML =
                `<p class="empty">${data.message}</p>`;

            return;
        }

        messageCount.textContent =
            data.count;

        if (data.data.length === 0) {

            messageList.innerHTML =
                `<p class="empty">No messages yet.</p>`;

            return;
        }

        messageList.innerHTML = "";

        data.data.forEach((message) => {

            const card =
                document.createElement("div");

            card.className = "message-card";

            card.innerHTML = `
                <h3>${escapeHtml(message.name)}</h3>

                <p class="email">
                    ${escapeHtml(message.email)}
                </p>

                <p class="message">
                    ${escapeHtml(message.message)}
                </p>

                <p class="date">
                    ${new Date(message.createdAt).toLocaleString()}
                </p>

                <button
                    class="delete-btn"
                    onclick="deleteMessage('${message._id}')">
                    Delete
                </button>
            `;

            messageList.appendChild(card);

        });

    } catch (error) {

        console.error(error);

        messageList.innerHTML =
            `<p class="empty">
                Unable to load messages.
            </p>`;
    }
}


// ===============================
// DELETE MESSAGE
// ===============================

async function deleteMessage(id) {

    const confirmed =
        confirm("Delete this message?");

    if (!confirmed) {
        return;
    }

    try {

        const response = await fetch(
            `https://jayakavitha-portfolio-api.onrender.com/api/contact/${id}`,
            {
                method: "DELETE",

                headers: {
                    Authorization: `Bearer ${token}`
                }
            }
        );

        const data = await response.json();

        if (!response.ok) {

            alert(
                data.message ||
                "Unable to delete message."
            );

            return;
        }

        loadMessages();

    } catch (error) {

        console.error(error);

        alert("Unable to connect to the server.");
    }
}


// ===============================
// LOGOUT
// ===============================

logoutBtn.addEventListener("click", () => {

    localStorage.removeItem("adminToken");

    window.location.href = "index.html";
});


// ===============================
// HTML ESCAPE
// ===============================

function escapeHtml(value) {

    const div =
        document.createElement("div");

    div.textContent = value;

    return div.innerHTML;
}


// ===============================
// INITIAL LOAD
// ===============================

loadMessages();