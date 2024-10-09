exports.handler = async (event) => {
  const { amount } = JSON.parse(event.body);

  const accessKey = "F8BBA842ECF85";
  const secretKey = "K951B6PE1waDMi640xX08PD3vg6EkVlz";
  const partnerCode = "MOMO";
  const redirectUrl =
    "https://regal-banoffee-49bcae.netlify.app/checkout/payment/thanks";
  const ipnUrl =
    "https://regal-banoffee-49bcae.netlify.app/checkout/payment/thanks";
  const requestType = "payWithMethod";
  const orderId = partnerCode + new Date().getTime();
  const requestId = orderId;
  const orderInfo = `payment test package Member${orderId}`;
  const extraData = "";
  const orderGroupId = "";
  const autoCapture = true;
  const lang = "vi";

  const rawSignature =
    "accessKey=" +
    accessKey +
    "&amount=" +
    amount +
    "&extraData=" +
    extraData +
    "&ipnUrl=" +
    ipnUrl +
    "&orderId=" +
    orderId +
    "&orderInfo=" +
    orderInfo +
    "&partnerCode=" +
    partnerCode +
    "&redirectUrl=" +
    redirectUrl +
    "&requestId=" +
    requestId +
    "&requestType=" +
    requestType;

  const crypto = require("crypto");
  const signature = crypto
    .createHmac("sha256", secretKey)
    .update(rawSignature)
    .digest("hex");

  const requestBody = JSON.stringify({
    partnerCode: partnerCode,
    partnerName: "Test",
    storeId: "MomoTestStore",
    requestId: requestId,
    amount: amount,
    orderId: orderId,
    orderInfo: orderInfo,
    redirectUrl: redirectUrl,
    ipnUrl: ipnUrl,
    lang: lang,
    requestType: requestType,
    autoCapture: autoCapture,
    extraData: extraData,
    orderGroupId: orderGroupId,
    signature: signature,
  });

  const https = require("https");
  const options = {
    hostname: "test-payment.momo.vn",
    port: 443,
    path: "/v2/gateway/api/create",
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      "Content-Length": Buffer.byteLength(requestBody),
    },
  };

  function makeMomoApiRequest() {
    return new Promise((resolve, reject) => {
      const req = https.request(options, (res) => {
        let responseBody = "";

        res.on("data", (chunk) => {
          responseBody += chunk;
        });

        res.on("end", () => {
          console.log("No more data in response.");

          try {
            const responseObj = JSON.parse(responseBody);
            console.log(responseObj);

            const responseData = {
              statusCode: 200,
              headers: {
                "Content-Type": "application/json",
              },
              body: JSON.stringify({ response: responseObj }),
            };

            console.log("--------------------RESPONSE----------------");

            resolve(responseData);
          } catch (error) {
            console.error("Error parsing Momo API response:", error);
            const errorResponse = {
              statusCode: 500,
              headers: {
                "Content-Type": "application/json",
              },
              body: JSON.stringify({
                error: "Error parsing Momo API response",
              }),
            };
            reject(errorResponse);
          }
        });
      });

      req.on("error", (e) => {
        console.log(`problem with request: ${e.message}`);

        const errorResponse = {
          statusCode: 500,
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ error: "Momo API request failed" }),
        };
        reject(errorResponse);
      });

      console.log("Sending....");
      req.write(requestBody);
      req.end();
    });
  }

  try {
    const response = await makeMomoApiRequest();
    return response;
  } catch (error) {
     return {
       statusCode: 500,
       headers: {
         "Content-Type": "application/json",
         "Access-Control-Allow-Origin": "*",
       },
       body: JSON.stringify({
         error: "Internal Server Error",
         message: error.message,
       }),
     };
  }
};
