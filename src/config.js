const apiOrigin = process.env.REACT_APP_API_ORIGIN || 'https://whatsthat-api.german-fighter.workers.dev'

export default apiOrigin.replace(/\/$/, '')

