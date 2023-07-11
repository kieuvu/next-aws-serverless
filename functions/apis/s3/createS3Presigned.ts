import { randomUUID } from "crypto";
import S3Service from "../../services/S3Service";
import { createResponse } from "../../utils/sendResponse";

export const handler = async (event: any) => {
  const { fileType } = event.queryStringParameters ?? {};

  const post = S3Service.createPresignedPost({
    key: `images/${randomUUID()}`,
    "Content-Type": fileType,
  });

  return createResponse(200, post);
};
