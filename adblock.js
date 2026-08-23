document.addEventListener("DOMContentLoaded", function () {

    // Don't show the message if the visitor has already acknowledged it.
    if (localStorage.getItem("bakugandb-adblock-dismissed") === "true") {
        return;
    }

    // Create a harmless test element.
    const bait = document.createElement("div");

    bait.className = "ad ads ad-banner ad-container";
    bait.style.position = "absolute";
    bait.style.left = "-9999px";
    bait.style.width = "1px";
    bait.style.height = "1px";

    document.body.appendChild(bait);

    // Give browser extensions a moment to react.
    setTimeout(function () {

        const blocked =
            bait.offsetParent === null ||
            bait.offsetHeight === 0 ||
            bait.offsetWidth === 0;

        bait.remove();

        if (blocked) {
            showAdblockMessage();
        }

    }, 1500);
});


function showAdblockMessage() {

    // Prevent duplicate overlays.
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

    document.getElementById("bakugandb-adblock-continue")
        .addEventListener("click", function () {

            localStorage.setItem(
                "bakugandb-adblock-dismissed",
                "true"
            );

            overlay.remove();
        });
}