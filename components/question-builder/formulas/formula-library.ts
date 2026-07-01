export interface FormulaItem {
  label: string;
  latex: string;
}

/* ===============================
   MATHEMATICS
================================ */

export const MATH_FORMULAS: FormulaItem[] = [
  { label: "Fraction", latex: "\\frac{}{ }" },
  { label: "Square Root", latex: "\\sqrt{}" },
  { label: "Cube Root", latex: "\\sqrt[3]{}" },
  { label: "Power", latex: "x^{}" },
  { label: "Subscript", latex: "x_{}" },
  { label: "Integral", latex: "\\int" },
  { label: "Double Integral", latex: "\\iint" },
  { label: "Triple Integral", latex: "\\iiint" },
  { label: "Summation", latex: "\\sum" },
  { label: "Product", latex: "\\prod" },
  { label: "Limit", latex: "\\lim_{x \\to }" },
  { label: "Infinity", latex: "\\infty" },
  { label: "Partial Derivative", latex: "\\partial" },
  { label: "Nabla", latex: "\\nabla" },
  { label: "Vector", latex: "\\vec{}" },
  { label: "Hat", latex: "\\hat{}" },
  { label: "Bar", latex: "\\bar{}" },
  { label: "Dot", latex: "\\dot{}" },
  { label: "Double Dot", latex: "\\ddot{}" },
  { label: "Angle", latex: "\\angle" },
  { label: "Degree", latex: "^\\circ" },
  { label: "Parallel", latex: "\\parallel" },
  { label: "Perpendicular", latex: "\\perp" },
  { label: "Approximately", latex: "\\approx" },
  { label: "Not Equal", latex: "\\neq" },
  { label: "Less Than or Equal", latex: "\\leq" },
  { label: "Greater Than or Equal", latex: "\\geq" },
  { label: "Plus Minus", latex: "\\pm" },
  { label: "Minus Plus", latex: "\\mp" },
  { label: "Union", latex: "\\cup" },
  { label: "Intersection", latex: "\\cap" },
  { label: "Subset", latex: "\\subset" },
  { label: "Superset", latex: "\\supset" },
  { label: "Absolute Value", latex: "\\left|\\right|" },
  { label: "Floor", latex: "\\lfloor \\rfloor" },
  { label: "Ceiling", latex: "\\lceil \\rceil" },
  { label: "Binomial", latex: "\\binom{}{ }" },
  {
    label: "Matrix (2x2)",
    latex: "\\begin{bmatrix} & \\\\ & \\end{bmatrix}",
  },
  {
    label: "Determinant",
    latex: "\\begin{vmatrix} & \\\\ & \\end{vmatrix}",
  },
];

/* ===============================
   PHYSICS
================================ */

export const PHYSICS_FORMULAS: FormulaItem[] = [
  { label: "Velocity", latex: "v" },
  { label: "Acceleration", latex: "a" },
  { label: "Force", latex: "F=ma" },
  { label: "Momentum", latex: "p=mv" },
  { label: "Work", latex: "W=Fs" },
  { label: "Power", latex: "P=\\frac{W}{t}" },
  { label: "Energy", latex: "E" },
  { label: "Kinetic Energy", latex: "KE=\\frac12 mv^2" },
  { label: "Potential Energy", latex: "PE=mgh" },
  { label: "Torque", latex: "\\tau=rF" },
  { label: "Angular Velocity", latex: "\\omega" },
  { label: "Angular Acceleration", latex: "\\alpha" },
  { label: "Angular Momentum", latex: "L=I\\omega" },
  { label: "Electric Field", latex: "E=\\frac{F}{q}" },
  { label: "Electric Potential", latex: "V=\\frac{W}{q}" },
  { label: "Current", latex: "I=\\frac{Q}{t}" },
  { label: "Resistance", latex: "R=\\frac{V}{I}" },
  { label: "Capacitance", latex: "C=\\frac{Q}{V}" },
  { label: "Magnetic Flux", latex: "\\Phi=BA" },
  { label: "Lens Formula", latex: "\\frac1f=\\frac1v-\\frac1u" },
  { label: "Mirror Formula", latex: "\\frac1f=\\frac1v+\\frac1u" },
  { label: "Snell's Law", latex: "n_1\\sin\\theta_1=n_2\\sin\\theta_2" },
];

/* ===============================
   CHEMISTRY
================================ */

export const CHEMISTRY_FORMULAS: FormulaItem[] = [
  { label: "Reaction Arrow", latex: "\\rightarrow" },
  { label: "Equilibrium", latex: "\\rightleftharpoons" },
  { label: "Delta", latex: "\\Delta" },
  { label: "Catalyst", latex: "\\xrightarrow{cat}" },
  { label: "Electron", latex: "e^{-}" },
  { label: "Proton", latex: "H^{+}" },
  { label: "Hydroxide", latex: "OH^{-}" },
  { label: "Hydronium", latex: "H_3O^{+}" },
  { label: "Benzene", latex: "C_6H_6" },
  { label: "Carbon Dioxide", latex: "CO_2" },
  { label: "Water", latex: "H_2O" },
  { label: "Ammonia", latex: "NH_3" },
  { label: "Sulphuric Acid", latex: "H_2SO_4" },
  { label: "Nitric Acid", latex: "HNO_3" },
  { label: "Sodium Chloride", latex: "NaCl" },
];

/* ===============================
   GREEK LETTERS
================================ */

export const GREEK_FORMULAS: FormulaItem[] = [
  { label: "Alpha", latex: "\\alpha" },
  { label: "Beta", latex: "\\beta" },
  { label: "Gamma", latex: "\\gamma" },
  { label: "Delta", latex: "\\delta" },
  { label: "Theta", latex: "\\theta" },
  { label: "Lambda", latex: "\\lambda" },
  { label: "Mu", latex: "\\mu" },
  { label: "Pi", latex: "\\pi" },
  { label: "Sigma", latex: "\\sigma" },
  { label: "Phi", latex: "\\phi" },
  { label: "Omega", latex: "\\omega" },
];