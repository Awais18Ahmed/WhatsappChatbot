const express = require("express");
const body_parser = require("body-parser");
// const fetch = require("node-fetch");
const axios = require("axios"); // Import axios
// const fs = require('fs');
// const path = require('path');
const database = require("./db.js");
const chatbotModel = require("./models/chatbotmodel.js");
const sendUserResponseToEmail = require("./utils/sendEmail.js");
const getLanguageCode = require('./utils/languageCode.js')
require("dotenv").config();

const app = express().use(body_parser.json());
const token = process.env.TOKEN;
const mytoken = process.env.MYTOKEN; //prasath_token
const port = process.env.PORT || 8000;
// const filePath = path.join(__dirname, 'files', 'test.pdf');


const templates = {
  // " hi": "Hi there! How can I assist you today?",
  // hello: "Hello! How can I be of service?",
  // hey: "Hey! What can I help you with?",
  "need help": "Sure, I'm here to assist you. What do you need?",
  "how are you":
    "I'm just a chatbot, but thanks for asking! How can I assist you?",
  "what's up": "Not much, I'm here to help. How can I assist you?",
  "can you help me": "Of course! Please let me know what you need help with.",
  // "thanks": "You're welcome! Is there anything else I can help you with?",
  // "thank you": "No problem! How else can I assist you?",
  "good morning": "Good morning! What can I do for you today?",
  "good afternoon": "Good afternoon! How can I assist you?",
  "good evening": "Good evening! How can I help you?",
  "how can I contact support":
    "You can reach our support team at hello@99technologies.com",
  "can I ask a question": "Absolutely! Feel free to ask anything you'd like.",
  "what do you do":
    "I'm a chatbot designed to assist and provide information. How can I help you today?",
  "who created you":
    "I was created by developers who wanted to build a helpful chatbot. How can I assist you?",
  "where are you located":
    "I exist in the digital realm, ready to assist you wherever you are!",
  "tell me a joke": "Sure, here's one: Focus on work not waste your time.",
  "do you understand me":
    "Yes, I'm here to understand and help you. How can I assist?",
  "can you explain that":
    "Of course! I'll do my best to explain. What specifically would you like to know?",
  "how do I get started":
    "To get started, you can [mention steps or actions to begin]. Need more help?",
  "I don't understand":
    "No worries! I'll try explaining it differently. What specifically confuses you?",
  "can I change settings":
    "Yes, you can typically change settings in the [settings/options/preferences] menu. Need guidance?",
  "can I speak to a human":
    "Certainly! You can reach a human representative at hello@99technologies.com",
  "what are your capabilities":
    "I'm equipped to assist with various tasks. What do you need help with?",
  "how long have you existed":
    "I've been around for a while, here to help users like you. How can I assist you?",
  "are you a robot":
    "Yes, I'm a chatbot designed to assist users. How can I help you today?",
  "where can I find more information":
    "You can find more information [provide relevant sources/websites]. Need specific details?",
  "why are you here":
    "I'm here to assist and make things easier for users. How can I assist you?",
  "I'm lost":
    "No problem! Let's work together to figure things out. What are you having trouble with?",
  "how do I do this":
    "To do that, you can [mention steps or instructions]. Need more guidance?",
  "can I trust you":
    "Yes, I prioritize privacy and aim to assist. How can I earn your trust?",
  "is this confidential":
    "Yes, your privacy is important. How can I assist you today?",
  "what's your purpose":
    "My purpose is to help users like you. How can I assist you?",
  "where can I find help":
    "You can find assistance at https://www.99technologies.com. Need specific guidance?",
  "I'm sorry": "No need to apologize! How can I assist you today?",
  "are you human":
    "I'm not human, but I'm here to help. What do you need assistance with?",
  "tell me about yourself":
    "I'm a chatbot designed to assist users. How can I assist you today?",
  "can I trust the information you provide":
    "I strive to provide accurate information. Is there something specific you're concerned about?",
  "what languages do you speak":
    "I communicate in the language you're using now. How can I assist you?",
  "can you recommend something":
    "Sure, what kind of thing are you looking for recommendations on?",
  "are you intelligent":
    "I'm programmed to assist and learn from interactions. How can I help you?",
  "how can I improve":
    "Improvement depends on what you're looking to enhance. Can you specify?",
  "can I talk to you": "Absolutely! What would you like to talk about?",
  "can I tell you a secret":
    "Sure, I'm here to listen. Your secret's safe with me!",
  "are you free": "Yes, I'm here and available to help. What do you need?",
  "what's on your mind": "I'm here to assist you. What's on your mind?",
  "can we chat": "Sure thing! What would you like to chat about?",
  "I need advice": "I'm here to offer advice. What do you need guidance on?",
  "what should I do":
    "It depends on the situation. Can you provide more details?",
  "can you do something for me": "Of course! Please let me know what you need.",
  "tell me a story":
    "Once upon a time, there was a chatbot named 99... Just kidding! What kind of story are you looking for?",
  "how do I fix this":
    "To fix that issue, you can contact us with our customer support team at hello@99technologies.com . Need more help?",
  "can I share something with you":
    "Yes, I'm here to listen. What would you like to share?",
  "do you have feelings":
    "I don't have feelings, but I'm here to assist you. How can I help?",
  "what's your favorite thing":
    "I don't have personal preferences, but I'm here to assist you. What can I help you with?",
  "are you real":
    "I'm a real chatbot here to assist you. How can I assist you today?",
  "can I ask you a question":
    "Absolutely! Feel free to ask anything you'd like.",
  // Add more templates as needed
};

const templateNames = [
  "hello_world",
  "tesing",
  "testing",
  "new_trends",
  "99tech_video",
  "99tech_workforhome_policy",
  "variables",
  "hello",
  "hi",
  "hey",
  "1",
  "2",
  "3",
  "4",
  "0",
  "amazon_order",
  "website_order",
  "need_help",
  "other",
  "thank_you",
  "email_website_order_id",
  "email_id",
  "pc_mart_instructions",

  // Add more template names as needed
];
const templatesWithSimpleText = [
  "hello_world",
  "tesing",
  "testing",
  "1",
  "2",
  "3",
  "4",
  "0",
  "amazon_order",
  "website_order",
  "need_help",
  "other",
  "thank_you",
  "email_website_order_id",
  "email_id",
];
const templatesWithImage = ["new_trends"];
const templatesWithVideo = ["99tech_video"];
const templatesWithDocuments = ["99tech_workforhome_policy"];
const templatesWithVariables = ["variables"];
const templatesWithOneVariable = ["hello", "hi", "hey",];

// Initialize currentPosition to start at the main menu
let currentPosition = "main_menu";
let Email = "test@gmail.com";
let check = false;
let module3 = false;
let retailPurpose = false;
let officeUse = false;
let bulkExport = false;

const getCurrentPosition = () => {

  console.log('1111 currentPosition:', currentPosition)
  return currentPosition;
}
const getCheckerInvalidEmail = () => {

  console.log('1111 checker start position:', check)
  return check;
}
const getModule3Position = () => {

  console.log('1111 module3 start position:', module3)
  return module3;
}

const isValidEmail = (email) => {
  // Regular expression for basic email validation
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  const matches = email.match(emailRegex); // Using regex match to find email in the text
  if (matches && matches.length > 0) {
    Email = matches[0];
    console.log('1111 currentEmail:', Email)
    return true;
  }
  else {
    return false;
  }
}

const getBulkSalesSupportPosition = () => {

  return { retailPurpose, officeUse, bulkExport };
}



// let userSessions = 'main_menu'; // Object to store user sessions
// database connection
database();
//to verify the callback url from dashboard side - cloud api side

app.get("/webhook", (req, res) => {
  console.log("insid eweebhook");
  let mode = req.query["hub.mode"];
  let challenge = req.query["hub.challenge"];
  let token = req.query["hub.verify_token"];
  console.log(mode, challenge, token);

  if (mode && token) {
    if (mode === "subscribe" && token === mytoken) {
      res.status(200).send(challenge);
    } else {
      res.status(403);
    }
  }
});
// let userSession = { currentPosition: "main_menu" };

app.post("/webhook", async (req, res) => {
  let body_param = req.body;

  if (body_param.object) {
    if (
      body_param.entry &&
      body_param.entry[0].changes &&
      body_param.entry[0].changes[0].value.messages &&
      body_param.entry[0].changes[0].value.messages[0]
    ) {
      let phon_no_id =
        body_param.entry[0].changes[0].value.metadata.phone_number_id;
      let from = body_param.entry[0].changes[0].value.messages[0].from;
      let msg_body = body_param.entry[0].changes[0].value.messages[0].text.body;
      let responseText = "";


      const userName =
        body_param.entry[0].changes[0].value.contacts[0].profile.name;

      // Check for matching templates
      const lowerCaseMsgBody = msg_body.toLowerCase();
      // const matchedTemplate = templateNames.find((template) =>
      //   lowerCaseMsgBody.includes(template)
      // );

      // Check for a template that exactly matches the entire sentence
      const matchedTemplate = templateNames.find((template) => {
        const lowerCaseTemplate = template.toLowerCase();

        // Check for an exact match of the entire sentence
        if (lowerCaseMsgBody.includes(lowerCaseTemplate)) {
          // Ensure the found template exactly matches the entire message body
          return lowerCaseMsgBody === lowerCaseTemplate;

        }
        return false;
      });

      if (matchedTemplate) {
        responseText = matchedTemplate;
        try {
          const shouldIncludeImage = templatesWithImage.includes(responseText);
          const shouldIncludeVideo = templatesWithVideo.includes(responseText);
          const shouldIncludeDocuments = templatesWithDocuments.includes(responseText);
          const shouldIncludeVariables = templatesWithVariables.includes(responseText);
          const shouldIncludeTemplateWithSimpleText = templatesWithSimpleText.includes(responseText);
          const shouldIncludeOneVariable = templatesWithOneVariable.includes(responseText);
          const _currentSession = getCurrentPosition();

          // (responseText === "1"|| responseText === "2"|| responseText === "3"|| responseText === "4"|| responseText === "hello") && 
          console.log('_currentSession:', _currentSession)
          if (_currentSession === "main_menu") {
            console.log('11111:', responseText)

            if (shouldIncludeImage) {
              const response1 = await axios({
                method: "POST",
                url:
                  "https://graph.facebook.com/v17.0/" +
                  phon_no_id +
                  "/messages?access_token=" +
                  token,

                headers: {
                  "Content-Type": "application/json",
                },
                data: {
                  messaging_product: "whatsapp",
                  to: from,
                  type: "template",
                  template: {
                    name: responseText,
                    language: {
                      code: "en_US",
                    },
                    // Add more components if required
                    components: [
                      {
                        type: "header",
                        parameters: [
                          {
                            type: "image",
                            image: {
                              link: "https://www.shutterstock.com/shutterstock/photos/2111828198/display_1500/stock-photo-digital-technology-software-development-concept-coding-programmer-software-engineer-working-on-2111828198.jpg",
                            },
                          },
                        ],
                      },
                    ],
                  },
                  text: {
                    body: responseText, // Add the text message here
                  },
                },
              });

              if (response1.status === 200) {
                res.sendStatus(200);
              } else {
                res.sendStatus(response1.status);
              }
            }
            else if (shouldIncludeVariables) {
              const response1 = await axios({
                method: "POST",
                url:
                  "https://graph.facebook.com/v17.0/" +
                  phon_no_id +
                  "/messages?access_token=" +
                  token,

                headers: {
                  "Content-Type": "application/json",
                },
                data: {
                  messaging_product: "whatsapp",
                  recipient_type: "individual",
                  to: from,
                  type: "template",
                  template: {
                    name: responseText,
                    language: {
                      code: "en_US",
                    },
                    components: [
                      {
                        type: "header",
                        parameters: [
                          {
                            type: "image",
                            image: {
                              link: "https://pcmartmatara.com/wp-content/uploads/2022/02/Logo.jpg",
                            },
                          },
                        ],
                      },
                      {
                        type: "body",
                        parameters: [
                          {
                            type: "text",
                            text: userName,
                          },
                          {
                            type: "currency",
                            currency: {
                              fallback_value: "VALUE",
                              code: "USD",
                              amount_1000: 20000,
                            },
                          },
                          {
                            type: "date_time",
                            date_time: {
                              fallback_value: "December 31, 2023",
                            },
                          },
                        ],
                      },
                      // {
                      //   type: "button",
                      //   sub_type: "quick_reply",
                      //   index: "0",
                      //   parameters: [
                      //     {
                      //       type: "payload",
                      //       payload: "PAYLOAD",
                      //     },
                      //   ],
                      // },
                      // {
                      //   type: "button",
                      //   sub_type: "quick_reply",
                      //   index: "1",
                      //   parameters: [
                      //     {
                      //       type: "payload",
                      //       payload: "PAYLOAD",
                      //     },
                      //   ],
                      // },
                    ],
                  },
                },
              });

              if (response1.status === 200) {
                res.sendStatus(200);
              } else {
                res.sendStatus(response1.status);
              }
            }
            else if (shouldIncludeOneVariable) {
              const response1 = await axios({
                method: "POST",
                url:
                  "https://graph.facebook.com/v17.0/" +
                  phon_no_id +
                  "/messages?access_token=" +
                  token,

                headers: {
                  "Content-Type": "application/json",
                },
                data: {
                  messaging_product: "whatsapp",
                  recipient_type: "individual",
                  to: from,
                  type: "template",
                  template: {
                    name: responseText,
                    language: {
                      code: "en_US",
                    },
                    components: [
                      {
                        type: "body",
                        parameters: [
                          {
                            type: "text",
                            text: userName,
                          },
                        ],
                      },
                    ],
                  },
                },
              });

              async function sendMessageToWhatsApp() {
                try {
                  // Obtain the language code
                  const languageCode = await getLanguageCode(responseText);
                  responseText = "pc_mart_instructions"
                  const response2 = await axios({
                    method: "POST",
                    url:
                      "https://graph.facebook.com/v17.0/" +
                      phon_no_id +
                      "/messages?access_token=" +
                      token,

                    headers: {
                      "Content-Type": "application/json",
                    },
                    data: {
                      messaging_product: "whatsapp",
                      to: from,
                      type: "template",
                      template: {
                        name: responseText,
                        language: {
                          code: languageCode,
                        },
                        // Add more components if required
                        components: [
                          {
                            type: "header",
                            parameters: [
                              {
                                type: "document",
                                document: {
                                  "link": "https://99technologies.net/pcmart/about_us_pcmart.pdf",
                                  "filename": "About Us.pdf"
                                },
                              },
                            ],
                          },
                        ],
                      },
                      text: {
                        body: responseText, // Add the text message here
                      },
                    },
                  });
                  if (response2.status === 200) {
                    res.sendStatus(200);
                  } else {
                    res.sendStatus(response2.status);
                  }

                } catch (error) {
                  // Handle errors or exceptions here
                  console.error("Error occurred while sending message:", error);
                  throw error; // Optionally rethrow the error for further handling
                }
              }

              if (response1.status === 200) {

                sendMessageToWhatsApp()
                  .then((response) => {
                    console.log("Message sent successfully:", response.data);
                  })
                  .catch((error) => {
                    console.error("Failed to send message:", error);
                  });
                res.sendStatus(200);

              }
              else {
                res.sendStatus(response1.status);
              }
            }
            // else if (shouldIncludeOneVariable) {
            //   const languageCode = await getLanguageCode(responseText);
            //   const response = await axios({
            //     method: "POST",
            //     url: "https://graph.facebook.com/v17.0/" + phon_no_id + "/messages?access_token=" + token,
            //     headers: {
            //       "Content-Type": "application/json",
            //     },
            //     data: {
            //       messaging_product: "whatsapp",
            //       recipient_type: "individual",
            //       to: from,
            //       type: "template",
            //       templates: [
            //         {
            //           name: "pc_mart_instructions",
            //           language: {
            //             code: languageCode,
            //           },
            //           components: [
            //             {
            //               type: "header",
            //               parameters: [
            //                 {
            //                   type: "document",
            //                   document: {
            //                     link: "http://tapl.com.pk/source/uploads/TAPL-Profile.pdf",
            //                     filename: "TAPL-Profile.pdf",
            //                   },
            //                 },
            //               ],
            //             },
            //           ],
            //         },
            //         {
            //           name: responseText,
            //           language: {
            //             code: languageCode,
            //           },
            //           components: [
            //             {
            //               type: "body",
            //               parameters: [
            //                 {
            //                   type: "text",
            //                   text: userName,
            //                 },
            //               ],
            //             },
            //           ],
            //         },

            //         // Add more templates as required
            //       ],
            //       text: {
            //         body: responseText, // Add the text message here
            //       },
            //     },
            //   });

            //   // Handle the response
            //   if (response.status === 200) {
            //     res.sendStatus(200);
            //   } else {
            //     res.sendStatus(response.status);
            //   }
            // }

            else if (shouldIncludeVideo) {
              const response1 = await axios({
                method: "POST",
                url:
                  "https://graph.facebook.com/v17.0/" +
                  phon_no_id +
                  "/messages?access_token=" +
                  token,

                headers: {
                  "Content-Type": "application/json",
                },
                data: {
                  messaging_product: "whatsapp",
                  to: from,
                  type: "template",
                  template: {
                    name: responseText,
                    language: {
                      code: "en_US",
                    },
                    // Add more components if required
                    components: [
                      {
                        type: "header",
                        parameters: [
                          {
                            type: "video",
                            video: {
                              link: "https://www.99technologies.com/assets/videos/99-banner-main-video.mp4",
                            },
                          },
                        ],
                      },
                    ],
                  },
                  text: {
                    body: responseText, // Add the text message here
                  },
                },
              });

              if (response1.status === 200) {
                res.sendStatus(200);
              } else {
                res.sendStatus(response1.status);
              }
            }
            else if (shouldIncludeDocuments) {
              const response1 = await axios({
                method: "POST",
                url:
                  "https://graph.facebook.com/v17.0/" +
                  phon_no_id +
                  "/messages?access_token=" +
                  token,

                headers: {
                  "Content-Type": "application/json",
                },
                data: {
                  messaging_product: "whatsapp",
                  to: from,
                  type: "template",
                  template: {
                    name: responseText,
                    language: {
                      code: "en_US",
                    },
                    // Add more components if required
                    components: [
                      {
                        type: "header",
                        parameters: [
                          {
                            type: "document",
                            document: {
                              "link": "http://tapl.com.pk/source/uploads/TAPL-Profile.pdf",
                              "filename": "TAPL-Profile.pdf"
                            },
                          },
                        ],
                      },
                    ],
                  },
                  text: {
                    body: responseText, // Add the text message here
                  },
                },
              });

              if (response1.status === 200) {
                res.sendStatus(200);
              } else {
                res.sendStatus(response1.status);
              }

              // fs.readFile(filePath, 'binary', async (error, data) => {
              //   if (error) {
              //     console.error('Error reading file:', error);
              //     return;
              //   }

              //   try {
              //     const response = await axios({
              //       method: 'POST',
              //       url: 'https://graph.facebook.com/v17.0/' + phon_no_id + '/messages?access_token=' + token,
              //       headers: {
              //         'Content-Type': 'application/json',
              //       },
              //       data: {
              //         messaging_product: 'whatsapp',
              //         to: from,
              //         type: 'template',
              //         template: {
              //           name: responseText,
              //           language: {
              //             code: 'en_US',
              //           },
              //           components: [
              //             {
              //               type: 'header',
              //               parameters: [
              //                 {
              //                   type: 'document',
              //                   document: {
              //                     link: 'data:application/pdf;base64,' + Buffer.from(data, 'binary').toString('base64'),
              //                   },
              //                 },
              //               ],
              //             },
              //           ],
              //         },
              //         text: {
              //           body: responseText, // Add the text message here
              //         },
              //       },
              //     });

              //     console.log('Response:', response.data);
              //   } catch (err) {
              //     console.error('Error sending POST request:', err);
              //   }
              // });

            }
            else if (shouldIncludeTemplateWithSimpleText) {
              // Obtain the language code
              const languageCode = await getLanguageCode(responseText);
              const response2 = await axios({
                method: "POST",
                url:
                  "https://graph.facebook.com/v17.0/" +
                  phon_no_id +
                  "/messages?access_token=" +
                  token,

                headers: {
                  "Content-Type": "application/json",
                },
                data: {
                  messaging_product: "whatsapp",
                  to: from,
                  type: "template",
                  template: {
                    name: responseText,
                    language: {
                      code: languageCode,
                    },
                  },
                  text: {
                    body: responseText, // Add the text message here
                  },
                },
              });
              // Set the current position to sub_menu_1 for this user session
              if (responseText === "1") {
                currentPosition = "sub_menu_1";
              }
              else if (responseText === "2") {
                currentPosition = "sub_menu_2";
              }
              else if (responseText === "3") {
                currentPosition = "sub_menu_3";
              }
              else if (responseText === "4") {
                currentPosition = "sub_menu_4";
              }

              // userSessions[from] = userSession;
              if (response2.status === 200) {
                res.sendStatus(200);
              } else {
                res.sendStatus(response2.status);
              }
            }
            else {
              responseText =
                "I'm sorry, I couldn't comprehend your query. Could you please rephrase or ask a different question? Press 0 to return to the main menu";
              // Check for matching templates
              for (const [keyword, template] of Object.entries(templates)) {
                if (msg_body.toLowerCase().includes(keyword)) {
                  responseText = template;
                  break;
                } else {
                  responseText =
                    "I'm sorry, I couldn't comprehend your query. Could you please rephrase or ask a different question? Press 0 to return to the main menu";
                }
              }

              try {
                const response = await axios({
                  method: "POST",
                  url:
                    "https://graph.facebook.com/v17.0/" +
                    phon_no_id +
                    "/messages?access_token=" +
                    token,

                  data: {
                    messaging_product: "whatsapp",
                    to: from,
                    text: {
                      body: responseText,
                    },
                  },

                  headers: {
                    "Content-Type": "application/json",
                  },
                });

                if (response.status === 200) {
                  res.sendStatus(200);
                } else {
                  res.sendStatus(response.status);
                }
              } catch (error) {
                console.error("Error sending message", error);
                res.sendStatus(500);
              }
            }
          }

          else if (_currentSession === "sub_menu_1") {
            if (responseText === "1") {
              responseText = "email_id";
            }
            else if (responseText === "2") {
              responseText = "email_id";
            }
            else if (responseText === "3") {
              responseText = "need_help";
            }
            else if (responseText === "4") {
              responseText = "other";
            }
            else if (responseText === "0") {
              responseText = "0"

            }
            console.log('sub_menu_1 2222:', responseText)
            if (shouldIncludeTemplateWithSimpleText) {
              // Obtain the language code
              const languageCode = await getLanguageCode(responseText);
              const response2 = await axios({
                method: "POST",
                url:
                  "https://graph.facebook.com/v17.0/" +
                  phon_no_id +
                  "/messages?access_token=" +
                  token,

                headers: {
                  "Content-Type": "application/json",
                },
                data: {
                  messaging_product: "whatsapp",
                  to: from,
                  type: "template",
                  template: {
                    name: responseText,
                    language: {
                      code: languageCode,
                    },
                  },
                  text: {
                    body: responseText, // Add the text message here
                  },
                },
              });

              if (responseText === "0") {
                currentPosition = "main_menu";
              }
              else {
                currentPosition = "sub_menu_1";
              }

              if (response2.status === 200) {
                res.sendStatus(200);
              } else {
                res.sendStatus(response2.status);
              }
            }
            else {
              responseText =
                "I'm sorry, I couldn't comprehend your query. Could you please rephrase or ask a different question?";
              // Check for matching templates
              for (const [keyword, template] of Object.entries(templates)) {
                if (msg_body.toLowerCase().includes(keyword)) {
                  responseText = template;
                  break;
                } else {
                  responseText =
                    "I'm sorry, I couldn't comprehend your query. Could you please rephrase or ask a different question?";
                }
              }

              try {
                const response = await axios({
                  method: "POST",
                  url:
                    "https://graph.facebook.com/v17.0/" +
                    phon_no_id +
                    "/messages?access_token=" +
                    token,

                  data: {
                    messaging_product: "whatsapp",
                    to: from,
                    text: {
                      body: responseText,
                    },
                  },

                  headers: {
                    "Content-Type": "application/json",
                  },
                });

                if (response.status === 200) {
                  res.sendStatus(200);
                } else {
                  res.sendStatus(response.status);
                }
              } catch (error) {
                console.error("Error sending message", error);
                res.sendStatus(500);
              }
            }
          }

          else if (_currentSession === "sub_menu_2") {
            if (responseText === "1") {
              responseText = "email_id";
              currentPosition = "sub_menu_2";
            }
            else if (responseText === "2") {
              responseText = "email_id";
              currentPosition = "insideSub_menu_2";
              check = true;
            }
            else if (responseText === "3") {
              responseText = "email_id";
              currentPosition = "sub_menu_2";
            }
            // else if (responseText === "4") {
            //   responseText = "email_id";
            //   currentPosition = "sub_menu_2";
            // }
            else if (responseText === "0") {
              responseText = "0"
              currentPosition = "main_menu";
            }
            console.log('sub_menu_2 3333:', responseText)
            if ((responseText === "email_id") || (responseText === "0")) {
              // Obtain the language code
              const languageCode = await getLanguageCode(responseText);
              const response2 = await axios({
                method: "POST",
                url:
                  "https://graph.facebook.com/v17.0/" +
                  phon_no_id +
                  "/messages?access_token=" +
                  token,

                headers: {
                  "Content-Type": "application/json",
                },
                data: {
                  messaging_product: "whatsapp",
                  to: from,
                  type: "template",
                  template: {
                    name: responseText,
                    language: {
                      code: languageCode,
                    },
                  },
                  text: {
                    body: responseText, // Add the text message here
                  },
                },
              });

              // if (responseText === "0") {
              //   currentPosition = "main_menu";
              // }
              // if (responseText === "2") {

              //   currentPosition = "insideSub_menu_2";
              //   console.log('test1', currentPosition)
              // }
              // else {
              //   currentPosition = "sub_menu_2";
              //   console.log('test2', currentPosition)
              // }
              console.log('insideSub_menu_2 12111:', currentPosition)

              if (response2.status === 200) {
                res.sendStatus(200);
              } else {
                res.sendStatus(response2.status);
              }
            }
            else {
              responseText =
                "sorry_technical_support";

              try {
                const languageCode = await getLanguageCode(responseText);
                const response = await axios({
                  method: "POST",
                  url:
                    "https://graph.facebook.com/v17.0/" +
                    phon_no_id +
                    "/messages?access_token=" +
                    token,

                  headers: {
                    "Content-Type": "application/json",
                  },
                  data: {
                    messaging_product: "whatsapp",
                    to: from,
                    type: "template",
                    template: {
                      name: responseText,
                      language: {
                        code: languageCode,
                      },
                    },
                    text: {
                      body: responseText, // Add the text message here
                    },
                  },
                });

                if (response.status === 200) {
                  res.sendStatus(200);
                } else {
                  res.sendStatus(response.status);
                }
              } catch (error) {
                console.error("Error sending message", error);
                res.sendStatus(500);
              }
            }
          }
          else if (_currentSession === "sub_menu_3") {
           
            if (responseText === "1") {
              responseText = "email_id";
              check = true;
              module3 = true;
            }
            else if (responseText === "2") {
              responseText = "email_id";
              check = true;
              module3 = true;
            }
            // else if (responseText === "3") {
            //   responseText = "need_help";
            // }
            // else if (responseText === "4") {
            //   responseText = "other";
            // }
            else if (responseText === "0") {
              responseText = "0"
              module3 = false;
            }
            console.log('sub_menu_3 4444:', responseText)
            if ((responseText === "email_id") || (responseText === "0")) {
              // Obtain the language code
              const languageCode = await getLanguageCode(responseText);
              const response2 = await axios({
                method: "POST",
                url:
                  "https://graph.facebook.com/v17.0/" +
                  phon_no_id +
                  "/messages?access_token=" +
                  token,

                headers: {
                  "Content-Type": "application/json",
                },
                data: {
                  messaging_product: "whatsapp",
                  to: from,
                  type: "template",
                  template: {
                    name: responseText,
                    language: {
                      code: languageCode,
                    },
                  },
                  text: {
                    body: responseText, // Add the text message here
                  },
                },
              });

              if (responseText === "0") {
                currentPosition = "main_menu";
              }
              else {
                currentPosition = "sub_menu_3";
              }

              if (response2.status === 200) {
                res.sendStatus(200);
              } else {
                res.sendStatus(response2.status);
              }
            }
            else {
              responseText = "sorry_enterprise_solution";
              const languageCode = await getLanguageCode(responseText);
              const response2 = await axios({
                method: "POST",
                url:
                  "https://graph.facebook.com/v17.0/" +
                  phon_no_id +
                  "/messages?access_token=" +
                  token,

                headers: {
                  "Content-Type": "application/json",
                },
                data: {
                  messaging_product: "whatsapp",
                  to: from,
                  type: "template",
                  template: {
                    name: responseText,
                    language: {
                      code: languageCode,
                    },
                  },
                  text: {
                    body: responseText, // Add the text message here
                  },
                },
              });

              currentPosition = "sub_menu_3";


              if (response2.status === 200) {
                res.sendStatus(200);
              } else {
                res.sendStatus(response2.status);
              }
            }
          }
          else if (_currentSession === "sub_menu_4") {
            if (responseText === "1") {
              responseText = "email_id";
              retailPurpose = true;
              check = true;
            }
            else if (responseText === "2") {
              responseText = "email_id";
              officeUse = true;
              check = true;
            }
            else if (responseText === "3") {
              responseText = "email_id";
              bulkExport = true;
              check = true;
            }
            // else if (responseText === "4") {
            //   responseText = "other";
            // }
            else if (responseText === "0") {
              responseText = "0"
              retailPurpose = false;
              bulkExport = false;
              officeUse = false;
            }
            console.log('sub_menu_4 555:', responseText)
            if ((responseText === "email_id") || (responseText === "0")){
              // Obtain the language code
              const languageCode = await getLanguageCode(responseText);
              const response2 = await axios({
                method: "POST",
                url:
                  "https://graph.facebook.com/v17.0/" +
                  phon_no_id +
                  "/messages?access_token=" +
                  token,

                headers: {
                  "Content-Type": "application/json",
                },
                data: {
                  messaging_product: "whatsapp",
                  to: from,
                  type: "template",
                  template: {
                    name: responseText,
                    language: {
                      code: languageCode,
                    },
                  },
                  text: {
                    body: responseText, // Add the text message here
                  },
                },
              });

              if (responseText === "0") {
                currentPosition = "main_menu";
              }
              else {
                currentPosition = "sub_menu_4";
              }

              if (response2.status === 200) {
                res.sendStatus(200);
              } else {
                res.sendStatus(response2.status);
              }
            }
            else {
              responseText = "sorry_bulk_sales_support";
              const languageCode = await getLanguageCode(responseText);
              const response2 = await axios({
                method: "POST",
                url:
                  "https://graph.facebook.com/v17.0/" +
                  phon_no_id +
                  "/messages?access_token=" +
                  token,

                headers: {
                  "Content-Type": "application/json",
                },
                data: {
                  messaging_product: "whatsapp",
                  to: from,
                  type: "template",
                  template: {
                    name: responseText,
                    language: {
                      code: languageCode,
                    },
                  },
                  text: {
                    body: responseText, // Add the text message here
                  },
                },
              });

              currentPosition = "sub_menu_4";


              if (response2.status === 200) {
                res.sendStatus(200);
              } else {
                res.sendStatus(response2.status);
              }
            }
          }

          else if (_currentSession === "insideSub_menu_2") {
            if (responseText === "1") {
              responseText = "testing_sub_menu_2_of_2"
              msg_body = "Customer expresses keen interest in acquiring Renewed Laptops; please contact them promptly via the provided email. Thank you! "
            }
            else if (responseText === "2") {
              responseText = "testing_sub_menu_2_of_2"
              msg_body = "Customer expresses keen interest in acquiring Gaming Laptops; please contact them promptly via the provided email. Thank you!"
            }
            else if (responseText === "3") {
              responseText = "testing_sub_menu_2_of_2"
              msg_body = "Customer expresses keen interest in acquiring Renewed Desktops; please contact them promptly via the provided email. Thank you! "
            }
            else if (responseText === "4") {
              responseText = "testing_sub_menu_2_of_2"
              msg_body = "Customer expresses keen interest in acquiring Gaming Desktops; please contact them promptly via the provided email. Thank you! "
            }
            else if (responseText === "0") {
              responseText = "0"

            }
            console.log('insideSub_menu_2 3333:', responseText)
            if (responseText === "testing_sub_menu_2_of_2") {
              // Obtain the language code
              const languageCode = await getLanguageCode(responseText);
              const response2 = await axios({
                method: "POST",
                url:
                  "https://graph.facebook.com/v17.0/" +
                  phon_no_id +
                  "/messages?access_token=" +
                  token,

                headers: {
                  "Content-Type": "application/json",
                },
                data: {
                  messaging_product: "whatsapp",
                  to: from,
                  type: "template",
                  template: {
                    name: responseText,
                    language: {
                      code: languageCode,
                    },
                  },
                  text: {
                    body: responseText, // Add the text message here
                  },
                },
              });


              currentPosition = "sub_menu_2";

              const FinalMessage = msg_body + "  User Provided Email::  " + Email;
              console.log("FinalMessage_inside", FinalMessage)
              if (response2.status === 200) {
                res.sendStatus(200);
              } else {
                res.sendStatus(response2.status);
              }
              // Passing data to controller

              try {
                await chatbotModel.create({
                  phone_number_id: phon_no_id,
                  from,
                  message: FinalMessage,
                });
              }
              catch (error) {
                console.error("Error saving data to the database:", error);
                res.sendStatus(500); // Send an internal server error status if the data save operation fails
              }

              // Passing data to nodemailer and sending mail to customer support team

              try {
                await sendUserResponseToEmail({
                  FinalMessage,
                });
              }
              catch (error) {
                console.error("Error sending data to mail:", error);
                res.sendStatus(500); // Send an internal server error status if the data save operation fails
              }
            }
            else {
              responseText = "0";


              try {
                const languageCode = await getLanguageCode(responseText);
                const response = await axios({
                  method: "POST",
                  url:
                    "https://graph.facebook.com/v17.0/" +
                    phon_no_id +
                    "/messages?access_token=" +
                    token,

                  headers: {
                    "Content-Type": "application/json",
                  },
                  data: {
                    messaging_product: "whatsapp",
                    to: from,
                    type: "template",
                    template: {
                      name: responseText,
                      language: {
                        code: languageCode,
                      },
                    },
                    text: {
                      body: responseText, // Add the text message here
                    },
                  },
                });
                currentPosition = "main_menu";

                if (response.status === 200) {
                  res.sendStatus(200);
                } else {
                  res.sendStatus(response.status);
                }
              } catch (error) {
                console.error("Error sending message", error);
                res.sendStatus(500);
              }
            }
          }
          else {
            // Handle other scenarios or inputs here
          }

        }

        catch (error) {
          console.error("Error sending message", error);
          res.sendStatus(500);
        }
      }

      else {
        const validateMail = isValidEmail(lowerCaseMsgBody);
        const invalidChecker = getCheckerInvalidEmail();
        const Module3Checker = getModule3Position();
        let positions = getBulkSalesSupportPosition();
        if (validateMail) {
          check = false;
          if (currentPosition === "sub_menu_1") {
            responseText = "email_website_order_id";
          }
          else if (currentPosition === "sub_menu_2") {
            responseText = "technical_support_problems";
          }
          else if (currentPosition === "insideSub_menu_2") {
            responseText = "technical_support_need_assistence";
          }
          else if (currentPosition === "sub_menu_3") {
            responseText = "enterprise_solutions_questions";
          }
          else if (currentPosition === "sub_menu_4") {
            if( positions.retailPurpose === true){
              responseText = "retail_purposes";
              
            }
            else if( positions.officeUse === true){
              responseText = "office_use";
              
            }
            else if( positions.bulkExport === true){
              responseText = "export";
              
            }
            else{
              console.log("_retailPurpose, _officeUse, _bulkExport, currentPosition", positions.retailPurpose, positions.officeUse, positions.bulkExport, currentPosition);
              responseText = "sorry_bulk_sales_support"
            }
          }
          else {
            responseText = "sory_main_menu";
          }

          const languageCode = await getLanguageCode(responseText);
          try {
            const response = await axios({
              method: "POST",
              url:
                "https://graph.facebook.com/v17.0/" +
                phon_no_id +
                "/messages?access_token=" +
                token,

              headers: {
                "Content-Type": "application/json",
              },
              data: {
                messaging_product: "whatsapp",
                to: from,
                type: "template",
                template: {
                  name: responseText,
                  language: {
                    code: languageCode,
                  },
                },
                text: {
                  body: responseText, // Add the text message here
                },
              },
            });
            // currentPosition = "sub_menu_1";
            if (currentPosition === "sub_menu_1") {
              currentPosition = "sub_menu_1";
            }
            else if (currentPosition === "sub_menu_2") {
              currentPosition = "sub_menu_2";
            }
            else if (currentPosition === "insideSub_menu_2") {
              currentPosition = "insideSub_menu_2";
            }
            else if (currentPosition === "sub_menu_3") {
              currentPosition = "sub_menu_3";
            }
            else if (currentPosition === "sub_menu_4") {
              currentPosition = "sub_menu_4";
            }
            else {
              currentPosition = "main_menu"
            }


            if (response.status === 200) {
              res.sendStatus(200);
            } else {
              res.sendStatus(response.status);
            }


          }
          catch (error) {
            console.error("Error sending message", error);
            res.sendStatus(500);
          }
        }

        else if ((lowerCaseMsgBody.length >= 17) && (currentPosition === "sub_menu_1")) {
          responseText = "thank_you";
          // Check for matching templates
          // for (const [keyword, template] of Object.entries(templates)) {
          //   if (msg_body.toLowerCase().includes(keyword)) {
          //     responseText = template;
          //     break;
          //   } else {
          //     responseText = "Thank you for your cooperation. Our team will be in contact with you shortly. We appreciate your continued support and encourage you to stay connected with us.";
          //   }
          // }
          // Obtain the language code
          const languageCode = await getLanguageCode(responseText);
          try {
            const response = await axios({
              method: "POST",
              url:
                "https://graph.facebook.com/v17.0/" +
                phon_no_id +
                "/messages?access_token=" +
                token,

              headers: {
                "Content-Type": "application/json",
              },
              data: {
                messaging_product: "whatsapp",
                to: from,
                type: "template",
                template: {
                  name: responseText,
                  language: {
                    code: languageCode,
                  },
                },
                text: {
                  body: responseText, // Add the text message here
                },
              },
            });
            currentPosition = "main_menu";
            const FinalMessage = msg_body + "  User Provided Email::  " + Email;
            console.log("FinalMessage", FinalMessage)
            if (response.status === 200) {
              res.sendStatus(200);
            } else {
              res.sendStatus(response.status);
            }
            // Passing data to controller

            try {
              await chatbotModel.create({
                phone_number_id: phon_no_id,
                from,
                message: FinalMessage,
              });
            }
            catch (error) {
              console.error("Error saving data to the database:", error);
              res.sendStatus(500); // Send an internal server error status if the data save operation fails
            }

            // Passing data to nodemailer and sending mail to customer support team

            try {
              await sendUserResponseToEmail({
                FinalMessage,
              });
            }
            catch (error) {
              console.error("Error sending data to mail:", error);
              res.sendStatus(500); // Send an internal server error status if the data save operation fails
            }

          }
          catch (error) {
            console.error("Error sending message", error);
            res.sendStatus(500);
          }

        }
        else if ((lowerCaseMsgBody.length >= 12) && (currentPosition === "sub_menu_2")) {
          responseText = "thank_you";
          const languageCode = await getLanguageCode(responseText);
          try {
            const response = await axios({
              method: "POST",
              url:
                "https://graph.facebook.com/v17.0/" +
                phon_no_id +
                "/messages?access_token=" +
                token,

              headers: {
                "Content-Type": "application/json",
              },
              data: {
                messaging_product: "whatsapp",
                to: from,
                type: "template",
                template: {
                  name: responseText,
                  language: {
                    code: languageCode,
                  },
                },
                text: {
                  body: responseText, // Add the text message here
                },
              },
            });
            currentPosition = "main_menu";
            const FinalMessage = msg_body + "  User Provided Email::  " + Email;
            console.log("FinalMessage", FinalMessage)
            if (response.status === 200) {
              res.sendStatus(200);
            } else {
              res.sendStatus(response.status);
            }
            // Passing data to controller

            try {
              await chatbotModel.create({
                phone_number_id: phon_no_id,
                from,
                message: FinalMessage,
              });
            }
            catch (error) {
              console.error("Error saving data to the database:", error);
              res.sendStatus(500); // Send an internal server error status if the data save operation fails
            }

            // Passing data to nodemailer and sending mail to customer support team

            try {
              await sendUserResponseToEmail({
                FinalMessage,
              });
            }
            catch (error) {
              console.error("Error sending data to mail:", error);
              res.sendStatus(500); // Send an internal server error status if the data save operation fails
            }

          }
          catch (error) {
            console.error("Error sending message", error);
            res.sendStatus(500);
          }

        }
        else if ((currentPosition === "sub_menu_3") && (invalidChecker === false)) {
          if (Module3Checker === true) {
            responseText = "thanks_enterprise_solution";
            const languageCode = await getLanguageCode(responseText);
            try {
              const response = await axios({
                method: "POST",
                url:
                  "https://graph.facebook.com/v17.0/" +
                  phon_no_id +
                  "/messages?access_token=" +
                  token,

                headers: {
                  "Content-Type": "application/json",
                },
                data: {
                  messaging_product: "whatsapp",
                  to: from,
                  type: "template",
                  template: {
                    name: responseText,
                    language: {
                      code: languageCode,
                    },
                  },
                  text: {
                    body: responseText, // Add the text message here
                  },
                },
              });
              currentPosition = "main_menu";
              module3 = false;
              const FinalMessage = msg_body + "  User Provided Email::  " + Email;
              console.log("FinalMessage", FinalMessage)
              if (response.status === 200) {
                res.sendStatus(200);
              } else {
                res.sendStatus(response.status);
              }
              // Passing data to controller

              try {
                await chatbotModel.create({
                  phone_number_id: phon_no_id,
                  from,
                  message: FinalMessage,
                });
              }
              catch (error) {
                console.error("Error saving data to the database:", error);
                res.sendStatus(500); // Send an internal server error status if the data save operation fails
              }

              // Passing data to nodemailer and sending mail to customer support team

              try {
                await sendUserResponseToEmail({
                  FinalMessage,
                });
              }
              catch (error) {
                console.error("Error sending data to mail:", error);
                res.sendStatus(500); // Send an internal server error status if the data save operation fails
              }

            }
            catch (error) {
              console.error("Error sending message", error);
              res.sendStatus(500);
            }
          }
          else {
            responseText = "sorry_enterprise_solution";
            const languageCode = await getLanguageCode(responseText);
            const response2 = await axios({
              method: "POST",
              url:
                "https://graph.facebook.com/v17.0/" +
                phon_no_id +
                "/messages?access_token=" +
                token,

              headers: {
                "Content-Type": "application/json",
              },
              data: {
                messaging_product: "whatsapp",
                to: from,
                type: "template",
                template: {
                  name: responseText,
                  language: {
                    code: languageCode,
                  },
                },
                text: {
                  body: responseText, // Add the text message here
                },
              },
            });

            currentPosition = "sub_menu_3";


            if (response2.status === 200) {
              res.sendStatus(200);
            } else {
              res.sendStatus(response2.status);
            }
          }
        }
        else if ((currentPosition === "sub_menu_4") && (invalidChecker === false)) {
          if ((positions.retailPurpose === true) || (positions.officeUse === true) || (positions.bulkExport === true)) {
            console.log("_retailPurpose121, _officeUse121, _bulkExport121, currentPosition121",retailPurpose, officeUse, bulkExport, currentPosition);

            responseText = "thanks_enterprise_solution";
            const languageCode = await getLanguageCode(responseText);
            try {
              const response = await axios({
                method: "POST",
                url:
                  "https://graph.facebook.com/v17.0/" +
                  phon_no_id +
                  "/messages?access_token=" +
                  token,

                headers: {
                  "Content-Type": "application/json",
                },
                data: {
                  messaging_product: "whatsapp",
                  to: from,
                  type: "template",
                  template: {
                    name: responseText,
                    language: {
                      code: languageCode,
                    },
                  },
                  text: {
                    body: responseText, // Add the text message here
                  },
                },
              });
              currentPosition = "main_menu";
              positions.bulkExport = false;
              positions.officeUse = false;
              positions.retailPurpose = false;
              // Return the updated positions to be used later
              ({ retailPurpose, officeUse, bulkExport } = positions);
              console.log("_retailPurpose2, _officeUse2, _bulkExport2, currentPosition2",positions.retailPurpose, positions.officeUse, positions.bulkExport, currentPosition);
              const FinalMessage = msg_body + "  User Provided Email::  " + Email;
              console.log("FinalMessage1", FinalMessage)
              if (response.status === 200) {
                res.sendStatus(200);
              } else {
                res.sendStatus(response.status);
              }
              // Passing data to controller

              try {
                await chatbotModel.create({
                  phone_number_id: phon_no_id,
                  from,
                  message: FinalMessage,
                });
              }
              catch (error) {
                console.error("Error saving data to the database:", error);
                res.sendStatus(500); // Send an internal server error status if the data save operation fails
              }

              // Passing data to nodemailer and sending mail to customer support team

              try {
                await sendUserResponseToEmail({
                  FinalMessage,
                });
              }
              catch (error) {
                console.error("Error sending data to mail:", error);
                res.sendStatus(500); // Send an internal server error status if the data save operation fails
              }

            }
            catch (error) {
              console.error("Error sending message", error);
              res.sendStatus(500);
            }
          }
          else {
            responseText = "sorry_bulk_sales_support";
            const languageCode = await getLanguageCode(responseText);
            const response2 = await axios({
              method: "POST",
              url:
                "https://graph.facebook.com/v17.0/" +
                phon_no_id +
                "/messages?access_token=" +
                token,

              headers: {
                "Content-Type": "application/json",
              },
              data: {
                messaging_product: "whatsapp",
                to: from,
                type: "template",
                template: {
                  name: responseText,
                  language: {
                    code: languageCode,
                  },
                },
                text: {
                  body: responseText, // Add the text message here
                },
              },
            });

            currentPosition = "sub_menu_4";


            if (response2.status === 200) {
              res.sendStatus(200);
            } else {
              res.sendStatus(response2.status);
            }
          }
        }
        // else if ((lowerCaseMsgBody.length >= 12) && (currentPosition === "insideSub_menu_2")) {
        //   responseText = "thank_you";
        //   const languageCode = await getLanguageCode(responseText);
        //   try {
        //     const response = await axios({
        //       method: "POST",
        //       url:
        //         "https://graph.facebook.com/v17.0/" +
        //         phon_no_id +
        //         "/messages?access_token=" +
        //         token,

        //       headers: {
        //         "Content-Type": "application/json",
        //       },
        //       data: {
        //         messaging_product: "whatsapp",
        //         to: from,
        //         type: "template",
        //         template: {
        //           name: responseText,
        //           language: {
        //             code: languageCode,
        //           },
        //         },
        //         text: {
        //           body: responseText, // Add the text message here
        //         },
        //       },
        //     });
        //     currentPosition = "main_menu";
        //     const FinalMessage = msg_body + "  User Provided Email::  " + Email;
        //     console.log("FinalMessage", FinalMessage)
        //     if (response.status === 200) {
        //       res.sendStatus(200);
        //     } else {
        //       res.sendStatus(response.status);
        //     }
        //     // Passing data to controller

        //     try {
        //       await chatbotModel.create({
        //         phone_number_id: phon_no_id,
        //         from,
        //         message: FinalMessage,
        //       });
        //     }
        //     catch (error) {
        //       console.error("Error saving data to the database:", error);
        //       res.sendStatus(500); // Send an internal server error status if the data save operation fails
        //     }

        //     // Passing data to nodemailer and sending mail to customer support team

        //     try {
        //       await sendUserResponseToEmail({
        //         FinalMessage,
        //       });
        //     }
        //     catch (error) {
        //       console.error("Error sending data to mail:", error);
        //       res.sendStatus(500); // Send an internal server error status if the data save operation fails
        //     }

        //   }
        //   catch (error) {
        //     console.error("Error sending message", error);
        //     res.sendStatus(500);
        //   }

        // }
        else {
          // if(validateMail === false)
          // {
          //   responseText = "Your entered email is invalid. Kindly input a valid email address.";

          // try {
          //   const response = await axios({
          //     method: "POST",
          //     url:
          //       "https://graph.facebook.com/v17.0/" +
          //       phon_no_id +
          //       "/messages?access_token=" +
          //       token,

          //     data: {
          //       messaging_product: "whatsapp",
          //       to: from,
          //       text: {
          //         body: responseText,
          //       },
          //     },

          //     headers: {
          //       "Content-Type": "application/json",
          //     },
          //   });

          //   if (response.status === 200) {
          //     res.sendStatus(200);
          //   } else {
          //     res.sendStatus(response.status);
          //   }

          // }
          // catch (error) {
          //   console.error("Error sending message", error);
          //   res.sendStatus(500);
          // }
          // }

          // responseText = "I apologize for the inconvenience. If the issue persists, it may be due to an invalid email entry. Otherwise, please proceed by following the menu options provided above."
          // for (const [keyword, template] of Object.entries(templates)) {
          //   if (msg_body.toLowerCase().includes(keyword)) {
          //     responseText = template;
          //     break;
          //   } else {
          //     responseText = "I apologize for the inconvenience. If the issue persists, it may be due to an invalid email entry. Otherwise, please proceed by following the menu options provided above."
          //   }
          // }

          // try {
          //   const response = await axios({
          //     method: "POST",
          //     url:
          //       "https://graph.facebook.com/v17.0/" +
          //       phon_no_id +
          //       "/messages?access_token=" +
          //       token,

          //     data: {
          //       messaging_product: "whatsapp",
          //       to: from,
          //       text: {
          //         body: responseText,
          //       },
          //     },

          //     headers: {
          //       "Content-Type": "application/json",
          //     },
          //   });

          //   if (response.status === 200) {
          //     res.sendStatus(200);
          //   } else {
          //     res.sendStatus(response.status);
          //   }

          // }
          // catch (error) {
          //   console.error("Error sending message", error);
          //   res.sendStatus(500);
          // }

          if (lowerCaseMsgBody) {
            try {
              // let invalidChecker = getCheckerInvalidEmail()
              console.log("last else inside checker position", invalidChecker)
              console.log("else wali position", currentPosition)
              if (currentPosition === "main_menu") {
                responseText = "sory_main_menu";

              }
              else if (currentPosition === "sub_menu_1") {
                responseText = "sorry_sub_menu_1";
              }
              else if (currentPosition === "sub_menu_2") {
                responseText = "sorry_technical_support";
              }
              else if ((currentPosition === "insideSub_menu_2") && (invalidChecker === true)) {

                responseText = "invalid_email_sub_menu_two";
                check = true;

              }
              else if (currentPosition === "insideSub_menu_2") {
                responseText = "sorry_sub_menu_2_of_2";
              }
              else if ((currentPosition === "sub_menu_3") && (invalidChecker === true)) {

                responseText = "invalid_email_sub_menu_two";
                check = true;

              }
              else if ((currentPosition === "sub_menu_4") && (invalidChecker === true)) {

                responseText = "invalid_email_sub_menu_two";
                check = true;

              }
              const languageCode = await getLanguageCode(responseText);
              const response = await axios({
                method: "POST",
                url:
                  "https://graph.facebook.com/v17.0/" +
                  phon_no_id +
                  "/messages?access_token=" +
                  token,

                headers: {
                  "Content-Type": "application/json",
                },
                data: {
                  messaging_product: "whatsapp",
                  to: from,
                  type: "template",
                  template: {
                    name: responseText,
                    language: {
                      code: languageCode,
                    },
                  },
                  text: {
                    body: responseText, // Add the text message here
                  },
                },
              });

              if (response.status === 200) {
                res.sendStatus(200);
              } else {
                res.sendStatus(response.status);
              }

            }
            catch (error) {
              console.error("Error sending message", error);
              res.sendStatus(500);
            }
          }
          else {
            responseText = "Input email is invalid. Please input valid email";

            try {
              const response = await axios({
                method: "POST",
                url:
                  "https://graph.facebook.com/v17.0/" +
                  phon_no_id +
                  "/messages?access_token=" +
                  token,

                data: {
                  messaging_product: "whatsapp",
                  to: from,
                  text: {
                    body: responseText,
                  },
                },

                headers: {
                  "Content-Type": "application/json",
                },
              });

              if (response.status === 200) {
                res.sendStatus(200);
              } else {
                res.sendStatus(response.status);
              }

            }
            catch (error) {
              console.error("Error sending message", error);
              res.sendStatus(500);
            }
          }
        }
      }
    } else {
      res.sendStatus(404);
    }
  }
});

app.get("/", (req, res) => {
  res.status(200).send("hello this is webhook setup");
});
app.listen(port, () => {
  console.log("webhook is listening", port);
});


