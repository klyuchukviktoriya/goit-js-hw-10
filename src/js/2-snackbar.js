import iziToast from "izitoast";
import "izitoast/dist/css/iziToast.min.css";

const form = document.querySelector(".form");

form.addEventListener("submit", function (event) {
    event.preventDefault();

    const input = document.querySelector('input[name="delay"]');
    const state = document.querySelector('input[name="state"]:checked');

    const banner = new Promise((resolve, reject) => {
        const delay = input.value;
        if (state.value === "fulfilled") {
            setTimeout(() => {
                resolve(delay);
            }, delay);
        }
        if (state.value === "rejected") {
            setTimeout(() => {
                reject(delay);
            }, delay);
        }
    });

    banner.then((delay) => {
        iziToast.success({
            position: "topRight",
            message: `✅ Fulfilled promise in ${delay}ms`,
            icon: "",
        });

        input.value = "";
    }).catch((delay) => {
        iziToast.error({
            position: "topRight",
            message: `❌ Rejected promise in ${delay}ms`,
            icon: "",
        });

        input.value = "";
    });
});
