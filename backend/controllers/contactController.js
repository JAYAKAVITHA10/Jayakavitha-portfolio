const Contact = require("../models/Contact");
const nodemailer = require("nodemailer");

const transporter = nodemailer.createTransport({
    service: "gmail",
    auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASS
    }
});

transporter.verify(function (error, success) {
    if (error) {
        console.error("EMAIL CONFIGURATION ERROR:");
        console.error(error);
    } else {
        console.log("Email server is ready to send messages.");
    }
});

const escapeHtml = (value) => {
    return String(value)
        .replace(/&/g, "&amp;")
        .replace(/</g, "&lt;")
        .replace(/>/g, "&gt;")
        .replace(/"/g, "&quot;")
        .replace(/'/g, "&#039;");
};

// ===============================
// CREATE CONTACT MESSAGE
// ===============================

const createMessage = async (req, res) => {

    console.log("CONTACT REQUEST RECEIVED");

    try {

        const { name, email, message } = req.body;

        // Validation
        if (!name || !email || !message) {
            return res.status(400).json({
                success: false,
                message: "All fields are required."
            });
        }

        const safeName = escapeHtml(name.trim());
const safeEmail = escapeHtml(email.trim());
const safeMessage = escapeHtml(message.trim());

        // Save message to MongoDB
        const contact = await Contact.create({
            name: name.trim(),
            email: email.trim(),
            message: message.trim()
        });

        // Email notification
        const mailOptions = {
            from: process.env.EMAIL_USER,
            to: process.env.EMAIL_USER,
            replyTo: email.trim(),

            subject: `New Portfolio Message from ${name.trim()}`,

            text: `
You received a new message from your portfolio.

Name: ${name.trim()}
Email: ${email.trim()}

Message:
${message.trim()}
            `,

            html: `
    <h2>New Portfolio Message</h2>

    <p>
        <strong>Name:</strong>
        ${safeName}
    </p>

    <p>
        <strong>Email:</strong>
        ${safeEmail}
    </p>

    <p>
        <strong>Message:</strong>
    </p>

    <p>
        ${safeMessage.replace(/\n/g, "<br>")}
    </p>
`
        };

        await transporter.sendMail(mailOptions);

        return res.status(201).json({
            success: true,
            message: "Thank you! Your message has been sent successfully.",
            data: {
                id: contact._id,
                name: contact.name,
                email: contact.email,
                message: contact.message
            }
        });

    } catch (error) {

        console.error("Contact form error:");
        console.error(error);

        return res.status(500).json({
            success: false,
            message: "Unable to send your message. Please try again."
        });
    }
};


// ===============================
// GET ALL CONTACT MESSAGES
// ===============================

const getMessages = async (req, res) => {

    try {

        const messages = await Contact
            .find()
            .sort({ createdAt: -1 });

        res.status(200).json({
            success: true,
            count: messages.length,
            data: messages
        });

    } catch (error) {

        console.error("Get messages error:");
        console.error(error);

        res.status(500).json({
            success: false,
            message: "Unable to retrieve messages."
        });
    }
};


// ===============================
// DELETE CONTACT MESSAGE
// ===============================

const deleteMessage = async (req, res) => {

    try {

        const { id } = req.params;

        const deletedMessage =
            await Contact.findByIdAndDelete(id);

        if (!deletedMessage) {
            return res.status(404).json({
                success: false,
                message: "Message not found."
            });
        }

        res.status(200).json({
            success: true,
            message: "Message deleted successfully."
        });

    } catch (error) {

        console.error("Delete message error:");
        console.error(error);

        res.status(500).json({
            success: false,
            message: "Unable to delete message."
        });
    }
};


module.exports = {
    createMessage,
    getMessages,
    deleteMessage
};