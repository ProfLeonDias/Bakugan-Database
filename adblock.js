document.addEventListener("DOMContentLoaded", function () {

    if (localStorage.getItem("bakugandb-adblock-dismissed") === "true") {
        return;
    }

    const bait = document.createElement("div");

    bait.className = "adsbox";
    bait.setAttribute("aria-hidden", "true");

    bait.style.position = "absolute";
    bait.style.left = "-10000px";
    bait.style.top = "-10000px";
    bait.style.width = "1px";
    bait.style.height = "1px";
    bait.style.pointerEvents = "none";

    document.body.appendChild(bait);

    setTimeout(function () {

        const blocked =
            bait.offsetWidth === 0 ||
            bait.offsetHeight === 0 ||
            getComputedStyle(bait).display === "none";

        bait.remove();

        if (blocked) {
            showAdblockMessage();
        }

    }, 1000);
});


function showAdblockMessage() {

    if (document.getElementById("bakugandb-adblock-overlay")) {
        return;
    }

    const overlay = document.createElement("div");

    overlay.id = "bakugandb-adblock-overlay";

    overlay.innerHTML = `
        <div class="bakugandb-adblock-box">

            <h2>Please Disable Your Ad Blocker</h2>

            <p>
                BakuganDB is a free resource maintained through advertising
                revenue and Leon's hard work. Ads help support the hosting,
                development, and continued expansion of the database.
            </p>

            <p>
                Please disable your ad blocker for BakuganDB.
            </p>

            <button id="bakugandb-adblock-continue">
                I've Disabled My Ad Blocker
            </button>

        </div>
    `;

    document.body.appendChild(overlay);

    document
        .getElementById("bakugandb-adblock-continue")
        .addEventListener("click", function () {

            localStorage.setItem(
                "bakugandb-adblock-dismissed",
                "true"
            );

            overlay.remove();
        });
}