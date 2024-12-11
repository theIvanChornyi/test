class HTTPService {

  BASE_ROUT: string
  constructor() {
    this.BASE_ROUT = process.env.BACKEND_URL ?? ''
  }

  

}

export default HTTPService