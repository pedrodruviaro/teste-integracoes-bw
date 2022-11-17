;(function () {
    const fields = Array.from(document.querySelectorAll("[data-field]"))
    const buttonSubmit = document.querySelector(".form-submit")

    const validations = {
        email: function (value) {
            if (emailCorporativo(value) && validacaoEmail(value)) {
                return true
            } else {
                return false
            }
        },
        phone: function (value) {
            if (value.length < 13) {
                return false
            } else if (
                value == "(99) 9999-9999" ||
                value == "(00) 0000-0000" ||
                value == "(11) 1111-1111" ||
                value == "(22) 2222-2222" ||
                value == "(33) 3333-3333" ||
                value == "(44) 4444-4444" ||
                value == "(55) 5555-5555" ||
                value == "(66) 6666-6666" ||
                value == "(77) 7777-7777" ||
                value == "(88) 8888-8888" ||
                value == "(99) 99999-9999" ||
                value == "(00) 00000-0000" ||
                value == "(11) 11111-1111" ||
                value == "(22) 22222-2222" ||
                value == "(33) 33333-3333" ||
                value == "(44) 44444-4444" ||
                value == "(55) 55555-5555" ||
                value == "(66) 66666-6666" ||
                value == "(77) 77777-7777" ||
                value == "(88) 88888-8888"
            ) {
                return false
            } else {
                return true
            }
        },
        select: function (value) {
            if (value == "" || value == "nulo") {
                return false
            } else {
                return true
            }
        },
        consent: function (field) {
            if (!field.checked) {
                return false
            } else {
                return true
            }
        },
        text: function (value) {
            if (value.trim() === "") {
                return false
            } else {
                return true
            }
        },
        number: function (value) {
            if (value <= 0) {
                return false
            } else {
                return true
            }
        },
    }

    buttonSubmit.addEventListener("click", (e) => {
        let inputErrors = []

        for (let i = 0; i < fields.length; i++) {
            const field = fields[i]
            const fieldName = field.name
            const fieldValue = field.value
            const fieldType = field.getAttribute("data-field")
            const validationMessage = field.getAttribute("data-message")

            if (fieldType === "false") {
                continue
            }

            if (fieldType === "consent") {
                if (!validations[fieldType](field)) {
                    showPopUpValidation(field, validationMessage)
                    inputErrors.push(fieldName)
                    break
                } else {
                    removeArrayItem(fieldName, inputErrors)
                    continue
                }
            }

            if (!validations[fieldType](fieldValue)) {
                showPopUpValidation(field, validationMessage)
                inputErrors.push(fieldName)
                break
            } else {
                removeArrayItem(fieldName, inputErrors)
                continue
            }
        }

        console.log(inputErrors)

        if (inputErrors.length >= 1) {
            return
        } else {
            const data = []

            data.push(
                { name: "identificador", value: "bw-teste-integracao" },
                {
                    name: "token_rdstation",
                    value: "d6b1a3de54dc354a8ff2e592ceaef3b4",
                },
                { name: "privacy_data[communications]", value: "1" },
                {
                    name: "form_url",
                    value: location.href,
                }
            )

            fields.forEach((field) => {
                const fieldType = field.getAttribute("data-field")

                if (fieldType == "consent") {
                    return
                }

                if (fieldType === "false") {
                    if (
                        field.value.trim() === "" ||
                        field.value == "" ||
                        field.value === "nulo"
                    ) {
                        return
                    } else {
                        data.push({ name: field.name, value: field.value })
                    }
                } else {
                    data.push({ name: field.name, value: field.value })
                }
            })

            console.log("ENVIOU O FORM")
            console.log(data)

            RdIntegration.post(data)

            buttonSubmit.style.pointerEvents = "none"
            buttonSubmit.textContent = "Enviando..."

            setTimeout(() => {
                window.location.href = "./agradecimento.html"
            }, 1500)

            return true
        }
    })

    // ------------------------- Swal Fire popup -------------------------
    function showPopUpValidation(field, message) {
        Swal.fire({
            icon: "warning",
            text: message,
            timer: 2500,
            onAfterClose: () => {
                field.focus()
            },
        })
    }

    // ------------------------- Email validation -------------------------
    function validacaoEmail(email) {
        var verifica =
            /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
        return verifica.test(String(email).toLowerCase())
    }

    function emailCorporativo(email) {
        const invalidDomains = [
            "@gmail.",
            "@yahoo.",
            "@hotmail.",
            "@live.",
            "@aol.",
            "@outlook.",
            "@terra.",
            "@bol.",
            "@uol.",
        ]

        for (let i = 0; i < invalidDomains.length; i++) {
            const domain = invalidDomains[i]
            if (email.indexOf(domain) != -1) {
                return false
            }
        }
        return true
    }

    // ------------------------- Validation Special Characters -------------------------
    function validateSpecialCharacters(field) {
        if (!/^[a-záàâãéèêíïóôõöúçñ ]+$/i.test(field.value)) {
            return false
        } else {
            return true
        }
    }

    // ------------------------- Phone Mask -------------------------
    const phoneField = document.querySelector("[data-field='phone']")

    if (phoneField) {
        phoneField.addEventListener("input", handlePhoneInput, false)
    }

    function handlePhoneInput(e) {
        e.target.value = phoneMask(e.target.value)
    }

    function phoneMask(phone) {
        return phone
            .replace(/\D/g, "")
            .replace(/^(\d)/, "($1")
            .replace(/^(\(\d{2})(\d)/, "$1) $2")
            .replace(/(\d{5})(\d{1,4})/, "$1-$2")
            .replace(/(-\d{4})\d+?$/, "$1")
    }

    // ------------------------- Remove item from array -------------------------
    function removeArrayItem(item, array) {
        const index = array.indexOf(item)
        if (index > -1) {
            array.splice(index, 1)
        }
    }
})()
