import React from 'react';
import { Svg } from 'expo';
const { Path, G, Circle, Rect, Polygon } = Svg;

export default SpottedEggCracked = (props) => {
    const spotsColor = props.spotsColor;
    const eggshellColor = props.eggshellColor;
    const eggshellOutline = props.eggshellOutline;

    const slimeEggHeight = props.height;
    const slimeEggWidth = props.width;
    const slimeEggScale = props.scale;
    const slimeEggTransformX = props.transformX;
    const slimeEggTransformY = props.transformY;

    return (
        <Svg
            height={slimeEggHeight}
            width={slimeEggWidth}
        >
            <G
                transform={`translate(${slimeEggTransformX},${slimeEggTransformY})`}
                scale={slimeEggScale}
            >
                <Rect
                    id="rect1667"
                    height="91.308998"
                    width="68.193001"
                    fill="#00d6ff"
                    y="23.846008"
                    x="1.4999999" />
                    <Rect
                    id="rect1671"
                    height="91.308998"
                    width="27.596001"
                    fill="#00b8ff"
                    y="23.846008"
                    x="21.798" />
                    <Rect
                    id="rect1675"
                    height="8.4860001"
                    width="68.193001"
                    fill="#ff8b00"
                    y="106.668"
                    x="1.4999999" /><Rect
                    id="rect1679"
                    height="4.243"
                    width="68.193001"
                    fill="#ffb000"
                    y="106.668"
                    x="1.4999999" /><Polygon
                    transform="translate(-28.354,8.3251953e-6)"
                    id="polygon1683"
                    points="29.854,115.154 98.047,115.154 89.377,126.4 38.522,126.4 "
                    fill="#ebf4f7" /><Polygon
                    transform="translate(-28.354,8.3251953e-6)"
                    id="polygon1687"
                    points="98.047,23.992 29.854,23.992 38.522,1.5 89.377,1.5 "
                    fill="#ebf4f7" /><Polygon
                    transform="translate(-28.354,8.3251953e-6)"
                    fill="#d8e5ea"
                    points="74.24,126.4 53.66,126.4 50.152,115.154 77.748,115.154 "
                    id="polygon1691" /><Polygon
                    transform="translate(-28.354,8.3251953e-6)"
                    fill="#d8e5ea"
                    points="53.66,1.5 74.24,1.5 77.748,23.992 50.152,23.992 "
                    id="polygon1695" /><Path
                    fill="#33363a"
                    d="M 70.906,22.970008 62.422,0.96000834 C 62.2,0.38200834 61.643,8.3251953e-6 61.023,8.3251953e-6 H 10.167 C 9.547,8.3251953e-6 8.99,0.38200834 8.768,0.96000834 L 0.286,22.970008 c -0.178,0.247 -0.286,0.547 -0.286,0.875 v 82.821992 8.486 c 0,0.032 0.007,0.062 0.01,0.094 0.002,0.037 0.006,0.074 0.011,0.111 0.014,0.104 0.038,0.204 0.073,0.3 0.007,0.019 0.01,0.039 0.018,0.058 0.047,0.116 0.109,0.222 0.182,0.322 0.007,0.01 0.01,0.022 0.018,0.031 l 8.668,11.246 c 0.284,0.369 0.724,0.584 1.188,0.584 h 50.855 c 0.465,0 0.904,-0.216 1.188,-0.584 l 8.67,-11.246 c 0.007,-0.009 0.01,-0.02 0.017,-0.029 0.074,-0.1 0.138,-0.208 0.185,-0.326 0.007,-0.017 0.01,-0.034 0.016,-0.052 0.035,-0.098 0.06,-0.2 0.074,-0.307 0.005,-0.036 0.009,-0.072 0.011,-0.108 0.002,-0.032 0.01,-0.062 0.01,-0.095 v -8.486 -82.819992 c -0.001,-0.328 -0.109,-0.629 -0.288,-0.876 z m -2.713,2.522 V 105.168 H 3 V 25.492008 Z M 3,108.168 h 65.193 v 5.486 H 3 Z M 11.197,3.0000084 H 59.994 L 67.451,22.346008 H 3.741 Z M 60.286,124.9 H 10.905 L 4.55,116.654 h 62.093 z"
                    id="path1701" /><Path
                    fill="#ffff00"
                    fill-opacity="1"
                    d="m 48.974,12.709008 c 0,2.209 -1.791,4 -4,4 H 26.218 c -2.209,0 -4,-1.791 -4,-4 v -0.75 c 0,-2.2089996 1.791,-3.9999996 4,-3.9999996 h 18.756 c 2.209,0 4,1.791 4,3.9999996 z"
                    id="path1703" /><Path
                    fill="#33363a"
                    d="M 44.974,18.209008 H 26.218 c -3.032,0 -5.5,-2.467 -5.5,-5.5 v -0.75 c 0,-3.0329996 2.468,-5.4999996 5.5,-5.4999996 h 18.756 c 3.032,0 5.5,2.467 5.5,5.4999996 v 0.75 c 0,3.033 -2.468,5.5 -5.5,5.5 z M 26.218,9.4590084 c -1.379,0 -2.5,1.1219996 -2.5,2.4999996 v 0.75 c 0,1.378 1.121,2.5 2.5,2.5 h 18.756 c 1.379,0 2.5,-1.122 2.5,-2.5 v -0.75 c 0,-1.378 -1.121,-2.4999996 -2.5,-2.4999996 z"
                    id="path1707" /><Path
                    id="path1713"
                    d="m 8.013,81.853008 c -0.828,0 -1.5,-0.671 -1.5,-1.5 v -41.519 c 0,-0.829 0.672,-1.5 1.5,-1.5 0.828,0 1.5,0.671 1.5,1.5 v 41.519 c 0,0.828 -0.672,1.5 -1.5,1.5 z"
                    fill="#fdfeff" /><Path
                    id="path1721"
                    d="m 8.013,90.334008 c -0.828,0 -1.5,-0.671 -1.5,-1.5 v -2.853 c 0,-0.829 0.672,-1.5 1.5,-1.5 0.828,0 1.5,0.671 1.5,1.5 v 2.853 c 0,0.829 -0.672,1.5 -1.5,1.5 z"
                    fill="#fdfeff" /><Path
                    id="path1725"
                    d="m 8.013,99.084008 c -0.828,0 -1.5,-0.671 -1.5,-1.5 v -2.853 c 0,-0.829 0.672,-1.5 1.5,-1.5 0.828,0 1.5,0.671 1.5,1.5 v 2.853 c 0,0.829 -0.672,1.5 -1.5,1.5 z"
                    fill="#fdfeff" /><Path
                    id="path1731"
                    d="m 23.513,122.277 h -1.166 c -0.828,0 -1.5,-0.671 -1.5,-1.5 0,-0.829 0.672,-1.5 1.5,-1.5 h 1.166 c 0.828,0 1.5,0.671 1.5,1.5 0,0.829 -0.672,1.5 -1.5,1.5 z"
                    fill="#33363a" /><Path
                    id="path1735"
                    d="m 29.847,122.277 h -1.168 c -0.828,0 -1.5,-0.671 -1.5,-1.5 0,-0.829 0.672,-1.5 1.5,-1.5 h 1.168 c 0.828,0 1.5,0.671 1.5,1.5 0,0.829 -0.672,1.5 -1.5,1.5 z"
                    fill="#33363a" /><Path
                    id="path1739"
                    d="m 36.179,122.277 h -1.166 c -0.828,0 -1.5,-0.671 -1.5,-1.5 0,-0.829 0.672,-1.5 1.5,-1.5 h 1.166 c 0.828,0 1.5,0.671 1.5,1.5 0,0.829 -0.672,1.5 -1.5,1.5 z"
                    fill="#33363a" /><Path
                    id="path1743"
                    d="m 42.513,122.277 h -1.168 c -0.828,0 -1.5,-0.671 -1.5,-1.5 0,-0.829 0.672,-1.5 1.5,-1.5 h 1.168 c 0.828,0 1.5,0.671 1.5,1.5 0,0.829 -0.672,1.5 -1.5,1.5 z"
                    fill="#33363a" /><Path
                    id="path1747"
                    d="m 48.845,122.277 h -1.166 c -0.828,0 -1.5,-0.671 -1.5,-1.5 0,-0.829 0.672,-1.5 1.5,-1.5 h 1.166 c 0.828,0 1.5,0.671 1.5,1.5 0,0.829 -0.672,1.5 -1.5,1.5 z"
                    fill="#33363a" /><Path
                    fill="#fffffa"
                    d="m 57.437,71.410008 c 0,11.739 -9.518,21.258 -21.258,21.258 -11.74,0 -21.256,-9.519 -21.256,-21.258 0,-11.74 9.516,-33.32 21.256,-33.32 11.74,0 21.258,21.58 21.258,33.32 z"
                    id="path1755" /><Path
                    fill="#f9f9e4"
                    d="m 36.179,38.090008 v 54.578 c 11.74,0 21.258,-9.519 21.258,-21.258 0,-11.74 -9.518,-33.32 -21.258,-33.32 z"
                    id="path1759" /><Path
                    id="path1763"
                    d="m 23.007,83.470008 c 1.961,2.144 4.121,3.194 2.973,4.244 -1.148,1.051 -3.67,0.165 -5.631,-1.979 -1.961,-2.145 -2.619,-4.734 -1.471,-5.785 1.149,-1.052 2.168,1.374 4.129,3.52 z"
                    fill="#7bc67b" /><Path
                    id="path1767"
                    d="m 49.351,83.470008 c -1.961,2.144 -4.121,3.194 -2.973,4.244 1.148,1.051 3.67,0.165 5.631,-1.979 1.961,-2.145 2.621,-4.734 1.471,-5.785 -1.148,-1.052 -2.168,1.374 -4.129,3.52 z"
                    fill="#54af79" /><Path
                    fill="#33363a"
                    d="m 36.179,94.168008 c -12.548,0 -22.756,-10.209 -22.756,-22.758 0,-11.919 9.609,-34.82 22.756,-34.82 13.147,0 22.758,22.901 22.758,34.82 0,12.549 -10.209,22.758 -22.758,22.758 z m 0,-54.578 c -10.812,0 -19.756,21.068 -19.756,31.82 0,10.895 8.862,19.758 19.756,19.758 10.895,0 19.758,-8.863 19.758,-19.758 0,-10.752 -8.945,-31.82 -19.758,-31.82 z"
                    id="path1773" /><Path
                    fill="#7bc67b"
                    d="m 48.666,76.914008 c -2.766,5.99 -8.416,9.273 -12.617,7.334 -4.203,-1.939 -2.25,-5.468 0.516,-11.459 2.766,-5.99 5.297,-12.176 9.5,-10.234 4.2,1.939 5.364,8.367 2.601,14.359 z"
                    id="path1777" /><Path
                    fill="#54af79"
                    d="m 46.064,62.555008 c -4.203,-1.941 -6.734,4.244 -9.5,10.234 -0.131,0.283 -0.258,0.559 -0.385,0.829 v 10.685 c 4.188,1.814 9.748,-1.46 12.486,-7.389 2.764,-5.992 1.6,-12.42 -2.601,-14.359 z"
                    id="path1781" /><Circle
                    fill="#7bc67b"
                    cx="23.956001"
                    cy="54.439014"
                    r="1.351"
                    id="circle1785" /><Circle
                    fill="#7bc67b"
                    cx="28.829998"
                    cy="47.980011"
                    r="0.52899998"
                    id="circle1789" /><Circle
                    fill="#7bc67b"
                    cx="26.07"
                    cy="62.191013"
                    r="0.764"
                    id="circle1793" /><Circle
                    fill="#54af79"
                    cx="37.969997"
                    cy="87.392998"
                    r="0.764"
                    id="circle1797" /><Circle
                    fill="#7bc67b"
                    cx="34.377998"
                    cy="86.628998"
                    r="0.764"
                    id="circle1801" /><Circle
                    fill="#54af79"
                    cx="45.246998"
                    cy="50.658009"
                    r="1.562"
                    id="circle1805" /><Circle
                    fill="#54af79"
                    cx="49.674999"
                    cy="57.316013"
                    r="1.527"
                    id="circle1809" /><Circle
                    fill="#7bc67b"
                    cx="27.942001"
                    cy="77.785004"
                    r="1.526"
                    id="circle1813" /><Path
                    fill="#7bc67b"
                    d="m 37.824,55.387008 c 0,3.578 1.543,6.479 -2.035,6.479 -3.578,0 -6.48,-2.9 -6.48,-6.479 0,-3.579 2.902,-6.48 6.48,-6.48 3.578,-10e-4 2.035,2.902 2.035,6.48 z"
                    id="path1817" /><Path
                    fill="#54af79"
                    d="m 36.179,61.852008 c 3.068,-0.213 1.645,-3.025 1.645,-6.465 0,-3.439 1.424,-6.253 -1.645,-6.467 z"
                    id="path1821" />
                <Path
                    id="path3096"
                    d="m 13.762,31.334008 h -2.749 v -2.748 c 0,-0.829 -0.671,-1.5 -1.5,-1.5 -0.829,0 -1.5,0.671 -1.5,1.5 v 2.748 h -2.75 c -0.829,0 -1.5,0.671 -1.5,1.5 0,0.829 0.671,1.5 1.5,1.5 h 2.75 v 2.75 c 0,0.829 0.671,1.5 1.5,1.5 0.829,0 1.5,-0.671 1.5,-1.5 v -2.75 h 2.749 c 0.829,0 1.5,-0.671 1.5,-1.5 0,-0.829 -0.672,-1.5 -1.5,-1.5 z"
                    fill="#ffff00"
                    fillOpacity="1"
                    stroke="#33363a"
                    strokeOpacity="1" /><Path
                    id="path3098"
                    d="m 63.46796,97.481003 1.945,-1.945 c 0.586,-0.585 0.586,-1.536 0,-2.121 -0.586,-0.586 -1.535,-0.586 -2.121,0 l -1.945,1.945 -1.944,-1.944 c -0.586,-0.586 -1.535,-0.586 -2.121,0 -0.586,0.585 -0.586,1.536 0,2.121 l 1.944,1.944 -1.944,1.944 c -0.586,0.584997 -0.586,1.535987 0,2.120987 0.293,0.293 0.677,0.439 1.061,0.439 0.384,0 0.768,-0.146 1.061,-0.439 l 1.944,-1.943987 1.945,1.944987 c 0.293,0.293 0.677,0.439 1.061,0.439 0.384,0 0.768,-0.146 1.061,-0.439 0.586,-0.585 0.586,-1.53599 0,-2.120987 z"
                    fill="#ffff00"
                    fillOpacity="1"
                    stroke="#33363a"
                    strokeOpacity="1" /><Path
                    id="path3100"
                    d="m 13.578,50.359008 -0.443,-0.443 0.443,-0.443 c 0.586,-0.585 0.586,-1.536 0,-2.121 -0.586,-0.586 -1.535,-0.586 -2.121,0 l -0.442,0.442 -0.441,-0.441 c -0.586,-0.586 -1.536,-0.585 -2.122,0 -0.586,0.586 -0.586,1.536 0,2.122 l 0.442,0.442 -0.441,0.441 c -0.586,0.585 -0.586,1.536 0,2.121 0.293,0.293 0.677,0.439 1.061,0.439 0.384,0 0.768,-0.146 1.061,-0.439 l 0.441,-0.441 0.443,0.443 c 0.293,0.293 0.677,0.439 1.061,0.439 0.384,0 0.768,-0.146 1.061,-0.439 0.582,-0.586 0.582,-1.536 -0.003,-2.122 z"
                    fill="#ffff00"
                    fillOpacity="1"
                    stroke="#33363a"
                    strokeOpacity="1" /><Path
                    id="path3102"
                    d="m 49.404782,97.051108 h -0.623 v -0.625 c 0,-0.828 -0.670997,-1.5 -1.499997,-1.5 v 0 c -0.828,0 -1.5,0.671 -1.5,1.5 v 0.625 h -0.627 c -0.829,0 -1.5,0.671 -1.5,1.5 0,0.829 0.671,1.499992 1.5,1.499992 h 0.625 v 0.625 c 0,0.828 0.671,1.5 1.5,1.5 v 0 c 0.828,0 1.499997,-0.671 1.499997,-1.5 v -0.625 h 0.625 c 0.829,0 1.5,-0.670992 1.5,-1.499992 0,-0.829 -0.672,-1.5 -1.5,-1.5 z"
                    fill="#ffff00"
                    fillOpacity="1"
                    stroke="#33363a"
                    strokeOpacity="1" /><Path
                    id="path3104"
                    d="m 63.669856,82.28779 c -0.479,-0.479 -1.192,-0.545 -1.76,-0.24 -0.568,-0.305 -1.280997,-0.239 -1.759997,0.24 -0.479,0.479 -0.545,1.192 -0.24,1.76 -0.305,0.568 -0.239,1.281 0.24,1.76 0.293,0.293 0.677,0.439 1.060997,0.439 0.244,0 0.479,-0.081 0.699,-0.199 0.221,0.118 0.455,0.199 0.699,0.199 0.384,0 0.768,-0.146 1.061,-0.439 0.479,-0.479 0.545,-1.192 0.24,-1.76 0.304,-0.568 0.239,-1.281 -0.24,-1.76 z"
                    fill="#ffff00"
                    fillOpacity="1"
                    stroke="#33363a"
                    strokeOpacity="1" /><Path
                    id="path3106"
                    d="m 25.704,31.655008 c 0,-0.675 -0.448,-1.239 -1.061,-1.427 -0.189,-0.613 -0.752,-1.061 -1.427,-1.061 -0.675,0 -1.238,0.448 -1.427,1.061 -0.613,0.188 -1.062,0.752 -1.062,1.427 0,0.675 0.449,1.239 1.062,1.427 0.188,0.613 0.752,1.062 1.427,1.062 0.675,0 1.239,-0.449 1.427,-1.062 0.613,-0.189 1.061,-0.752 1.061,-1.427 z"
                    fill="#ffff00"
                    fillOpacity="1"
                    stroke="#33363a"
                    strokeOpacity="1" />
                <Path
                    fill="none"
                    stroke="#33363a"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeMiterlimit="4"
                    strokeDasharray="none"
                    strokeOpacity="1"
                    d="m 30.199594,66.012634 3.254238,-3.508474 3.152542,3.355932 3.254237,-3.355932 3.050847,3.254238 3.152542,-3.20339 3.152543,3.254237 3.101695,-3.20339 3.101694,3.152543"
                    id="path5412" />
            </G>
        </Svg>
    );


}