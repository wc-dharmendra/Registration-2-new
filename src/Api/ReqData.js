import AuthInstance from "./FetchInstance";

const ReqData = async (
  url = null,
  reqData = {},
  method = "get",
  params = {},
  headers = {},
  onUploadProgress = null
) => {
  try {
    const data = await AuthInstance[method](
      `${url}`, reqData,
      { headers, params, onUploadProgress }
    );
    return data;
  } catch (error) {
    return error;
  } finally {
  }
};

export default ReqData;
