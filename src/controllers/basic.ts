import express from "express";
const app = express();

export const getData = async (req: express.Request, res: express.Response) => {
  try {
    res.status(200).json({
      status: "ok",
      timestamp: new Date().toISOString(),
      message: "getData endpoint is working!",
      description:
        "This endpoint is for retrieving data. You can send a GET request to this endpoint to receive a response confirming that the endpoint is working.",
    });
  } catch (error) {
    console.log(error);
    return res.status(500).json({ error: "Internal server error" });
  }
};

export const postData = async (req: express.Request, res: express.Response) => {
  try {
    res.status(200).json({
      status: "ok",
      timestamp: new Date().toISOString(),
      message: "postData endpoint is working!",
      description:
        "This endpoint is for creating new data. You can send a POST request with the data in the request body.",
    });
  } catch (error) {
    console.log(error);
    return res.status(500).json({ error: "Internal server error" });
  }
};

export const putData = async (req: express.Request, res: express.Response) => {
  try {
    res.status(200).json({
      status: "ok",
      timestamp: new Date().toISOString(),
      message: "putData endpoint is working!",
      description:
        "This endpoint is for updating existing data. You can send a PUT request with the updated data in the request body.",
    });
  } catch (error) {
    console.log(error);
    return res.status(500).json({ error: "Internal server error" });
  }
};

export const patchData = async (
  req: express.Request,
  res: express.Response,
) => {
  try {
    res.status(200).json({
      status: "ok",
      timestamp: new Date().toISOString(),
      message: "patchData endpoint is working!",
      description:
        "This endpoint is for partially updating existing data. You can send a PATCH request with the fields you want to update in the request body.",
    });
  } catch (error) {
    console.log(error);
    return res.status(500).json({ error: "Internal server error" });
  }
};

export const deleteData = async (
  req: express.Request,
  res: express.Response,
) => {
  try {
    res.status(200).json({
      status: "ok",
      timestamp: new Date().toISOString(),
      message: "deleteData endpoint is working!",
      description:
        "This endpoint is for deleting existing data. You can send a DELETE request to this endpoint to remove the data.",
    });
  } catch (error) {
    console.log(error);
    return res.status(500).json({ error: "Internal server error" });
  }
};

export const connectData = async (
  req: express.Request,
  res: express.Response,
) => {
  try {
    res.status(200).json({
      status: "ok",
      timestamp: new Date().toISOString(),
      message: "connectData endpoint is working!",
      description:
        "This endpoint is for connecting to the API. You can send a CONNECT request to this endpoint to establish a connection.",
    });
  } catch (error) {
    console.log(error);
    return res.status(500).json({ error: "Internal server error" });
  }
};

export const optionsData = async (
  req: express.Request,
  res: express.Response,
) => {
  try {
    res.status(200).json({
      status: "ok",
      timestamp: new Date().toISOString(),
      message: "optionsData endpoint is working!",
      description:
        "This endpoint is for retrieving the options for the API. You can send an OPTIONS request to this endpoint to get the available methods and headers.",
    });
  } catch (error) {
    console.log(error);
    return res.status(500).json({ error: "Internal server error" });
  }
};

export const traceData = async (
  req: express.Request,
  res: express.Response,
) => {
  try {
    res.status(200).json({
      status: "ok",
      timestamp: new Date().toISOString(),
      message: "traceData endpoint is working!",
      description:
        "This endpoint is for tracing requests through the API. You can send a TRACE request to this endpoint to see the request headers.",
    });
  } catch (error) {
    console.log(error);
    return res.status(500).json({ error: "Internal server error" });
  }
};