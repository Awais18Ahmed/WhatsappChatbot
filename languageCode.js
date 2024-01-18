const getLanguageCodeFromTemplateName = async(templateName)=> {
    const lowerCaseTemplateName = templateName.toLowerCase();
    let languageCode = '';
  
    // Check if the template name contains any accepted language codes
    if (lowerCaseTemplateName.includes('other')) {
      languageCode = 'en';
    } else{
        languageCode = 'en_US';
    }
    console.log(`Template Name: ${templateName}, Language Code: ${languageCode}`);
    return languageCode;
  }

  module.exports = getLanguageCodeFromTemplateName;