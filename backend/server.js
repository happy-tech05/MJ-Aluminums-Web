const express = require("express");
const nodemailer = require("nodemailer");
const cors = require("cors");

const app = express();
app.use(cors());
app.use(express.json());

app.post("/send", async (req, res) => {
    const { contact, email, message } = req.body;

    try {
        const transporter = nodemailer.createTransport({
            service: "gmail",
            auth: {
                user: "ramaphokohappy@gmail.com",
                pass: "drdzcjsdnuklemez"
            }
        });

        await transporter.sendMail({
            from: "ramaphokohappy@gmail.com",
            to: "ramaphokohappy@gmail.com",
            subject: "New Order / Contact Message",
            text: `Contact: ${contact}\nEmail: ${email}\n\nMessage:\n${message}`
        });

        res.json({ message: "Message sent successfully!" });
    } catch (err) {
        res.json({ message: "Failed to send message" });
    }
});

app.listen(3000, () => console.log("Server running on port 3000"));
