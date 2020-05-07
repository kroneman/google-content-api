import { getGoogleDocContent } from './google-doc-content';

/**
 * This file gets run in the context of google apps script
 * LanguageApp and ContentService among others are globals in that context
 */
export {};

/**
 * Using get requests to translate
 */
declare let global: any 
global.doGet = (e: any) => {
  const htmlData = getGoogleDocContent();
  const json = JSON.stringify({
    html: htmlData
  })
  return ContentService.createTextOutput(json)
    .setMimeType(ContentService.MimeType.JSON);
};

// since doGet is run on a request permissions should be tested via this function in the online editor
global.testPermissions = () => {
  const htmlData = getGoogleDocContent();
  const json = JSON.stringify({
    html: htmlData
  });
  const jsonString = ContentService.createTextOutput(json)
          .setMimeType(ContentService.MimeType.JSON);
  return jsonString;
}