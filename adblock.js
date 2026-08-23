document.addEventListener("DOMContentLoaded", function () {

    // Don't show the message if the visitor has already acknowledged it.
    if (localStorage.getItem("bakugandb-adblock-dismissed") === "true") {
        return;
    }

    // Give AdSense time to initialize and render.
    setTimeout(function () {

        const ads = [...document.querySelectorAll(".adsbygoogle")];

        // No AdSense elements found.
        if (ads.length === 0) {
            showAdblockMessage();
            return;
        }

        // Find AdSense ads that Google says are filled.
        const filledAds = ads.filter(ad =>
            ad.getAttribute("data-ad-status") === "filled"
        );

        // If Google hasn't finished processing the ads yet,
        // don't incorrectly accuse the visitor of using an ad blocker.
        if (filledAds.length === 0) {
            return;
        }

        // Check whether at least one filled ad actually rendered.
        const renderedAd = filledAds.some(ad => {

            const rect = ad.getBoundingClientRect();

            return rect.width > 0 && rect.height > 0;
        });

        // If Google says the ads are filled but none actually
        // rendered, an ad blocker is very likely interfering.
        if (!renderedAd) {
            showAdblockMessage();
        }

    }, 5000);
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