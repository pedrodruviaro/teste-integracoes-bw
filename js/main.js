const btnOpenForm = document.querySelector(".btn-mobile")
const btnCloseForm = document.querySelector(".close-form")
const form = document.querySelector(".form")

btnOpenForm.addEventListener("click", (e) => {
    form.classList.add("open")
})

btnCloseForm.addEventListener("click", (e) => {
    form.classList.remove("open")
})

//-------------------------  Change select field colors -------------------------
;(() => {
    const selects = Array.from(document.querySelectorAll("select"))
    const CSS_VARIABLES = getComputedStyle(document.documentElement)
    const placeholderColor = CSS_VARIABLES.getPropertyValue("--clr-placeholder")
    const fieldColor = CSS_VARIABLES.getPropertyValue("--clr-field")

    selects.forEach((select) => {
        select.style.color = placeholderColor

        select.addEventListener("change", (e) => {
            if (e.target.value === "" || e.target.value === "nulo") {
                select.style.color = placeholderColor
            } else {
                select.style.color = fieldColor
            }
        })
    })
})()

// ACCORDEON
const accordeons = Array.from(document.querySelectorAll("[data-element='accordeon']"))
if (accordeons) {
    accordeons.forEach((acc, i) => {
        const main = acc.querySelector("main")
        const id = Number(acc.getAttribute("data-element-id"))
        const mainHeight = main.scrollHeight
        const button = acc.querySelector("button")
        const header = acc.querySelector("header")

        header.addEventListener("click", (e) => {
            accordeons.forEach((accTwo, i) => {
                if (id === i) {
                    return
                }

                accTwo.setAttribute("aria-expanded", "false")
                accTwo.classList.remove("active")
                accTwo.querySelector("main").style.maxHeight = `0px`
            })

            const accExpanded = acc.getAttribute("aria-expanded")

            if (accExpanded === "false") {
                acc.setAttribute("aria-expanded", "true")
                acc.classList.add("active")
                main.style.maxHeight = `${mainHeight}px`
            } else {
                acc.setAttribute("aria-expanded", "false")
                acc.classList.remove("active")
                main.style.maxHeight = `0px`
            }
        })
    })
}

const modulesCard = Array.from(document.querySelectorAll("[data-element='modules-card']"))
if (modulesCard) {
    modulesCard.forEach((card) => {
        const titleContent = card.querySelector("h3").textContent
        card.querySelector("p").setAttribute("data-title", titleContent)
    })
}
