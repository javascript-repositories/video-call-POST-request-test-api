const sendButton = document.querySelector("button");
const nameInput = document.querySelector("#name");
const jobInput = document.querySelector("#job");

const form = document.querySelector("form");
const loader = document.querySelector(".loader");
const responseDiv = document.querySelector("#response");

sendButton.addEventListener("click", sendUser);

async function sendUser() {
    loader.style.display = "block";
    form.style.opacity = 0;

    const name = nameInput.value;
    const job = jobInput.value;

    const data = {
        "name": name,
        "job": job,
    };

    try {
        const response = await fetch("https://reqres.in/api/users", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(data),
        });

        const result = await response.json();
        console.log("result", result);

        responseDiv.innerHTML = "User sent";
        nameInput.value = "";
        jobInput.value = "";

    } catch (error) {
        console.log(error);
        responseDiv.innerHTML = "nah";
    } finally {
        loader.style.display = "none";
        form.style.opacity = 1;
    }
}

// validation code
nameInput.addEventListener("keyup", validateForm);
jobInput.addEventListener("keyup", validateForm);

function validateForm() {
    let disabled = false;

    if (!checkInputLength(nameInput.value, 3) || !checkInputLength(jobInput.value, 3)) {
        disabled = true;
    }
    sendButton.disabled = disabled;
}

function checkInputLength(value, length) {
    const trimmedValue = value.trim();

    if (trimmedValue.length >= length) {
        return true;
    } else {
        return false;
    }
}
