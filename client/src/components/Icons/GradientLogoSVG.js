const GradientLogoSVG = props => (
  <svg
    width="1284"
    height="1562"
    viewBox="0 0 1284 1562"
    xmlns="http://www.w3.org/2000/svg"
    focusable="false"
    {...props}
  >
    <defs>
      <linearGradient
        id="gradient"
        x1="10%"
        x2="100%"
        y1="100%"
        y2="20%"
        gradientUnits="userSpaceOnUse"
      >
        <stop stopColor="#009de0" offset="0%" />
        <stop stopColor="#4897f2" offset="25%" />
        <stop stopColor="#828cf9" offset="50%" />
        <stop stopColor="#ba7af2" offset="75%" />
        <stop stopColor="#eb61db" offset="100%" />
      </linearGradient>
    </defs>
    <path
      fillRule="evenodd"
      clipRule="evenodd"
      d="M1283.55 1185.33V546.184L645.333 1185.33H1283.55Z"
      fill="url(#gradient)"
    />
    <path
      d="M266.545 1561.41C-88.6765 1203.9 -88.1462 625.693 268.162 268.859C542.706 -6.08374 948.469 -69.4575 1283.56 78.6396V546.183C1079.63 341.97 749.005 341.97 545.09 546.183C341.174 750.395 341.167 1081.49 545.07 1285.7L820.367 1561.41L266.545 1561.41Z"
      fill="url(#gradient)"
    />
  </svg>
);

export default GradientLogoSVG;
