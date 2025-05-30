import { useState } from "react"

function ToggleMode() {
    const [theme, setTheme] = useState<string>(() => {
        let currentTheme = JSON.parse(localStorage.getItem("theme")!) || "light"

        const html = document.documentElement
        html.setAttribute("data-theme", currentTheme)

        return currentTheme
    })

    function changeTheme():void {
        const html = document.documentElement
        const currentTheme = html.getAttribute("data-theme")

        if (currentTheme === "light") {
            setTheme("dark")

            html.setAttribute("data-theme", "dark")
            localStorage.setItem("theme", JSON.stringify("dark"))
        }
        else {
            setTheme("light")

            html.setAttribute("data-theme", "light")
            localStorage.setItem("theme", JSON.stringify("light"))
        }
    }

    return (
        <button className={`w-10 h-10 2xl:w-12 2xl:h-12 bg-primary rounded-md outline-none cursor-pointer`} onClick={() => changeTheme()} title="Toggle Mode">
            <i className={`${theme === "light" ? "ri-moon-clear-line" : "ri-sun-line"} text-2xl 2xl:text-3xl text-white`}/>
        </button>
    )
}

export default ToggleMode