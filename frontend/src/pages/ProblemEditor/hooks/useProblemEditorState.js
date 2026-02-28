import { useState, useEffect } from "react";
import { useSubmission } from "../../../hooks/useSubmission";
import { useSocket } from "../../../hooks/useSocket";

export default function useProblemEditorState(problemId, problem) {
  const { submitCode, runCode, getUserSubmission } = useSubmission();

  const [runResult, setRunResult] = useState(null);
  const [submitResult, setSubmitResult] = useState(null);
  const [submissions, setSubmissions] = useState([]);
  const [runStream, setRunStream] = useState([]);
  const [submitting, setSubmitting] = useState(false);

  // =============================
  // Initialize visible testcases
  // =============================
  useEffect(() => {
    if (!problem?.visibleTestCases) return;

    const initial = problem.visibleTestCases.map((tc, i) => ({
      id: i + 1,
      status: "PENDING",
      ok: null,
      input: tc.input,
      output: "",
      expected: tc.output,
      error: null,
    }));

    setRunStream(initial);
  }, [problem]);

  // =============================
  // Fetch submissions
  // =============================
  useEffect(() => {
    if (!problemId) return;

    (async () => {
      const res = await getUserSubmission(problemId);
      setSubmissions(res?.data?.data || []);
    })();
  }, [problemId]);

  // =============================
  // Socket Handling
  // =============================
  useSocket({
    onTestcaseUpdate: (data) => {
      setRunStream((prev) => {
        const exists = prev.find((tc) => tc.id === data.index);

        const updatedCase = {
          id: data.index,
          status: data.verdict,
          ok: data.verdict === "PASSED",
          input: exists?.input || "",
          output: data.output || "",
          expected: data.expectedOutput || exists?.expected || "",
          error:
            data.verdict !== "PASSED" && data.verdict !== "WRONG_ANSWER"
              ? data.output || "Execution error"
              : null,
        };

        if (exists) {
          return prev.map((tc) => (tc.id === data.index ? updatedCase : tc));
        }

        return [...prev, updatedCase];
      });
    },

    onRunResult: (data) => {
      setRunResult({
        type: data.verdict.toLowerCase(),
        error: data.output || null,
      });

      setSubmitting(false);
    },

    onSubmissionResult: async (data) => {
      setSubmitResult(data);
      setSubmitting(false);

      const res = await getUserSubmission(problemId);
      setSubmissions(res?.data?.data || []);
    },

    setSubmitting,
  });

  // =============================
  // Run Handler
  // =============================
  const handleRun = async (code) => {
    setSubmitting(true);
    setRunResult({ type: "running" });
    setSubmitResult(null);

    // Reset testcase outputs
    setRunStream((prev) =>
      prev.map((tc) => ({
        ...tc,
        ok: null,
        output: "",
        error: null,
      })),
    );

    await runCode(problemId, code);
  };

  // =============================
  // Submit Handler
  // =============================
  const handleSubmit = async (code) => {
    setSubmitting(true);
    setSubmitResult({ type: "judging" });
    setRunResult(null);

    await submitCode(problemId, code);
  };

  return {
    runResult,
    submitResult,
    submissions,
    submitting,
    runStream,
    setRunStream,
    handleRun,
    handleSubmit,
  };
}
