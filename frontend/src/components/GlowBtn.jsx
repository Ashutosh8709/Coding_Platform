// import { useState } from "react";
// import { C } from "../theme";

// export function GlowBtn({
//   children,
//   onClick,
//   disabled,
//   variant = "primary",
//   style = {},
// }) {
//   const [hov, setHov] = useState(false);

//   const base = {
//     display: "inline-flex",
//     alignItems: "center",
//     gap: 8,
//     padding: "10px 22px",
//     borderRadius: 12,
//     border: "none",
//     fontFamily: "Outfit, sans-serif",
//     fontWeight: 700,
//     fontSize: 14,
//     cursor: disabled ? "not-allowed" : "pointer",
//     transition: "all 0.2s ease",
//     outline: "none",
//     opacity: disabled ? 0.5 : 1,
//     letterSpacing: "0.02em",
//     ...style,
//   };

//   if (variant === "primary") {
//     return (
//       <button
//         onClick={onClick}
//         disabled={disabled}
//         onMouseEnter={() => setHov(true)}
//         onMouseLeave={() => setHov(false)}
//         style={{
//           ...base,
//           background: "linear-gradient(135deg, #8b5cf6, #06b6d4)",
//           color: "#fff",
//           boxShadow:
//             hov && !disabled
//               ? "0 0 32px rgba(139,92,246,0.55), 0 4px 20px rgba(0,0,0,0.3)"
//               : "0 0 16px rgba(139,92,246,0.2)",
//           transform: hov && !disabled ? "translateY(-1px)" : "none",
//         }}
//       >
//         {children}
//       </button>
//     );
//   }

//   return (
//     <button
//       onClick={onClick}
//       disabled={disabled}
//       onMouseEnter={() => setHov(true)}
//       onMouseLeave={() => setHov(false)}
//       style={{
//         ...base,
//         background: hov ? "rgba(139,92,246,0.12)" : "transparent",
//         color: C.violet,
//         border: `1px solid ${hov ? C.violet : "rgba(139,92,246,0.35)"}`,
//         transform: hov && !disabled ? "translateY(-1px)" : "none",
//       }}
//     >
//       {children}
//     </button>
//   );
// }
