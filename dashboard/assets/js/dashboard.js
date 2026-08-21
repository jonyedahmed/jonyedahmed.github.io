/* =====================================================
   SEO COMMAND CENTER
   Jonayed Ahmed
   Common Dashboard JavaScript
===================================================== */


/* =====================================================
   TOAST
===================================================== */

function showToast(message) {

    let toast = document.getElementById("toast");

    if (!toast) {

        toast = document.createElement("div");

        toast.id = "toast";

        toast.className = "toast";

        document.body.appendChild(toast);
    }

    toast.textContent = message;

    toast.classList.add("show");

    clearTimeout(window.toastTimer);

    window.toastTimer = setTimeout(function () {

        toast.classList.remove("show");

    }, 2500);
}


window.showLoginMessage = function(message) {

    const messageBox =
        document.getElementById("loginMessage");

    if (!messageBox) return;

    messageBox.textContent = message;

    messageBox.className =
        "login-message";

    setTimeout(function () {

        messageBox.textContent = "";

    }, 3500);
};


/* =====================================================
   LOGIN
===================================================== */

const loginForm =
    document.getElementById("loginForm");


if (loginForm) {

    /*
       DEMO LOGIN ONLY

       Username:
       admin

       Password:
       Jonayed@2026

       IMPORTANT:
       This is NOT secure authentication.
       Do not use this for real private data.
    */


    loginForm.addEventListener(
        "submit",
        function(event) {

            event.preventDefault();

            const username =
                document.getElementById("username").value.trim();

            const password =
                document.getElementById("password").value;

            const remember =
                document.getElementById("remember").checked;

            const message =
                document.getElementById("loginMessage");


            const validUsername =
                "admin";

            const validPassword =
                "Jonayed@2026";


            if (
                username === validUsername &&
                password === validPassword
            ) {

                message.textContent =
                    "Login successful. Opening dashboard...";

                message.className =
                    "login-message success";


                if (remember) {

                    localStorage.setItem(
                        "seoDashboardRemember",
                        "true"
                    );

                }


                sessionStorage.setItem(
                    "seoDashboardLoggedIn",
                    "true"
                );


                setTimeout(function() {

                    window.location.href =
                        "index.html";

                }, 600);


            } else {

                message.textContent =
                    "Invalid username or password.";

                message.className =
                    "login-message error";

            }

        }
    );
}


/* =====================================================
   PASSWORD SHOW / HIDE
===================================================== */

const togglePassword =
    document.getElementById("togglePassword");


if (togglePassword) {

    togglePassword.addEventListener(
        "click",
        function() {

            const password =
                document.getElementById("password");


            if (
                password.type === "password"
            ) {

                password.type = "text";

                togglePassword.textContent =
                    "Hide";

            } else {

                password.type = "password";

                togglePassword.textContent =
                    "Show";

            }

        }
    );
}


/* =====================================================
   DASHBOARD ELEMENTS
===================================================== */

const sidebar =
    document.getElementById("sidebar");

const menuButton =
    document.getElementById("menuBtn");


if (menuButton && sidebar) {

    menuButton.addEventListener(
        "click",
        function() {

            sidebar.classList.toggle("open");

        }
    );

}


/* =====================================================
   CLOSE MOBILE SIDEBAR
===================================================== */

document
    .querySelectorAll(".nav-link")
    .forEach(function(link) {

        link.addEventListener(
            "click",
            function() {

                if (sidebar) {

                    sidebar.classList.remove(
                        "open"
                    );

                }

            }
        );

    });


/* =====================================================
   DARK MODE
===================================================== */

const themeButton =
    document.getElementById("themeBtn");


function applySavedTheme() {

    const theme =
        localStorage.getItem(
            "seoDashboardTheme"
        );


    if (theme === "dark") {

        document.body.classList.add(
            "dark-mode"
        );

    }

}


applySavedTheme();


if (themeButton) {

    themeButton.addEventListener(
        "click",
        function() {

            document.body.classList.toggle(
                "dark-mode"
            );


            const dark =
                document.body.classList.contains(
                    "dark-mode"
                );


            localStorage.setItem(
                "seoDashboardTheme",
                dark ? "dark" : "light"
            );


            showToast(
                dark
                    ? "Dark mode enabled"
                    : "Light mode enabled"
            );

        }
    );

}


/* =====================================================
   VIEW WEBSITE
===================================================== */

const siteButton =
    document.getElementById("siteButton");


if (siteButton) {

    siteButton.addEventListener(
        "click",
        function() {

            window.open(
                "https://jonyedahmed420-rgb.github.io/",
                "_blank"
            );

        }
    );

}


/* =====================================================
   REFRESH
===================================================== */

const refreshButton =
    document.getElementById("refreshBtn");


if (refreshButton) {

    refreshButton.addEventListener(
        "click",
        function() {

            refreshButton.style.transform =
                "rotate(360deg)";

            setTimeout(function() {

                refreshButton.style.transform =
                    "";

            }, 500);


            showToast(
                "Dashboard refreshed."
            );

        }
    );

}


/* =====================================================
   CONNECT DATA
===================================================== */

const connectButton =
    document.getElementById("connectButton");


if (connectButton) {

    connectButton.addEventListener(
        "click",
        function() {

            showToast(
                "GSC and GA4 integration will be connected in the next step."
            );

        }
    );

}


/* =====================================================
   LOGOUT
===================================================== */

const logoutButton =
    document.getElementById("logoutBtn");


if (logoutButton) {

    logoutButton.addEventListener(
        "click",
        function() {

            sessionStorage.removeItem(
                "seoDashboardLoggedIn"
            );


            window.location.href =
                "login.html";

        }
    );

}


/* =====================================================
   ACTIVE SIDEBAR LINK
===================================================== */

(function() {

    const currentPage =
        window.location.pathname
            .split("/")
            .pop();


    document
        .querySelectorAll(".nav-link")
        .forEach(function(link) {

            const href =
                link.getAttribute("href");


            if (
                href &&
                href.endsWith(currentPage)
            ) {

                document
                    .querySelectorAll(".nav-link")
                    .forEach(function(item) {

                        item.classList.remove(
                            "active"
                        );

                    });


                link.classList.add(
                    "active"
                );

            }

        });

})();


/* =====================================================
   REMEMBER LOGIN NOTICE
===================================================== */

(function() {

    if (!loginForm) return;


    const remembered =
        localStorage.getItem(
            "seoDashboardRemember"
        );


    if (remembered === "true") {

        const rememberBox =
            document.getElementById(
                "remember"
            );


        if (rememberBox) {

            rememberBox.checked = true;

        }

    }

})();


/* =====================================================
   PREVENT DEMO DASHBOARD ACCESS
=====================================================

   NOTE:
   This is only a frontend convenience check.
   It is NOT real security.

===================================================== */

(function() {

    if (!document.querySelector(".app")) {
        return;
    }


    const isLoggedIn =
        sessionStorage.getItem(
            "seoDashboardLoggedIn"
        );


    /*
       Temporarily disabled so that
       GitHub Pages navigation remains easy
       while building the dashboard.

       Real authentication will be added
       with a backend later.
    */

})();
