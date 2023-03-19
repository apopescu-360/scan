class HttpException {
  constructor (errorDetails, code, internalErrorCode, id) {
    this.message = errorDetails
    this.code = code
    this.internalErrorCode = internalErrorCode
    this.Id = id
  }

  getMessage () {
    return this.message
  }

  getCode () {
    return this.code
  }

  getInternalErrorCode () {
    return this.internalErrorCode
  }

  getInternalErrorId () {
    return this.Id
  }

  isAnyAuthorizationProblem () {
    return this.isUnauthorized() || this.isForbidden()
  }

  isUnauthorized () {
    return this.code === 401
  }

  isForbidden () {
    return this.code === 403
  }

  isConflict () {
    return this.code === 409
  }

  isLocked () {
    return this.code === 423
  }

  isOk () {
    return this.code >= 200 && this.code < 300
  }

  isInternalServerError () {
    return this.code === 500
  }

  isServiceUnavailable () {
    return this.code === 503
  }

  isBadRequest () {
    return this.code === 400
  }
}
export default HttpException
