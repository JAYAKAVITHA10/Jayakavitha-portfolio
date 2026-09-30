const Contact = require("../models/Contact");
const { Resend } = require("resend");

const resend = new Resend(process.env.RESEND_API_KEY);

const escapeHtml = (value) => {
    return String(value)
        .replace(/&/g, "&amp;")
        .replace(/</g, "&lt;")
        .replace(/>/g, "&gt;")
        .replace(/"/g, "&quot;")
        .replace(/'/g, "&#039;");
};

const createMessage = async (req, res) => {
    console.log("CONTACT REQUEST RECEIVED");

    try {
        const { name, email, message } = req.body;

        // Validate required fields
        if (!name || !email || !message) {
            return res.status(400).json({
                success: false,
                message: "Name, email and message are required."
            });
        }

        // Trim input
        const cleanName = name.trim();
        const cleanEmail = email.trim().toLowerCase();
        const cleanMessage = message.trim();

        // Validate lengths
        if (cleanName.length > 100) {
            return res.status(400).json({
                success: false,
                message: "Name is too long."
            });
        }

        if (cleanEmail.length > 150) {
            return res.status(400).json({
                success: false,
                message: "Email is too long."
            });
        }

        if (cleanMessage.length > 5000) {
            return res.status(400).json({
                success: false,
                message: "Message is too long."
            });
        }

        // Basic email validation
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

        if (!emailRegex.test(cleanEmail)) {
            return res.status(400).json({
                success: false,
                message: "Please enter a valid email address."
            });
        }

        // Save message to MongoDB
        const savedMessage = await Contact.create({
            name: cleanName,
            email: cleanEmail,
            message: cleanMessage
        });

        // Escape content before putting it into HTML
        const safeName = escapeHtml(cleanName);
        const safeEmail = escapeHtml(cleanEmail);
        const safeMessage = escapeHtml(cleanMessage);

        // Send notification email using Resend
        const { data, error } = await resend.emails.send({
            from: "Portfolio Contact <onboarding@resend.dev>",
            to: [process.env.ADMIN_EMAIL],
            replyTo: cleanEmail,
            subject: `New Portfolio Message from ${cleanName}`,
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

                <hr>

                <p>
                    Message ID: ${savedMessage._id}
                </p>
            `
        });

        if (error) {
    console.error("Resend email error:");
    console.error(error);

    return res.status(500).json({
        success: false,
        message: "Your message was saved, but the email notification could not be sent."
    });
}


        if (error) {
            console.error("Resend email error:");
            console.error(error);

            // Message is already safely stored in MongoDB.
            return res.status(201).json({
                success: true,
                message: "Your message was received successfully."
            });
        }

        console.log("Email sent successfully:", data.id);

        return res.status(201).json({
            success: true,
            message: "Thank you! Your message has been sent successfully."
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

const getMessages = async (req, res) => {
    try {
        const messages = await Contact.find()
            .sort({ createdAt: -1 });

        return res.status(200).json({
            success: true,
            count: messages.length,
            data: messages
        });

    } catch (error) {
        console.error("Get messages error:");
        console.error(error);

        return res.status(500).json({
            success: false,
            message: "Unable to retrieve messages."
        });
    }
};

const deleteMessage = async (req, res) => {
    try {
        const { id } = req.params;

        const deletedMessage = await Contact.findByIdAndDelete(id);

        if (!deletedMessage) {
            return res.status(404).json({
                success: false,
                message: "Message not found."
            });
        }

        return res.status(200).json({
            success: true,
            message: "Message deleted successfully."
        });

    } catch (error) {
        console.error("Delete message error:");
        console.error(error);

        return res.status(500).json({
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