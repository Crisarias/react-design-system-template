import { vi, beforeAll, afterAll, expect, afterEach } from 'vitest'
import { act, cleanup, render } from '@testing-library/react'
import * as matchers from '@testing-library/jest-dom/matchers'
import { configure } from '@testing-library/react'
import '@testing-library/jest-dom'

expect.extend(matchers)

vi.stubGlobal('open', vi.fn())

configure({
  testIdAttribute: 'id'
})

const mockMatchMedia = vi.fn((query) => ({
  matches: false,
  media: query,
  onchange: null,
  addListener: vi.fn(), // deprecated
  removeListener: vi.fn(), // deprecated
  addEventListener: vi.fn(),
  removeEventListener: vi.fn(),
  dispatchEvent: vi.fn()
}))

vi.stubGlobal('matchMedia', mockMatchMedia)

const resizeObserverMock = vi.fn(() => ({
  observe: vi.fn(),
  unobserve: vi.fn(),
  disconnect: vi.fn()
}))

vi.stubGlobal('ResizeObserver', resizeObserverMock)

export const locationMock = {
  ...window.location,
  search: '',
  assign: vi.fn(),
  reload: vi.fn()
}

vi.stubGlobal('location', locationMock)

export const mockAxios = {
  interceptors: {
    request: { use: vi.fn(), eject: vi.fn() },
    response: { use: vi.fn(), eject: vi.fn() }
  },
  get: vi.fn(),
  post: vi.fn(),
  put: vi.fn(),
  delete: vi.fn()
}

vi.mock('axios', () => {
  return {
    default: {
      create: () => mockAxios
    }
  }
})

export const mockUseNavigate = {
  navigate: vi.fn()
}

vi.mock(import('react-router'), async (importOriginal) => {
  const actual = await importOriginal()
  return {
    ...actual,
    useNavigate: () => mockUseNavigate
  }
})

vi.mock(import('react-router-dom'), async (importOriginal) => {
  const actual = await importOriginal()
  return {
    ...actual,
    useSearchParams: () => [new URLSearchParams(''), vi.fn()]
  }
})

// Ignore non critical errors
const originalError = console.error

beforeAll(() => {
  console.error = (...args) => {
    if (/Warning.*not wrapped in act/.test(args[0])) {
      return
    }
    originalError.call(console, ...args)
  }
})

afterAll(() => {
  console.error = originalError
})

afterEach(() => {
  cleanup()
})

export const actRender = async (component, config) => {
  const renderedComponent = await act(async () => render(component, config))
  return renderedComponent
}
