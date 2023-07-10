import SQSService from "../_services/SQSService";

export default async function handler(req: any, res: any) {
  await SQSService.sendQueue({
    from: "Vukm",
    data: {
      message: "Test queue job dispatch",
      time: new Date(),
    },
  });

  res.status(200).json({
    status: true,
  });
}
