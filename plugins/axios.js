export default function ({ $axios, redirect }) {
  $axios.onRequest((config) => {
    console.log('Making request to ' + config.url)
  })

  $axios.onError((error) => {
    const url = error.response.config.url
    if (!/pokemon\/.+/.test(url)) {
      const code = parseInt(error.response && error.response.status)
      if (code === 404) {
        redirect('/404')
      } else {
        redirect('/500')
      }
    }
  })
}
