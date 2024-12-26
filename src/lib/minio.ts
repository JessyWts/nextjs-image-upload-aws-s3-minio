import { Client } from "minio";
import {
  AWS_ACCESS_KEY_ID,
  AWS_ENDPOINT,
  AWS_PORT,
  AWS_SECRET_ACCESS_KEY,
} from "../app/config";

const minioClient = new Client({
  endPoint: AWS_ENDPOINT,
  port: AWS_PORT,
  useSSL: false,
  accessKey: AWS_ACCESS_KEY_ID,
  secretKey: AWS_SECRET_ACCESS_KEY,
  pathStyle: true,
});

export default minioClient;
