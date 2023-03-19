import { HttpException } from "@/model/model.js"
import axios from "axios"

class PromiseHelper {
  static async createSuccessfullResult (data) {
    if (data != null) {
      try {
        return Promise.resolve(data)
      } catch (err) {
        return Promise.reject(new HttpException("Invalid json", -2))
      }
    } else {
      return Promise.resolve({})
    }
  }

  static async createErroneousResult (response, data) {
    if (data || data?.length > 0) {
      const dataItem = (data.constructor === Array) ? data[0] : data
      return Promise.reject(
        new HttpException(
          dataItem?.ErrorDetails ?? (data?.ErrorDetails ?? response.statusText),
          response.status,
          dataItem?.ErrorCode,
          dataItem?.Id
        )
      )
    } else {
      return Promise.reject(
        new HttpException(response.statusText, response.status)
      )
    }
  }

  static async fetchWithErrorHandling (url, args = {}) {
    try {
      const response = await axios.get(url, args)
      // eslint-disable-next-line
      if (response && response.status === 200 && response.data != undefined) {
        return this.createSuccessfullResult(response.data)
      }
      return this.generalHttpException()
    } catch (error) {
      if (error.response) {
        return this.createErroneousResult(error.response, error.response.data)
      }
    }
  }

  static async makeRequest (request) {
    try {
      const response = await request()
      // eslint-disable-next-line
      if (response && response.status === 200 && response.data != undefined) {
        return this.createSuccessfullResult(response.data)
      }
      return this.generalHttpException()
    } catch (error) {
      if (error.response) {
        return this.createErroneousResult(error.response, error.response.data)
      }
    }
  }

  static async sendRequest (request) {
    try {
      const response = await request()
      const models = response.data
      if (response.status === 200) {
        return PromiseHelper.createSuccessfullResult(models)
      }
    } catch (err) {
      const error = err?.response?.data?.errors[0]
      if (error) {
        return Promise.reject(new HttpException(error.details, error.status, error.code, null))
      }

      return Promise.reject(new HttpException(error.details, -1, null))
    }
  }

  static generalHttpException () {
    return Promise.reject(new HttpException("Request failed!"))
  }
}
export { PromiseHelper }
