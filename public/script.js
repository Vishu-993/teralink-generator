document.addEventListener('DOMContentLoaded', function () {
    const linkForm = document.getElementById('linkForm');
    const urlInput = document.getElementById('urlInput');
    const statusMessage = document.getElementById('statusMessage');
    const linkDisplay = document.getElementById('linkDisplay');
    const copyButton = document.getElementById('copyButton');
    const resultDiv = document.getElementById('resultDiv');

    if (!linkForm || !urlInput || !statusMessage || !linkDisplay || !copyButton || !resultDiv) {
        console.error('Error: One or more elements are missing in the DOM');
        return;
    }

    linkForm.addEventListener('submit', async function (event) {
        event.preventDefault();
        const url = urlInput.value.trim();
        if (!url) {
            statusMessage.textContent = 'Please enter a valid URL.';
            return;
        }
        statusMessage.textContent = 'Generating link...';
        linkDisplay.value = '';
        try {
            const response = await fetch('/api/generate-link', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({ url })
            });

            if (!response.ok) {
                throw new Error(`HTTP error! status: ${response.status}`);
            }

            const data = await response.json();

            if (data && data.direct_link) {
                linkDisplay.value = data.direct_link;
                statusMessage.textContent = 'Link generated successfully!';
            } else {
                statusMessage.textContent = 'Failed to generate link. Please try again later.';
            }
        } catch (error) {
            console.error('Error:', error);
            statusMessage.textContent = 'Error generating link.';
        }
    });
});

function copyLink() {
    const linkDisplay = document.getElementById('linkDisplay');
    if (linkDisplay && linkDisplay.value) {
        navigator.clipboard.writeText(linkDisplay.value)
            .then(() => alert('Link copied to clipboard!'))
            .catch(err => alert('Failed to copy link: ' + err));
    } else {
        alert('No link to copy!');
    }
}
