import { useContext } from "react"
import { FeedbackContext } from "../contexts/Feedback"

export function useFeedback() {
    return useContext(FeedbackContext)
}
