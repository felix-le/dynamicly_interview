function responseServer(response, statusCode, message, data) {
  const responseData = {
    message,
    status: statusCode,
    result: data.length,
  };

  if (data) {
    responseData.data = data;
  }
  return response.status(statusCode).json(responseData);
}

function raiseException(response, statusCode, message, error) {
  const exceptionBody = {
    message,
    status: statusCode,
  };

  if (error) {
    exceptionBody.error = error;
  }

  return response.status(statusCode).json(exceptionBody);
}

module.exports = { responseServer, raiseException };
