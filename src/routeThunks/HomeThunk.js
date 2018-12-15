export default async function HomeThunk(dispatch) {
  const getSaludo = () => new Promise((res, rej) => res('This is only a test, to know asyn works in browser or server'))
  const saludo = await getSaludo()
  console.log(saludo)
}
