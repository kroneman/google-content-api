import axios from 'axios';
const GOOGLE_DOC_ENDPOINT = process.env.GOOGLE_DOC_ENDPOINT;

(async function (win, doc) {
    const containerSelector = '.js-response-container';
    const containerEl = doc.querySelector(containerSelector);

    if (!containerEl) {
        console.log('element not found');
        return;
    }

    const { data } = await axios.get(GOOGLE_DOC_ENDPOINT);
    const { html } = data;

    containerEl.innerHTML = html;
}(window, window.document));

