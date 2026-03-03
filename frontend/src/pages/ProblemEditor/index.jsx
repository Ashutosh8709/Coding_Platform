import { useParams } from "react-router-dom";
import { useProblem } from "../../hooks/useProblem";
import ProblemLayout from "./ProblemLayout";
import useProblemEditorState from "./hooks/useProblemEditorState";

export default function ProblemEditor() {
  const { problemId } = useParams();
  const { problem, loading } = useProblem(problemId);

  const editorState = useProblemEditorState(problemId, problem);
  if (loading || !problem) return null;

  return <ProblemLayout problem={problem} {...editorState} />;
}
