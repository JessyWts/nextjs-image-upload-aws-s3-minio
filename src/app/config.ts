const AWS_ACCESS_KEY_ID = process.env.AWS_ACCESS_KEY_ID || "";
const AWS_SECRET_ACCESS_KEY = process.env.AWS_SECRET_ACCESS_KEY || "";
const AWS_BUCKET_NAME = process.env.AWS_BUCKET_NAME || "";
const AWS_ENDPOINT = process.env.AWS_ENDPOINT || "";
const AWS_USE_PATH_STYLE_ENDPOINT = process.env.AWS_USE_PATH_STYLE_ENDPOINT;
const AWS_URL_BUCKET = process.env.AWS_URL_BUCKET || "";

const port = parseInt(process.env.AWS_PORT || "");
const AWS_PORT = Number.isInteger(port) ? port : 0;
const AWS_BUCKET_IMAGE_URL = "http://localhost:9000/imagebucket/";
const AWS_SHARE_TMP_URL =
  "http://localhost:8900/api/v1/download-shared-object/";

export {
  AWS_ACCESS_KEY_ID,
  AWS_SECRET_ACCESS_KEY,
  AWS_BUCKET_NAME,
  AWS_PORT,
  AWS_ENDPOINT,
  AWS_USE_PATH_STYLE_ENDPOINT,
  AWS_BUCKET_IMAGE_URL,
  AWS_SHARE_TMP_URL,
  AWS_URL_BUCKET,
};
