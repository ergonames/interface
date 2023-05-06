import { Html, Head, Main, NextScript } from 'next/document'

export default function Document() {
  return (
    <Html lang="en">
      <Head>
      	<style> @import url('https://fonts.googleapis.com/css?family=Montserrat:400,700&display=swap'); </style>
      	<style> @import url('https://fonts.googleapis.com/css?family=Roboto:400,700&display=swap'); </style>
      </Head>
  	  <body>
        <Main />
        <NextScript />
      </body>
    </Html>
  )
}
