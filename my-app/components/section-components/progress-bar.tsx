import React from "react"
import { isLoadingAtom, progressAtom } from "@/atoms/globalAtoms"
import { useAtom } from "jotai"

import { Progress } from "@/components/ui/progress"

const ProgressBar = () => {
  const [progress, setProgress] = useAtom(progressAtom)
  const [isLoading] = useAtom(isLoadingAtom)
  React.useEffect(() => {
    setInterval(() => {
      if (progress < 95) {
        setProgress((prev) => prev + 1)
      }
    }, 2000)
  }, [progress])

  return isLoading ? (
    <Progress value={progress} className="w-[60%]" />
  ) : (
    <div></div>
  )
}

export default ProgressBar
