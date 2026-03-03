import {
  createContext,
  useContext,
  useState,
  useCallback,
  useEffect,
} from "react";

const Ctx = createContext(null);

export const PROBLEMS = [
  {
    id: 1,
    title: "Two Sum",
    difficulty: "Easy",
    tags: ["Array", "Hash Table"],
    acceptance: "49.1%",
    status: "solved",
  },
  {
    id: 2,
    title: "Add Two Numbers",
    difficulty: "Medium",
    tags: ["Linked List", "Math"],
    acceptance: "38.5%",
    status: "attempted",
  },
  {
    id: 3,
    title: "Longest Substring Without Repeating Characters",
    difficulty: "Medium",
    tags: ["String", "Sliding Window"],
    acceptance: "33.4%",
    status: null,
  },
  {
    id: 4,
    title: "Median of Two Sorted Arrays",
    difficulty: "Hard",
    tags: ["Array", "Binary Search"],
    acceptance: "35.6%",
    status: null,
  },
  {
    id: 5,
    title: "Longest Palindromic Substring",
    difficulty: "Medium",
    tags: ["String", "DP"],
    acceptance: "32.7%",
    status: "solved",
  },
  {
    id: 6,
    title: "Zigzag Conversion",
    difficulty: "Medium",
    tags: ["String"],
    acceptance: "43.0%",
    status: null,
  },
  {
    id: 7,
    title: "Reverse Integer",
    difficulty: "Medium",
    tags: ["Math"],
    acceptance: "27.2%",
    status: null,
  },
  {
    id: 8,
    title: "String to Integer (atoi)",
    difficulty: "Medium",
    tags: ["String"],
    acceptance: "16.5%",
    status: "attempted",
  },
  {
    id: 9,
    title: "Palindrome Number",
    difficulty: "Easy",
    tags: ["Math"],
    acceptance: "52.5%",
    status: "solved",
  },
  {
    id: 10,
    title: "Regular Expression Matching",
    difficulty: "Hard",
    tags: ["String", "DP"],
    acceptance: "28.1%",
    status: null,
  },
  {
    id: 11,
    title: "Container With Most Water",
    difficulty: "Medium",
    tags: ["Array", "Two Pointers"],
    acceptance: "54.0%",
    status: null,
  },
  {
    id: 12,
    title: "3Sum",
    difficulty: "Medium",
    tags: ["Array", "Two Pointers"],
    acceptance: "31.9%",
    status: null,
  },
  {
    id: 13,
    title: "Roman to Integer",
    difficulty: "Easy",
    tags: ["Math", "String"],
    acceptance: "58.0%",
    status: "solved",
  },
  {
    id: 14,
    title: "Longest Common Prefix",
    difficulty: "Easy",
    tags: ["String"],
    acceptance: "40.8%",
    status: null,
  },
  {
    id: 15,
    title: "Letter Combinations of a Phone Number",
    difficulty: "Medium",
    tags: ["String", "Backtracking"],
    acceptance: "54.3%",
    status: null,
  },
];

export const SUBMISSIONS = [
  {
    id: 1,
    problem: "Two Sum",
    verdict: "Accepted",
    lang: "JavaScript",
    time: "68ms",
    memory: "42.1MB",
    date: "2025-02-20",
  },
  {
    id: 2,
    problem: "Palindrome Number",
    verdict: "Accepted",
    lang: "Python",
    time: "52ms",
    memory: "38.7MB",
    date: "2025-02-19",
  },
  {
    id: 3,
    problem: "Add Two Numbers",
    verdict: "Wrong Answer",
    lang: "JavaScript",
    time: "—",
    memory: "—",
    date: "2025-02-18",
  },
  {
    id: 4,
    problem: "Longest Palindromic Substring",
    verdict: "Accepted",
    lang: "JavaScript",
    time: "112ms",
    memory: "45.3MB",
    date: "2025-02-17",
  },
  {
    id: 5,
    problem: "String to Integer (atoi)",
    verdict: "Time Limit Exceeded",
    lang: "Python",
    time: "—",
    memory: "—",
    date: "2025-02-16",
  },
];

export function AppProvider({ children }) {
  const [dark, setDark] = useState(true);
  const [user, setUser] = useState(null);
  const [page, setPage] = useState("landing");
  const [problem, setProblem] = useState(PROBLEMS[0]);

  // sync dark class on <html>
  useEffect(() => {
    document.documentElement.classList.toggle("dark", dark);
  }, [dark]);

  const go = useCallback((p, data) => {
    if (p === "problem" && data) setProblem(data);
    setPage(p);
    window.scrollTo(0, 0);
  }, []);

  const login = useCallback((email, name) => {
    setUser({
      email,
      name: name || email.split("@")[0],
      avatar: (name || email)[0].toUpperCase(),
    });
    setPage("dashboard");
  }, []);

  const logout = useCallback(() => {
    setUser(null);
    setPage("landing");
  }, []);

  return (
    <Ctx.Provider
      value={{
        dark,
        setDark,
        user,
        login,
        logout,
        page,
        go,
        problem,
        problems: PROBLEMS,
        submissions: SUBMISSIONS,
      }}
    >
      {children}
    </Ctx.Provider>
  );
}

export const useApp = () => useContext(Ctx);
