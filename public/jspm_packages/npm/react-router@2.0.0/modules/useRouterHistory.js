/* */ 
"format cjs";
import useQueries from 'history/lib/useQueries'
import useBasename from 'history/lib/useBasename'

export default function useRouterHistory(createHistory) {
  return function (options) {
    const history = useQueries(useBasename(createHistory))(options)
    history.__v2_compatible__ = true
    return history
  }
}
