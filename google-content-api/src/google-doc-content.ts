const searchForFileByTitle = (
  fileName: string
): GoogleAppsScript.Drive.File => {
  const files = DriveApp.searchFiles(`title = "${fileName}"`);
  while (files.hasNext()) {
    const file = files.next();
    Logger.log(file.getName());
    Logger.log(file.getId());
    return file;
  }
};

function getGoogleDocAsHtml(file: any) {
  const htmlExportLink = `https://docs.google.com/feeds/download/documents/export/Export?id=${file.getId()}&exportFormat=html`;
  if (!htmlExportLink) {
    throw "File cannot be converted to HTML.";
  }

  const oAuthToken = ScriptApp.getOAuthToken();
  const response = UrlFetchApp.fetch(htmlExportLink, {
    headers: {
      Authorization: "Bearer " + oAuthToken,
    },
    muteHttpExceptions: true,
  });

  if (response.getResponseCode() !== 200) {
    throw "Error converting to HTML: " + response.getContentText();
  }

  return response.getContentText();
}

/**
 * Source: https://stackoverflow.com/questions/14663852/get-google-document-as-html
 */
function sanitizeHtml(html: string) {
    let sanitizedHtml: string = html;
    const htmlToRemove = [
        // nuke the whole head section, including the stylesheet and meta tag
        /<head>.*<\/head>/,
        // remove almost all html attributes
        / (id|class|style|start|colspan|rowspan)="[^"]*"/g,
        // remove all of the spans, as well as the outer html and body
        /<(span|\/span|body|\/body|html|\/html)>/g,
    ];

    htmlToRemove.forEach(regEx => {
        sanitizedHtml = sanitizedHtml.replace(regEx, '');
    });

    // clearly the superior way of denoting line breaks
    sanitizedHtml = sanitizedHtml.replace(/<br>/g, '<br />');

    return sanitizedHtml;
}

export function getGoogleDocContent() {
  const googleDoc = searchForFileByTitle("web-content-document");
  const html = getGoogleDocAsHtml(googleDoc);
  const sanitizedHtml = sanitizeHtml(html);
  Logger.log(sanitizedHtml);
  return sanitizedHtml;
}


