
function checkPassword() {
    const password = document.getElementById("passwordInput").value;
    const result = document.getElementById("passwordResult");

    if (password.length === 0) {
        result.textContent = "Please enter a sample password.";
        return;
    }

    let score = 0;

    if (password.length >= 8) score++;
    if (password.length >= 12) score++;
    if (/[a-z]/.test(password) && /[A-Z]/.test(password)) score++;
    if (/[0-9]/.test(password)) score++;
    if (/[^A-Za-z0-9]/.test(password)) score++;

    if (score <= 2) {
        result.textContent = "Strength: Weak — try a longer, more unique password.";
    } else if (score <= 3) {
        result.textContent = "Strength: Medium — improve its length and variety.";
    } else {
        result.textContent = "Strength: Strong by these basic checks.";
    }
}

const quizForm = document.getElementById("quizForm");

if (quizForm) {
    quizForm.addEventListener("submit", function(event) {
        event.preventDefault();

        const answers = {
            q1: "b",
            q2: "c",
            q3: "c",
            q4: "a",
            q5: "b"
        };

        let score = 0;
        let unanswered = 0;

        for (const question in answers) {
            const selected = quizForm.querySelector(
                'input[name="' + question + '"]:checked'
            );

            if (!selected) {
                unanswered++;
            } else if (selected.value === answers[question]) {
                score++;
            }
        }

        const result = document.getElementById("quizResult");

        if (unanswered > 0) {
            result.textContent =
                "Please answer all five questions before submitting.";
            return;
        }

        result.textContent =
            "Your Score: " + score + "/5 — " +
            (score === 5
                ? "Excellent! You know the basics of cyber safety."
                : "Good try! Review the safety tips and try again.");
    });

    quizForm.addEventListener("reset", function() {
        document.getElementById("quizResult").textContent = "";
    });
}



function showThreat(type) {
    const threats = {
        phishing: {
            title: "Phishing Attacks",
            description: "Phishing is a cyber attack in which criminals use fake emails, messages or websites to trick people into revealing sensitive information such as passwords or banking details.",
            safety: "Check the sender carefully, avoid suspicious links, and never share your OTP or password."
        },

        payment: {
            title: "Online Payment Scams",
            description: "Online payment scams involve fake payment requests, fraudulent QR codes, or people pretending to be trusted payment services.",
            safety: "Verify payment requests before approving them. Never enter your UPI PIN to receive money."
        },

        identity: {
            title: "Identity Theft",
            description: "Identity theft happens when someone uses another person's personal information without permission, often to commit fraud.",
            safety: "Protect your identity documents, use privacy settings, and share personal details only with trusted services."
        },

        malware: {
            title: "Malware",
            description: "Malware is harmful software that may damage a device, steal information, or monitor activity without permission.",
            safety: "Download apps from trusted sources, update your software, and avoid suspicious attachments."
        },

        password: {
            title: "Password Attacks",
            description: "Attackers may try to guess weak passwords or use leaked credentials to access online accounts.",
            safety: "Use long, unique passwords for each account and enable two-factor authentication."
        },

        social: {
            title: "Social Media Scams",
            description: "Scammers may use fake profiles, impersonation, or misleading messages to steal money and personal information.",
            safety: "Verify profiles, avoid suspicious links, and never send money to someone whose identity you cannot verify."
        }
    };

    const threat = threats[type];

    if (!threat) return;

    document.getElementById("popupTitle").textContent = threat.title;
    document.getElementById("popupDescription").textContent = threat.description;
    document.getElementById("popupSafety").textContent = threat.safety;

    document.getElementById("threatPopup").style.display = "flex";
}

function closeThreat() {
    document.getElementById("threatPopup").style.display = "none";
}
