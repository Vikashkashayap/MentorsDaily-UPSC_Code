const responseStatus = require("./responseStatus.json");
const responseData = require("./responseData.json");

function setSuccess(res, data) {
  res.status(responseStatus.STATUS_SUCCESS_OK);
  res.json({ success: responseData.SUCCESS, data });
}

function setCreateSuccess(res, data) {
  res.status(responseStatus.STATUS_SUCCESS_CREATED);
  res.json({ success: responseData.SUCCESS, data });
}

function setNotAuthorized(res, data) {
  res.status(responseStatus.NOT_AUTHORIZED);
  res.json({ success: responseData.ERROR, data });
}

function setNotFoundError(res, data) {
  res.status(responseStatus.NOT_FOUND);
  res.json({ success: responseData.ERROR, data });
}

function setForbidden(res, data) {
  res.status(responseStatus.FORBIDDEN);
  res.json({ success: responseData.ERROR, data });
}

function setBadRequest(res, data) {
  res.status(responseStatus.BAD_REQUEST);
  res.json({ success: responseData.ERROR, data });
}

function setConflictError(res, data) {
  res.status(responseStatus.CONFLICT);
  res.json({ success: responseData.ERROR, data });
}

function setServerError(res, data) {
  res.status(responseStatus.INTERNAL_SERVER_ERROR);
  res.json({ success: responseData.ERROR, data });
}

function createResponseSetter(moduleName) {
  return function setResponse(req, res, err, model) {
    if (err) {
      setServerError(res, `Error occured: ${err}`);
    } else {
      const module = model[moduleName];
      if (module) {
        setSuccess(res, { moduleName: module });
      } else {
        setNotFoundError(res, `${moduleName}: ${req.params.id} not found`);
      }
    }
  };
}

module.exports = {
  responseStatus,
  responseData,
  setSuccess,
  setCreateSuccess,
  setNotAuthorized,
  setNotFoundError,
  setForbidden,
  setBadRequest,
  setConflictError,
  setServerError,
  createResponseSetter,
};
