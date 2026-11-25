

// Reveal sections gently as they enter the screen
// Scroll reveal animation
// Scroll reveal animation
const revealItems = document.querySelectorAll(".reveal");

if ("IntersectionObserver" in window) {
  const revealObserver = new IntersectionObserver(
    (entries, observer) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add("is-visible");
          observer.unobserve(entry.target);
        }
      });
    },
    { threshold: 0.12 }
  );

  revealItems.forEach((item) => {
    revealObserver.observe(item);
  });
} else {
  revealItems.forEach((item) => {
    item.classList.add("is-visible");
  });
}


// Form submission
const quoteForm = document.getElementById("quote-form");

if (quoteForm) {
  quoteForm.addEventListener("submit", async function (event) {
    event.preventDefault();

    const submitButton = quoteForm.querySelector(
      'button[type="submit"], input[type="submit"]'
    );

    const originalText = submitButton
      ? submitButton.textContent
      : "";

    if (submitButton) {
      submitButton.disabled = true;
      submitButton.textContent = "Sending...";
      submitButton.disabled = true;

submitButton.innerHTML = `
  <span class="loader"></span>
  Sending your request...
`;
    }

    try {
      const response = await fetch(quoteForm.action, {
        method: "POST",
        body: new FormData(quoteForm),
        headers: {
          Accept: "application/json"
        }
      });

      if (response.ok) {
        quoteForm.innerHTML = `
          <div class="success-message">
            <h2>Thank you!</h2>
            <p>
              Thank you for choosing Lagoon Relocations.
              Your request has been received.
              We'll contact you shortly.
            </p>
          </div>
        `;

        quoteForm.scrollIntoView({
          behavior: "smooth",
          block: "center"
        });
      } else {
        throw new Error("Submission failed");
      }

    } catch (error) {
      alert("Sorry, something went wrong. Please try again.");

      if (submitButton) {
        submitButton.disabled = false;
        submitButton.textContent = originalText || "Request my quote";
      }
    }
  });
}