export function customAlert() {
    const alertBtn = document.getElementById("alertBtn");
    const alertDialog = document.getElementById("customAlert");

    alertBtn.addEventListener("click", () => {
        alertDialog.showModal();
    });
}

export function customConfirm() {
    const confirmBtn = document.getElementById("confirmBtn");
    const confirmDialog = document.getElementById("customConfirm");
    const cancelBtn1 = document.getElementById("cancelBtn1");
    const okBtn1 = document.getElementById("okBtn1");
    
    confirmBtn.addEventListener("click", () => {
        confirmDialog.showModal();
    });

    okBtn1.addEventListener("click", () => {
        document.getElementById("functionResult").innerText = "The value returned by the confirm method is : true";
    });

    cancelBtn1.addEventListener("click", () => {
        document.getElementById("functionResult").innerText = "The value returned by the confirm method is : false";
    });

}

export function customPrompt() {
    const promptBtn = document.getElementById("promptBtn");
    const promptDialog = document.getElementById("customPrompt");
    const cancelBtn2 = document.getElementById("cancelBtn2");
    const okBtn2 = document.getElementById("okBtn2");
    
    promptBtn.addEventListener("click", () => {
        promptDialog.showModal();
    });

    okBtn2.addEventListener("click", () => {
        let userName = document.getElementById("userName").value;
        console.log(userName);

        if (userName == "" || userName == null) {
            document.getElementById("functionResult").innerText = "User didn't enter anything";
        }
        else {
            let cleaned = DOMPurify.sanitize(userName);
            document.getElementById("functionResult").innerText = `Prompt Result: ${cleaned}`;
        }
    });

    cancelBtn2.addEventListener("click", () => {
        document.getElementById("functionResult").innerText = "User didn't enter anything";
    });
}