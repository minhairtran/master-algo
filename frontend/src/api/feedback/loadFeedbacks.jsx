import lookup from '../index'

export const loadFeedbacks = (callback) => {
      lookup("GET", "/feedbacks/", callback)
  }

export default loadFeedbacks;