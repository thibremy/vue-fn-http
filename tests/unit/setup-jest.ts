import { GlobalWithFetchMock } from 'jest-fetch-mock'

const customGlobal = global as any
customGlobal.fetch = require('jest-fetch-mock')
customGlobal.fetchMock = customGlobal.fetch
