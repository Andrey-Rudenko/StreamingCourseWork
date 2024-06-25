"use client"

import { Suspense } from 'react'
import Counter from './Components/Counter'

function getData(): Promise<{name: string}[]> {
  return new Promise((resolve, reject) => {
    global.setTimeout(() => {
      resolve([
        { name: 'Василий Васильевич' },
        { name: 'Иван Иванов' },
        { name: 'Петр Петров' },
        { name: 'Сергей Сергеев' },
        { name: 'Алексей Алексеев' },
        { name: 'Ярослав Ярославович' },
      ])
    }, 3000)
  })
}

function createFetch<T>(func: () => Promise<T>) {
  let status = 'pending'
  let isSend = false
  let response: T
  let promise: unknown
  return {
    send: () => {
      if (!isSend) {
        promise = func().then(
          (res) => {
            status = 'inject'
            response = res
          },
          (err) => {
            status = 'error',
            response = err
          }
        )
        isSend = true
      }
    },
    read: (): T => {
      switch (status) {
        case 'pending':
          throw promise
        default:
          return response
      }
    },
  }
}

const fetch = createFetch(getData)

export default function Home() {
  return (
<div className="container">
  <div className="counter-container">
    <Counter />
  </div>
  <div className="card-container">
    <Suspense fallback={<div className="loader-container">
      <div className="loader"></div>
    </div>}>
      <TestComponent />
    </Suspense>
  </div>
</div>
  )
}

const TestComponent = () => {
  fetch.send()
  const data = fetch.read()
  return (
    <div className='card-container'>
      {data?.map((item, index) => (
        <div className='card' key={index}>
          <div>hello</div>
          <div>{item.name}</div>
        </div>
      ))}
    </div>
  )
}